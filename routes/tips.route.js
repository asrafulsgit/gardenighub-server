const express = require('express');
const { createTip, updateTip, myTips, tipsDetails, browseTips, likeTip, TrendingTips, deleteTip, filterTips, searchTips } = require('../controllers/tips.controllers');
const userAuthentication = require('../middlewares/userAuth-middleware');
const tipsRouter = express.Router();


 
tipsRouter.post('/tip',userAuthentication, createTip)
tipsRouter.get('/my-tips',userAuthentication,myTips)
tipsRouter.get('/tip-details/:id',userAuthentication,tipsDetails)
tipsRouter.put('/tip/:id',userAuthentication,updateTip)
tipsRouter.put('/like-tip/:id',userAuthentication,likeTip)
tipsRouter.delete('/delete-tip/:id',userAuthentication,deleteTip)
tipsRouter.get('/search-tips',userAuthentication,searchTips)
tipsRouter.get('/filter-tips',filterTips)
tipsRouter.get('/browse-tips',browseTips)
tipsRouter.get('/trending-tips',TrendingTips)

module.exports = tipsRouter;