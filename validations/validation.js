
function validationEmail(email){
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z]{2, 4}$/

    return regex.test(email)
}
const validationDataLogin = (email, senha) =>{
    if(!email){
        return res.status(422).json({msg: "Campo email é obrigatório"})
    }
    if(!validationEmail(email)){
        return res.status(422).json({msg: "Formato de email incorreto, tente: @example.com"})
    }

    if(!senha){
        return res.status(422).json({msg: "Campo email é obrigatório"})
    }
    if(senha.length < 5){
        return res.status(422).json({msg: "senha muito pequena, minimo 8 caracteres"})
    }
}
const validationDataRegister = (nome, email, senha) =>{
    if (!nome) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
      }
    
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if(!validationEmail(email)){
        return res.status(422).json({msg: "Formato de email incorreto, tente: @example.com"})
    }

    if (!senha) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    if(senha.length < 5){
        return res.status(422).json({msg: "senha muito pequena, minimo 8 caracteres"})
    }
    
    if (password != confirmpassword) {
    return res
        .status(422)
        .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }
}
module.exports ={
    validationDataLogin,
    validationDataRegister
}
