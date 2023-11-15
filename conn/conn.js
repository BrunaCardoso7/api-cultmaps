import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const password = process.env.PASSWORD

mongoose.set('strictQuery', true)
async function main(){
    await mongoose.connect(`mongodb+srv://obitadrawing:${password}@cluster0.bdo9bve.mongodb.net/?retryWrites=true&w=majority`)
    console.log('conexão com banco de dados estabelecida')
    
}
main().catch(console.error('error na conexão'))

export default main
