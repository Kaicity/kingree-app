const asyncHandle = require('express-async-handler');
const paginate = require('../utils/paginate');

const {
  getAllUsersService,
  getUserService,
  updateUserService,
  createProfileService,
} = require('../services/user.service');
const { likeUserService } = require('../services/match.service');

const getAllUsers = asyncHandle(async (req, res) => {
  const { page, limit, skip, search } = paginate(req);

  const result = await getAllUsersService({ page, limit, skip, search });

  res.status(200).json({
    message: 'get list users successfully',
    ...result,
  });
});

const createProfile = asyncHandle(async (req, res) => {
  const result = await createProfileService(req.body);

  res.status(200).json({
    message: 'create new profile sucessfully',
    ...result,
  });
});

const getUser = asyncHandle(async (req, res) => {
  const { id } = req.params;

  const result = await getUserService(id);

  res.status(200).json({
    message: 'Get user detail successfully',
    ...result,
  });
});

const updateUser = asyncHandle(async (req, res) => {
  const { id } = req.params;

  const result = await updateUserService(id, req.body);

  res.status(200).json({
    message: 'Updated user sucessfully',
    ...result,
  });
});

const likeUser = asyncHandle(async (req, res) => {
  const { id } = req.params;
  const { targetId } = req.params;

  const result = await likeUserService(id, targetId);

  res.status(200).json({
    message: 'Like user is successfullfy',
    ...result,
  });
});

module.exports = {
  getAllUsers,
  createProfile,
  getUser,
  updateUser,
  likeUser,
};
