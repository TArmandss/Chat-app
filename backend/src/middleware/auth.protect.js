import jwt from 'jsonwebtoken';
import {User} from '../modals/user.modal.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No token Provided' });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    const user = await User.findById(decode.userId).select("-password")
    if(!user) {
        return res.status(404).json({message: "User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware" + error.message)
  }
};
