import express  from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import crudBack from "./routes/crud.routes.js";
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"


const app = express()


app.use(cors({
    origin: 'https://club-gestor.vercel.app', // Reemplaza con la URL de tu frontend
    credentials: true, // Si estás usando cookies, asegúrate de permitir credenciales
  }));
app.use((req,res,next)=>{
  res.append("Access-Control-Max-Age", "18000");
  res.append("Access-Control-Allow-Headers", "content-type");
  res.append("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");

  next();

})
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use("/api",crudBack)
app.use("/api",authRoutes)





export default app