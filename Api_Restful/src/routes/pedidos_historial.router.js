import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/pedido_historial.controller.js";
const router=Router();

router.get("/pedidos_historial",Get );
router.get("/pedidos_historial/:id", GetId);
router.get("/pedidos_historial/:id/:idDos",GetIdRango );
router.post("/pedidos_historial",Post );
router.patch("/pedidos_historial/:id",Patch );
router.delete("/pedidos_historial/:id",Delete );
router.delete("/pedidos_historial/:id/:idDos",DeleteRango );

export default router;