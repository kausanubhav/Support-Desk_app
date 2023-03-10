
//Steps involved in the setup:
// npm init
// fill in the details like entry point and description
// and package.json will be created
//git init (to initialise a repository)
//add a .gitignore(touch .gitignore) and include node_modules and .env files
//intall dependencies(these will be installed in package.json)
//dependencies: express mongoose dotenv bcrypt(to hash passwords) colors(for terminal)
//nodemon as dev dependecy(npm i -D nodemon)
//create a script for nodemon("server":"nodemon backend/server.js")



const express= require('express');
const colors= require('colors');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8000;
const app=express();
const errorHandler =require('./middleware/errorMiddleware');
const connectDB=require('./config/db');

//Connect to database
connectDB();

//middlewares:
//json() allows us to send raw json data
app.use(express.json());

//to accept url encoded form: urlencoded()
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.json({message:'Welcome to Support Desk API'});
});
//Routes
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/tickets',require('./routes/ticketRoutes'));

//Error handler middleware (last middleware to use)
app.use(errorHandler);
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));
