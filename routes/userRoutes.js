const express = require('express')
const router = express.Router()
const { registerUser, getUser, loginUser, deleteUser } = require('../controllers/usersControllers')
const protect = require('../middleware/authMiddleware')




router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-user', protect, getUser)
router.delete('/', deleteUser)




module.exports = router