import { Router } from "express";
import { register,login, logout,profile,verifyToken} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validate_token.js";
import { validateSchema } from "../middlewares/validator.middlewar.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";


const router = Router()

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
     });
     
router.post("/newuser",validateSchema(registerSchema),register)
router.post("/login",validateSchema(loginSchema),login)
router.post("/logout",logout)
router.get("/profile",authRequired,profile)
router.get("/verify",verifyToken)




export default router;