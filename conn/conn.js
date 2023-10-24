const mongoose = require('mongoose')

require('dotenv').config

const password = process.env.PASSWORD
const user = process.env.USER
mongoose.set('strictQuery', true)
async function main(){
    await mongoose.connect(`mongodb+srv://obitadrawing:${password}@cluster0.0xnapob.mongodb.net/?retryWrites=true&w=majority`)
    console.log('conexão com banco de dados estabelecida')
}
main().catch(console.log('error na conexão'))

module.exports = main