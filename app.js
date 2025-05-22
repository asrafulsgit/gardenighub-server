const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user.route');
const tipsRouter = require('./routes/tips.route');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
     origin : process.env.FRONTEND_URL
}))




app.use(userRouter)
app.use(tipsRouter)






module.exports = app;
