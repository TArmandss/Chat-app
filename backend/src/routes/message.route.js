import express from 'express';
import { protectRoute } from '../middleware/auth.protect.js';
import { User } from '../modals/user.modal.js';
import Message from '../modals/message.modal.js';
import { v2 as cloudinary } from 'cloudinary';
import { getReceiverSocketId, io } from '../lib/socket.js';

const router = express.Router();

router.get('/users', protectRoute, async (req,res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getUsers ', error.message);
  }
});

router.get('/:id', protectRoute, async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in get messages ', error.message);
  }
});

router.post('/send/:id', protectRoute, async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadToCloudinary = await cloudinary.uploader.upload(image);
      imageUrl = uploadToCloudinary.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId)
    console.log('receiverSocketId', receiverSocketId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage); // to. <-- for sending the message to receiver
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log('Error sending message ', error.message);
  }
});

export default router;
