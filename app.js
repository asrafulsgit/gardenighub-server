const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user.route');
const tipsRouter = require('./routes/tips.route');
const Gardener = require('./models/gardener.model');
const gardernerRoute = require('./routes/gardener.route');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
     origin : process.env.FRONTEND_URL
}))


app.use(userRouter)
app.use(tipsRouter)
app.use(gardernerRoute)




module.exports = app;
