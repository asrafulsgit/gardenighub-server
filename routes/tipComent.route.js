const express = require('express');
const userAuthentication = require('../middlewares/userAuth-middleware');
const { createCommnet, browseComments, deleteComment } = require('../controllers/tipComment.controllers');

const tipCommentRouter = express.Router();


tipCommentRouter.post('/tip/commnet', userAuthentication,createCommnet)
tipCommentRouter.get('/tip/commnet/:tip', userAuthentication,browseComments)
tipCommentRouter.delete('/tip/commnet/:tip', userAuthentication,deleteComment)

 


module.exports = tipCommentRouter;