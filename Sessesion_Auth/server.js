require("./Config/config")
const router = require("./router/router")
const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

app.use(express.json())


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})


const store = new MongoDBStore({
    uri: process.env.DATABASE, 
  
    collection: 'Login Session',
  
  });

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store :store
  }))


  app.use("/api", router)
