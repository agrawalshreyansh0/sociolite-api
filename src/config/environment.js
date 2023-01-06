
const development = {
    name: 'development',
    db: 'Sociolitedb',
    mongodb_password: 'e50cf28',
    jwt_key: 'sociolite'

}

//Remember: Put all the constants in the environment variables of the machine's while deployment
const production = {
    name: 'production',
}

module.exports = development; 
