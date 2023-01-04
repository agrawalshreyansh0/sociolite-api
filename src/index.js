const express = require('express')
const app = express()
const env = require('./config/environment'); 
const db = require('./config/mongoose'); 
const PORT = process.env.PORT || 5000; 





app.listen(PORT, (req, res) => {
    console.log(`Server live at port : ${PORT}`)
})