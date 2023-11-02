const mongoose = require('mongoose')

require('dotenv').config

const password = process.env.PASSWORD

mongoose.set('strictQuery', true)
async function main(){
    await mongoose.connect(`mongodb+srv://obitadrawing:${password}@cluster0.ocujkg6.mongodb.net/?retryWrites=true&w=majority`)
    console.log('conexão com banco de dados estabelecida')
    
}
main().catch(console.error('error na conexão'))

module.exports = main
