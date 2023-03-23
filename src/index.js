const express = require('express')
const app = express()
const env = require('./config/environment');
const db = require('./config/mongoose');
const passport = require('passport')
const passportJWT = require('./config/passport-jwt-strategy');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize());

app.use('/auth', require('./routers/user_router'));
app.use('/posts', require('./routers/post_router'));
app.use('/comments', require('./routers/comment_router'));
app.use('/likes', require('./routers/like_router'));
app.use('/friend', require('./routers/friend_router')); 

app.use('/', (req, res) => {
    res.json('Hey welcome to Sociolite'); 
}); 

app.listen(env.PORT, () => {
    console.log(`Server live at port : ${env.PORT}`)
})
