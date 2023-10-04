import { config } from "dotenv";


config();
 

export const Key = "catf1012"

export const MONGODB = process.env.MONGODB_URI

export const PORT = process.env.PORT || 4002