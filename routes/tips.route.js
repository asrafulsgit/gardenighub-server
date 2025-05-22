const express = require('express');
const { createTip, updateTip, myTips, tipsDetails, browseTips, likeTip, TrendingTips, deleteTip } = require('../controllers/tips.controllers');
const tipsRouter = express.Router();


 
tipsRouter.post('/api/v1/tip',createTip)
tipsRouter.get('/api/v1/my-tips',myTips)
tipsRouter.get('/api/v1/tip-details/:id',tipsDetails)
tipsRouter.put('/api/v1/tip/:id',updateTip)
tipsRouter.get('/api/v1/browse-tips',browseTips)
tipsRouter.get('/api/v1/trending-tips',TrendingTips)
tipsRouter.put('/api/v1/like-tip/:id',likeTip)
tipsRouter.delete('/api/v1/delete-tip/:id',deleteTip)

module.exports = tipsRouter;