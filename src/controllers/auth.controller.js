import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { CrearToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { Key } from "../config.js"


export const register = async(req,res)=>{
    const {nombre,email,contraseña,key} = req.body
    if(key!=1234)return res.send("NONOOOOOOO")
    try {

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json({message:["El correo ya esta en uso"]})
        const cryptPass = await bcrypt.hash(contraseña,10)

        const newUser ={
            nombre,
            email,
            contraseña:cryptPass,
        }
        const usuario = await User.create(newUser)
        const token = await CrearToken({id:usuario.id})
        res.cookie(token,"token")
        res.json({
            id:usuario.id,
            nombre:usuario.nombre,
            email:usuario.email
        })  
    } catch (error) {
        res.status(500).send(error.message)
    }

}
export const login = async(req,res)=>{
    const {email,contraseña} = req.body
    try {
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({message:"User Not Found"})

        const isMatch = await bcrypt.compare(contraseña,userFound.contraseña)

        if(!isMatch)return res.status(400).json({message:"Password not Match"})

        const token = await CrearToken({id:userFound.id})
        res.cookie("token",token,{
            sameSite: "none",
            secure: true,
            httpOnly: false,

        })
        res.json({
            id:userFound.id,
            nombre:userFound.nombre,
            email:userFound.email
        })  
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }

}
export const logout = (req,res)=>{
    try{
        res.cookie("token","",{
        sameSite: "none",
        secure: true,
        httpOnly: false,
    })
    res.clearCookie('token');
        return res.sendStatus(200)
    }catch(error){
        res.send(error.message)

    }
}
export const profile = async(req,res)=>{
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).send("No User")

    return res.json({
        id:userFound.id,
        nombre:userFound.nombre,
        email:userFound.email,
    })
    

}
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(400).json({ message: "Desautorizado" });
    }
  
    jwt.verify(token, Key, async (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Desautorizado 404" });
      }
  
      const userFound = await User.findById(user.id);
  
      if (!userFound) {
        return res.status(400).json({ message: "Desautorizado 404" });
      }
  
      return res.json({
        id: userFound.id,
        nombre: userFound.nombre,
        email: userFound.email,
      });
    });
  };
  