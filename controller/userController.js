const mongoose = require('mongoose');
const userModel = mongoose.model('User');

const userController = {};

userController.registerUser = async function(userDetails){
    return await userModel.create(userDetails);
}

userController.validateUser = async function(email, password){
    return await userModel.findOne({
        email : email,
        password : password
    }).then(function(data){
        return data
    }).catch(function(error){
        return error;
    })
}
module.exports = userController;
