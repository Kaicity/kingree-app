const asyncHandle = require('express-async-handler');
const paginate = require('../utils/paginate');
const {
  createAvailabilityService,
  findCommonSlotService,
  getAllAvailabilityService,
} = require('../services/availability.service');

const createAvailability = asyncHandle(async (req, res) => {
  const { userId, userTargetId, startTime, endTime } = req.body;
  const result = await createAvailabilityService(userId, userTargetId, startTime, endTime);

  res.status(200).json({
    message: 'create new availability sucessfully',
    ...result,
  });
});

const findCommonSlot = asyncHandle(async (req, res) => {
  const { userCurrentId, userTargetId } = req.params;
  const result = await findCommonSlotService(userCurrentId, userTargetId);

  res.status(200).json({
    message: 'two user matched is successfully',
    ...result,
  });
});

const getAllAvailability = asyncHandle(async (req, res) => {
  const { page, limit, skip, search } = paginate(req);

  const result = await getAllAvailabilityService({ page, limit, skip, search });

  res.status(200).json({
    message: 'get list availability successfully',
    ...result,
  });
});

module.exports = { createAvailability, findCommonSlot, getAllAvailability };
