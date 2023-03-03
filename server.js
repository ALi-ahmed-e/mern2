const path = require("path")
const dotenv = require("dotenv").config()
const cors = require('cors')
const express = require('express')
const app = express()
const { errHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db');
connectDB()

app.use(express.json())
app.use(cors())


app.use(express.urlencoded({ extended: false }))


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'))

// //serve front end

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errHandler)

app.listen(port, () => console.log('server started'))