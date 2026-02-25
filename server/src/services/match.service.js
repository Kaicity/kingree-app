const UserModel = require('../models/user.model');
const { getIO } = require('../configs/socket');

const likeUserService = async (userId, targetUserId) => {
  if (userId === targetUserId) {
    const err = new Error('Không thể like chính bạn');
    err.statusCode = 400;
    throw err;
  }

  const user = await UserModel.findById(userId);
  const target = await UserModel.findById(targetUserId);

  if (!user || !target) {
    const err = new Error('Không tìm thấy người dùng');
    err.statusCode = 404;
    throw err;
  }

  if (!user.likes.includes(targetUserId)) {
    user.likes.push(targetUserId);
    await user.save();
  }

  // Check mutual like
  const isMatch = target.likes.includes(userId);

  if (isMatch) {
    if (!user.matches.includes(targetUserId)) {
      user.matches.push(targetUserId);
      target.matches.push(userId);
      await user.save();
      await target.save();
    }
  }

  const io = getIO();
  io.emit('profile:match');

  return { match: isMatch };
};

module.exports = { likeUserService };
