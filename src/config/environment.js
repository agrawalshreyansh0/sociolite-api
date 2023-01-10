
const development = {
    name: 'development',
    db: 'Sociolitedb',
    mongodb_password: 'e50cf28',
    jwt_key: 'sociolite',
    bcrypt_salt: '7',
    jwt_expiry:'10000000',
    PORT: process.env.PORT || 5000,
}

//Remember: Put all the constants in the environment variables of the machine while deployment
const production = {
    name: 'production',
}

module.exports = development; 
