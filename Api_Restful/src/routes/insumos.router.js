import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete} from "../controllers/insumos.controller.js";
const router=Router();

router.get("/insumos",Get );
router.get("/insumos/:id", GetId);
router.get("/insumos/:id/:idDos",GetIdRango );
router.post("/insumos",Post );
router.patch("/insumos/:id",Patch );
router.delete("/insumos/:id",Delete );

export default router;