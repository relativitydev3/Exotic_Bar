import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete} from "../controllers/productos.controller.js";
const router=Router();

router.get("/productos",Get );
router.get("/productos/:id",GetId );
router.get("/productos/:id/:idDos",GetIdRango );
router.post("/productos",Post );
router.patch("/productos/:id",Patch );
router.delete("/productos/:id",Delete );

export default router;