import {newPlayer,updatePlayer,deletePlayer,findPlayer, getallPlayers,modificarPlayers} from "../controllers/crud.controller.js";
import { Router } from "express";
import { authRequired } from "../middlewares/validate_token.js";

const router = Router()


router.get("/all",authRequired,getallPlayers)
router.post("/registrar",authRequired,newPlayer)
router.put("/update/:id",authRequired,updatePlayer)
router.put("/updateAll",authRequired,modificarPlayers)
router.delete("/delete/:id",authRequired,deletePlayer)
router.get("/find/:id",authRequired,findPlayer)
router.get("/buscar/:id",findPlayer)



export default router;