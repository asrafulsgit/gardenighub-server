const express = require('express');
const { createUser } = require('../controllers/user.controllers');

const userRouter = express.Router();


userRouter.post('/user',createUser)

 


module.exports = userRouter;