const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    createdBy : {
        type : String,
        required : true,
    },
    createdDate : {
        type : Date,
        default : new Date()
    },
    lastModified : {
        type : Date,
        default : new Date()
    }
})

mongoose.model("Task", taskSchema, "task");
