import mongoose from "mongoose";
import { MONGODB } from "./config.js";



export const connectDB = async () => {

     try {
       await mongoose.connect(MONGODB),{
        keepAlive:true,
        useNewUrlParser:true,
       };
       console.log("Base de datos - EN LÍNEA");
     } catch (error) {
       console.error("Error al conectar a la base de datos:", error);
     }
   }