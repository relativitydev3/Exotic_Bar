import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/mesa.controller.js";


const router=Router();


router.get("/mesas",Get);
router.get("/mesas/:id",GetId,);
router.get("/mesas/:id/:idDos",GetIdRango);
router.post("/mesas",Post);
router.patch("/mesas/:id",Patch);
router.delete("/mesas/:id",Delete);
router.delete("/mesas/:id/:idDos",DeleteRango);

// router.options("/index",hola );
// router.path("/index",hola );


export default router;