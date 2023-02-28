const expressAsyncHandler = require('express-async-handler')


const getGoals = expressAsyncHandler(async(req,res)=>{
    res.status(200).json({ "message": 'Get goals' })
})
const setGoals = expressAsyncHandler(async(req,res)=>{
   console.log(req.body)
   if (!req.body.text) {
    res.status(400)
    throw new Error('Please add text')
   }
    res.status(200).json({ "message": 'set goals' })
})
const updateGoals = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    res.status(200).json({ "message": `update goal ${id}` })
})
const deleteGoals = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    res.status(200).json({ "message": `delete goal ${id}` })
})


module.exports = {getGoals,setGoals,updateGoals,deleteGoals}