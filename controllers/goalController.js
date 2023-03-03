const expressAsyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

const getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json({ "message": goals })


})
const setGoals = expressAsyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    const goals = await Goal.create({ text: req.body.text, user: req.user.id })

    res.status(200).json({ "message": goals })

})
const updateGoals = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('id not found')
    }
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(401)
        throw new Error('goal not found')
    }
    const user = req.user

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    // check logged in user

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user Not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ "message": updatedGoal })
})
const deleteGoals = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('id not found')
    }
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(401)
        throw new Error('goal not found')
    }
    const user = req.user

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    // check logged in user

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user Not authorized')
    }
    const DeletedGoal = await Goal.findByIdAndDelete(id)

    res.status(200).json({ "message": DeletedGoal })
})


module.exports = { getGoals, setGoals, updateGoals, deleteGoals }