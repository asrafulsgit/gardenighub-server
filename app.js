const express = require('express');
const userRouter = require('./routes/user.route');
const tipsRouter = require('./routes/tips.route');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use(userRouter)
app.use(tipsRouter)






module.exports = app;
