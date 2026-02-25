require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/configs/connectDb');
const errorMiddlewareHandle = require('./src/middlewares/errorMiddleware');
const http = require('http');
const userRouter = require('./src/routers/user.router');
const availabilityRouter = require('./src/routers/availability.router');
const loginRouter = require('./src/routers/auth.router');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/availabilities', availabilityRouter);
app.use('/api/login', loginRouter);
app.get('/', (req, res) => {
  res.send('Goshu Backend is running');
});

const PORT = process.env.PORT || 3000;

connectDB();

app.use(errorMiddlewareHandle);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`🚀 Server + WebSocket đang chạy tại http://localhost:${PORT}`);
});
