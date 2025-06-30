const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.route');
const tipsRouter = require('./routes/tips.route');
const gardernerRoute = require('./routes/gardener.route');
const eventRouter = require('./routes/event.route');
const tipCommentRouter = require('./routes/tipComent.route');
const savedTipRouter = require('./routes/savedTip.route');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(cors({
     origin : process.env.FRONTEND_URL,
     credentials : true
}))


app.use('/api/v1', userRouter)
app.use('/api/v1', tipsRouter)
app.use('/api/v1', tipCommentRouter)
app.use('/api/v1', savedTipRouter)
app.use('/api/v1', eventRouter)
app.use('/api/v1', gardernerRoute)




module.exports = app;
