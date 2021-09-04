const mongoose = require('mongoose');
const userController = require('./userController');
const taskModel = mongoose.model('Task');

const taskController = {};

taskController.addTask = async function(taskDetails){
    return await taskModel.create(taskDetails)
}
taskController.getTaskByUserid = async function(userId){
    return await taskModel.find({
        createdBy : userId,
    })
    
}
module.exports = taskController;

