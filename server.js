const dotenv = require("dotenv")
const express = require('express')
const app = express()
const {errHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const port = process.env.port || 5000

connectDB()
app.use(express.json())



app.use(express.urlencoded({extended:false}))



app.use('/api/goals',require('./routes/goalRoutes'))


app.use(errHandler)

app.listen(port, () => console.log('server started'))