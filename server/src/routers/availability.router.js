const express = require('express');
const { createAvailability, findCommonSlot, getAllAvailability } = require('../controllers/availability.controller');

const availabilityRouter = express.Router();

availabilityRouter.post('/', createAvailability);
availabilityRouter.get('/match/:userCurrentId/:userTargetId', findCommonSlot);
availabilityRouter.get('/', getAllAvailability);

module.exports = availabilityRouter;
