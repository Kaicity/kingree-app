const AvailabilityStatus = require('../enums/availabilityStatus');
const AvailabilityModel = require('../models/availability.model');
const UserModel = require('../models/user.model');
const findFirstOverlap = require('../utils/findOverlap');

const createAvailabilityService = async (userId, userTargetId, startTime, endTime) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    const err = new Error('Không tìm thấy người dùng này');
    err.statusCode = 404;
    throw err;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new Error('Thời gian bắt đầu phải luôn trước thời gian kết thúc');
  }

  const now = new Date();
  const threeWeeksLater = new Date();
  threeWeeksLater.setDate(now.getDate() + 21);

  if (start < now || start > threeWeeksLater) {
    const err = new Error('Thời gian phải nằm trong 3 tuần kế tiếp');
    err.statusCode = 400;
    throw err;
  }

  const newAvailability = await AvailabilityModel.create({
    userId,
    userTargetId,
    startTime: start,
    endTime: end,
  });

  const data = {
    userId: newAvailability.userId,
    userTargetId: newAvailability.userTargetId,
    startTime: newAvailability.startTime,
    endTime: newAvailability.endTime,
  };

  return { data };
};

const findCommonSlotService = async (userCurrentId, userTargetId) => {
  const slotsA = await AvailabilityModel.find({
    userId: userCurrentId,
    userTargetId,
  }).sort({ startTime: 1 });

  const slotsB = await AvailabilityModel.find({
    userId: userTargetId,
    userTargetId: userCurrentId,
  }).sort({ startTime: 1 });

  if (!slotsA.length || !slotsB.length) {
    return { status: AvailabilityStatus.waiting };
  }

  const findCommonSlot = findFirstOverlap(slotsA, slotsB);

  if (!findCommonSlot) {
    return { status: AvailabilityStatus.no_overlap };
  }

  const data = { start: findCommonSlot.start, end: findCommonSlot.end };

  return { status: AvailabilityStatus.scheduled, data };
};

const getAllAvailabilityService = async ({ page, limit, skip, search }) => {
  const query = {};

  const [total, availabilities] = await Promise.all([
    AvailabilityModel.countDocuments(query),
    AvailabilityModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  const data = availabilities.map((a) => ({
    userId: a.userId,
    startTime: a.startTime,
    endTime: a.endTime,
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

module.exports = { createAvailabilityService, findCommonSlotService, getAllAvailabilityService };
