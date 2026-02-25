const asyncHandle = require('express-async-handler');
const { loginService } = require('../services/autth.service');

const login = asyncHandle(async (req, res) => {
  const { email } = req.body;
  const result = await loginService(email);

  res.status(200).json({
    message: 'login is sucessfully',
    ...result,
  });
});

module.exports = { login };
