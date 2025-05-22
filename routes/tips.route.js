const express = require('express');
const { createTip, updateTip } = require('../controllers/tips.controllers');
const tipsRouter = express.Router();



tipsRouter.post('/api/v1/tip',createTip)
tipsRouter.put('/api/v1/tip/:id',updateTip)

module.exports = tipsRouter;