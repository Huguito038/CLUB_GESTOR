import mongoose from "mongoose";
import { boolean, string } from "zod";

const playerSchema = new mongoose.Schema({
    nombre:{
        type: String, 
        required:true,
        trim:true,
        sparse: true,
    },
    direccion:{
        type: String, 
        required:true,
        trim:true,
    },
    carnet_pago:{
        type: Boolean,
        required:true
    },
    carnet_impreso:{
        type:Boolean,
        required:true
    },
    deporte:{
        type: String,
        required:true,
    },
    email:{
        type: String, 
        required:true,
        trim:true,
    },
    fecha_nacimiento:{
        type:String,
        required:true,
        trim:true,
    },
    categoria:{
        type: String,
        required:false,

    },
    cuotas:{
        type:JSON,
        required:true,
 
    },
    telefono:{
        type: String,
        required:true,
 
    },
    documento:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
})

export default mongoose.model("Player",playerSchema)