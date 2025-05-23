const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user.route');
const tipsRouter = require('./routes/tips.route');
const gardernerRoute = require('./routes/gardener.route');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
     origin : process.env.FRONTEND_URL
}))


app.use('/api/v1', userRouter)
app.use('/api/v1', tipsRouter)
app.use('/api/v1', gardernerRoute)




module.exports = app;
