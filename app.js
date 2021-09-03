const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json());

const port = 9200
app.listen(port, (error)=>{
    if(error){
        console.log(`Error connecting to the port ${port}`);
    }
    else{
        console.log(`Connected to port ${port}`);
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
            'error' : 'Invalid Phone Number'
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
        res.send("success")
        
    }

})

