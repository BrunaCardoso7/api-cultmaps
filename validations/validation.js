
function validationEmail(email){
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z]{2, 4}$/

    return regex.test(email)
}
const errors = [];
const validationDataLogin = (email, senha) =>{
    if(!email){
        errors.push("Campo email é obrigatório!");
    }
    if(!validationEmail(email)){
        errors.push("Formato de email incorreto, tente: @example.com")
    }

    if(!senha){
        errors.push("Campo email é obrigatório")
    }
    if(senha.length < 5){
        errors.push("senha muito pequena, minimo 8 caracteres!");
    }
    return errors
}
const validationDataRegister = (nome, email, senha, senhaConfim) =>{
    if (!nome) {
        errors.push("O nome é obrigatório!")
      }
    
    if (!email) {
        errors.push("O email é obrigatório!")
    }
    if(validationEmail(email)){
        errors.push("Formato de email incorreto, tente: @example.com")
    }

    if (!senha) {
        errors.push("A senha é obrigatória!")
    return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    if(senha.length < 5){
        errors.push("senha muito pequena, minimo 8 caracteres")
    }
    
    if (senha != senhaConfim) {
        errors.push("A senha e a confirmação precisam ser iguais!")
    }
    return errors
}
module.exports ={
    validationDataLogin,
    validationDataRegister
}
