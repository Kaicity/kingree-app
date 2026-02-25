const mongoose = require('mongoose');
const UserGender = require('../enums/user-gender');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: [UserGender.male, UserGender.female], required: true },
    bio: String,
    email: { type: String, required: true, unique: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true },
);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
