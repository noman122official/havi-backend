const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
const jwt = require("jsonwebtoken");
require("./model/user");
require("./model/task");
const userController = require("./controller/userController")
const taskController = require("./controller/taskController")
require('dotenv').config();
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

const port = process.env.PORT
app.listen(port, (error)=>{
    if(error){
        console.log(`Error connecting to the port ${port}`);
    }
    else{
        const dbConnectionURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.liefy.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`
        mongoose.connect(dbConnectionURL).then(function(){
            console.log("connected to mongo db server");
            console.log(`Connected to port ${port}`);
        }).catch(function(error){
            console.log("error connecting mongodb server",error);
        })
    }

})

app.post("/register", (req, res)=>{
    const name = req.body.fullname;
    const email = req.body.email;
    const dob = req.body.dob;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const gender = req.body.gender;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(!emailRegex.test(email)){
        res.status(400).json({
            'error' : 'Invalid email'
        })
    }
    else if(!phoneRegex.test(phoneNumber)){
        res.status(400).json({
            'error' : 'Invalid Phone Numbers'
        })
    }
    else if(password.length <= 8){
        res.status(400).json({
            'error' : 'Password should have more than 8 characters'
        })
    }

    else if(gender != 'male' && gender!= 'female'){
        res.status(400).json({
            'error' : 'Gender should be either male or female'
        })
    }
    else{
        userController.registerUser({
            fullname : name,
            email : email,
            phoneNumber : phoneNumber,
            dob : dob,
            password : password,
            gender : gender,
            isAdmin: req.body.isAdmin || false
        }).then(function(data){
            res.json(data);
        }).catch(function(error){
            res.status(500).send(error);
        })
    }

})

app.post("/login", function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    userController.validateUser(email, password).then(function(data){
        if(data){
            try{
                var token = jwt.sign(data.toJSON(), process.env.JWT_LOGIN_SECRET);
                res.json({
                    token : token,
                    name : data.fullname
                })
            }
            catch(error){
                res.status(500).send(error)
            }
        }
        else{
            res.status(401).send("incorrect cred");
        }
    }).catch(function(error){
        res.status(500).send(error);
    })
})


app.post("/task", function(req, res){
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_LOGIN_SECRET, function(err, userDetials){
        if(err){
            res.status(401).send("Not authorized to perform this operation");
        }
        else{
            taskController.addTask({
                name : req.body.name,
                createdBy : userDetials._id
            }).then(function(data){
                res.json(data)
            }).catch(function(error){
                res.status(500).send(error)
            })

        }
    })
})

app.get("/task", function(req, res){
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_LOGIN_SECRET, function(err, userDetials){
        if(err){
            res.status(401).send("Not authorized to perform this operation");
        }
        else{
            taskController.getTaskByUserid(userDetials._id).then(function(data){
                res.json(data)
            }).catch(function(error){
                res.status(500).send(error)
            })            
        }
    })
})

app.get("/admin/users", function(req, res){
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_LOGIN_SECRET, function(err, userDetials){
        if(err || !userDetials.isAdmin){
            res.status(401).send("Not authorized to perform this operation");
        }
        else{  
            userController.getAllUsers().then(function(data){
                res.json(data)
            }).catch(function(error){
                res.status(500).send(error)
            })
        }
    })
})