import jwt from "jsonwebtoken";
import { Key } from "../config.js";


export const CrearToken = (payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,Key,
            {
           expiresIn:"1d"
            },
       (err,token) => {
           if(err) reject(err)
           resolve(token)
       }
       )
    })
    

}