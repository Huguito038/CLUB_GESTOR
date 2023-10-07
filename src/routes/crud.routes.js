import {newPlayer,updatePlayer,deletePlayer,findPlayer, getallPlayers} from "../controllers/crud.controller.js";
import { Router } from "express";
import { authRequired } from "../middlewares/validate_token.js";

const router = Router()

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
     });
router.get("/all",authRequired,getallPlayers)
router.post("/registrar",authRequired,newPlayer)
router.put("/update/:id",authRequired,updatePlayer)
router.delete("/delete/:id",authRequired,deletePlayer)
router.get("/find/:id",authRequired,findPlayer)



export default router;