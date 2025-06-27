const express = require('express');
const { userRegister, googleLogin, userLogin, userLogout, userObserver } = require('../controllers/user.controllers');
const userAuthentication = require('../middlewares/userAuth-middleware');

const userRouter = express.Router();

 
userRouter.post('/user/register',userRegister)
userRouter.post('/user/google/login',googleLogin)
userRouter.post('/user/login',userLogin)
userRouter.get('/user/logout',userAuthentication,userLogout)
userRouter.get('/user/observer',userAuthentication,userObserver)

 


module.exports = userRouter;