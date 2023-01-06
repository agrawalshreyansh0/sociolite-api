const express = require('express')
const app = express()
const env = require('./config/environment'); 
const db = require('./config/mongoose'); 
const passport = require('passport')
const passportJWT = require('passport-jwt');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}))

app.use('/auth',require('./routers/user_router'))

app.listen(PORT, () => {
    console.log(`Server live at port : ${PORT}`)
})