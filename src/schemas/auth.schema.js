import {z} from "zod"

export const registerSchema = z.object({
    nombre: z.string({required_error: "Es necesario agregar un nombre"}).min(2,{message:"Ingrese un nombre con mas de 2 carcateres"}),
    email: z.string({required_error:"Es necesario agregar un email"}).email({message:"Mail invalido..."}),
    contraseña: z.string({required_error:"Es necesario agregar una contraseña"}).min(6,{message:"Debe tener un minimo de 6 caracteres..."})
})


export const loginSchema = z.object({
    email: z.string({required_error:"Es necesario agregar un email"}).email({message:"Mail invalido..."}),
    contraseña: z.string({required_error:"Es necesario agregar una contraseña"}).min(6,{message:"Debe tener un minimo de 6 caracteres..."})

})