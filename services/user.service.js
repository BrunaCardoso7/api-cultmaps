import users from '../model/usuario.js'

export const createService =  (body) =>  users.create(body)
export const findAllService = () =>  users.find()
export const findByIdUserService = (id) => users.findById(id)

export const updateService = (
    perfil,
    background,
    id,
) => users.findByIdAndUpdate({_id: id},{ perfil, background})
