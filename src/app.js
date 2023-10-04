import express  from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import crudBack from "./routes/crud.routes.js";
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"


const app = express()

app.use(cors({origin: "http://localhost:3000",credentials:true}))
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use("/api",crudBack)
app.use("/api",authRoutes)





export default app