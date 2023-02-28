const dotenv = require("dotenv")
const express = require('express')
const app = express()
const port = process.env.port || 5000
const {errHandler} = require('./middleware/errorMiddleware')



app.use(express.json())



app.use(express.urlencoded({extended:false}))



app.use('/api/goals',require('./routes/goalRoutes'))


app.use(errHandler)

app.listen(port, () => console.log('server started'))