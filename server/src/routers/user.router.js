const express = require('express');
const { getAllUsers, createProfile, getUser, updateUser, likeUser } = require('../controllers/user.controller');

const userRouter = express.Router();
userRouter.get('/', getAllUsers);
userRouter.post('/', createProfile);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.post('/:id/like/:targetId', likeUser);

module.exports = userRouter;
