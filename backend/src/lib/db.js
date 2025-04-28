import mongoose from 'mongoose';

export const MongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB URI is not defined in env variables file');
    const res = await mongoose.connect(uri);
    console.log(`DB connected: ${res.connection.host}`);
  } catch (e) {
    console.log('Error connecting to DB' + e);
  }
};
