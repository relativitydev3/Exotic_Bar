import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/pedidos.controller.js";
const router=Router();

router.get("/pedidos",Get );
router.get("/pedidos/:id", GetId);
router.get("/pedidos/:id/:idDos",GetIdRango );
router.post("/pedidos",Post );
router.patch("/pedidos/:id",Patch );
router.delete("/pedidos/:id",Delete );
router.delete("/pedidos/:id/:idDos",DeleteRango );

export default router;