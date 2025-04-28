import express from 'express';
import dotenv from 'dotenv';
import authRoute from '../src/routes/auth.route.js';
import messageRoute from '../src/routes/message.route.js';
import { MongoDB } from '../src/lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { app,server } from './lib/socket.js';
dotenv.config();

const PORT = process.env.SERVER_PORT;

app.use(express.json()); // enabling req.body
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  MongoDB();
});
