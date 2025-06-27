const express = require('express');
const userAuthentication = require('../middlewares/userAuth-middleware');
const { createSavedTip, mySavedTips, deleteSavedTip } = require('../controllers/savedTips.controllers');

const savedTipRouter = express.Router();


savedTipRouter.post('/tip/saved/:tip', userAuthentication,createSavedTip)
savedTipRouter.get('/tip/saved', userAuthentication,mySavedTips)
savedTipRouter.delete('/tip/saved/:tip', userAuthentication,deleteSavedTip)

 


module.exports = savedTipRouter;