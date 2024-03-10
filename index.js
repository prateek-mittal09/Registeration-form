const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3001;
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/employee")

        console.log(`Connected to mongodb ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error in Mongodb ${error}`)
    }


    }

    connectDB();

app.post("/login", (req,res)=>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("The Password is wrong.")
            }
        }
        else{
            res.json("No record exist")
        }
    })
})


app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.join(employees))
    .catch(err => res.json(err))
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
