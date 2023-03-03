const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ "message": 'please add all fileds' })

    }
    //check if usere exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ "message": 'user already exists' })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create user
    const user = await User.create({ name, email, password: hashedPassword })
    if (user) {
        res.status(201).json({ _id: user._id, email, name: user.name, token: generateToken(user._id) })
    } else {
        res.status(400)
        throw Error('invalid user data')

    }

    res.status(200).json({ "message": name, email, password })


})
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check if usere exists
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({ _id: user._id, email, name: user.name, token: generateToken(user._id) })
    } else {
        res.status(400)
        throw Error('invalid credentials')
    }

})
const getUser = expressAsyncHandler(async (req, res) => {
    const { _id, name, email } = req.user
    res.status(200).json({
        _id, name, email
    })
})
const deleteUser = expressAsyncHandler(async (req, res) => {
    const id = req.params.id


    // if (!id) {
    //     res.status(400)
    //     throw new Error('goal not found')
    // }
    // const DeletedGoal = await Goal.findByIdAndDelete(id)

    res.status(200).json({ "message": DeletedGoal })
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = { registerUser, getUser, loginUser, deleteUser }