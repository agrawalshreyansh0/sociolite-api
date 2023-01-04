const mongoose = require('mongoose')
const env = require('./environment')
const db = mongoose.connection;

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://ShreyanshAgrawal:${env.mongodb_password}@cluster0.pf6t0zk.mongodb.net/${env.db}`);

db.on('error', console.error.bind(console, 'error connecting to db'))

db.once('open', () => {
    console.log('successfully connected to db')
})  