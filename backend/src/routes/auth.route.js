import express from 'express';
import { User } from '../modals/user.modal.js';
import bcrypt from 'bcryptjs';
import genToken from '../lib/utils.js';
import { protectRoute } from '../middleware/auth.protect.js';
import cloudinary from '../lib/cloudinary.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    const newUser = await User.findOne({ email });
    if (newUser)
      return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    const addingNewUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (addingNewUser) {
      //generating a new JWT
      genToken(addingNewUser._id, res);
      await addingNewUser.save();

      res.status(201).json({
        message: 'User has been created!',
        _id: addingNewUser._id,
        fullName: addingNewUser.fullName,
        email: addingNewUser.email,
        profilePicture: addingNewUser.profilePicture,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (e) {
    console.log('Error signing up a user ' + e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    genToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/update-profile', protectRoute, async (req,res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('Error in updating profile', error.message);
  }
});

router.get('/checkAuth', protectRoute, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth ', error.message);
  }
});

export default router;
