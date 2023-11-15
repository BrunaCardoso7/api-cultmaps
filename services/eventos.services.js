import evento from "../model/evento.js";

export const createService = async(body)=>  evento.create(body)
export const findAllService = async()=>  evento.find()