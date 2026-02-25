const UserModel = require('../models/user.model');

const loginService = async (email) => {
  const user = await UserModel.findOne({ email });

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
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { data };
};

module.exports = { loginService };
