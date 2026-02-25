const { getIO } = require('../configs/socket');
const UserModel = require('../models/user.model');
const { isValidObjectId } = require('mongoose');

const createProfileService = async (createData) => {
  const { name, age, gender, bio, email } = createData;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    const error = new Error('Tên tài khoản Email người dùng đã tồn tại');
    error.statusCode = 409;
    throw error;
  }

  const newUser = new UserModel({ name, age, gender, bio, email });

  await newUser.save();

  const data = {
    id: newUser.id,
    email: newUser.email,
    age: newUser.age,
    name: newUser.name,
    gender: newUser.gender,
    bio: newUser.bio,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };

  const io = getIO();
  io.emit('profile:created', data);

  return { data };
};

const getAllUsersService = async ({ page, limit, skip, search }) => {
  const query = {};

  if (search) {
    query.$or = [{ email: { $regex: search, $options: 'i' } }];
  }

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  const data = users.map((u) => ({
    id: u.id,
    email: u.email,
    age: u.age,
    name: u.name,
    gender: u.gender,
    bio: u.bio,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));

  return {
    data,
    pagination: {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    },
  };
};

const getUserService = async (id) => {
  const user = await UserModel.findById(id);

  if (!user) {
    const err = new Error('Người dùng không tồn tại');
    err.statusCode = 404;
    throw err;
  }

  const data = {
    id: user.id,
    email: user.email,
    age: user.age,
    name: user.name,
    gender: user.gender,
    bio: user.bio,
    likes: user.likes,
    matches: user.matches,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { data };
};

const updateUserService = async (id, updateData) => {
  // Kiểm tra object id hợp lệ
  if (!isValidObjectId(id)) {
    const err = new Error('Invalid user ID format');
    err.statusCode = 400;
    throw err;
  }

  const user = await UserModel.findById(id);

  if (!user) {
    const err = new Error('Không tìm thấy người dùng trong hệ thống');
    err.statusCode = 404;
    throw err;
  }

  // update data
  const { name, age, gender, bio, email } = updateData;

  if (email && email !== user.email) {
    const existingEmailUser = await UserModel.findOne({ email });

    if (existingEmailUser) {
      const err = new Error('Tài khoản Email người dùng đã tồn tại');
      err.statusCode = 409;
      throw err;
    }

    user.email = email;
  }

  if (name) user.name = name;
  if (age) user.age = age;
  if (gender) user.gender = gender;
  if (bio) user.bio = bio;

  user.updatedAt = new Date();

  const updatedUser = await user.save();

  const data = {
    id: updatedUser.id,
    email: updatedUser.email,
    age: updatedUser.age,
    name: updatedUser.name,
    gender: updatedUser.gender,
    bio: updatedUser.bio,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  };

  return { data };
};

module.exports = {
  createProfileService,
  getAllUsersService,
  getUserService,
  updateUserService,
};
