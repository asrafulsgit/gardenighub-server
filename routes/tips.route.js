const express = require('express');
const { createTip, updateTip, myTips, tipsDetails, browseTips, likeTip, TrendingTips, deleteTip, filterTips } = require('../controllers/tips.controllers');
const tipsRouter = express.Router();


 
tipsRouter.post('/tip',createTip)
tipsRouter.get('/my-tips',myTips)
tipsRouter.get('/tip-details/:id',tipsDetails)
tipsRouter.put('/tip/:id',updateTip)
tipsRouter.get('/browse-tips',browseTips)
tipsRouter.get('/trending-tips',TrendingTips)
tipsRouter.put('/like-tip/:id',likeTip)
tipsRouter.delete('/delete-tip/:id',deleteTip)
tipsRouter.get('/filter-tips',filterTips)

module.exports = tipsRouter;