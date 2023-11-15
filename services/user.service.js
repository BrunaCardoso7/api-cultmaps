import users from '../model/usuario.js'

const createService =  (body) =>  users.create(body)
const findAllService = () =>  users.find()
const findByIdUserService = (id) => users.findById(id)
const updateService = (
    id,
    nome, 
    email, 
    password, 
    passwordConfirm
) => users.findByIdAndUpdate({_id: id},{nome, email, password, passwordConfirm})
export default{
    createService,
    findAllService,
    findByIdUserService,
    updateService
}