import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/estado.controller.js";
const router=Router();

router.get("/estados",Get );
router.get("/estados/:id", GetId);
router.get("/estados/:id/:idDos",GetIdRango );
router.post("/estados",Post );
router.patch("/estados/:id",Patch );
router.delete("/estados/:id",Delete );
router.delete("/estados/:id/:idDos",DeleteRango );

export default router;