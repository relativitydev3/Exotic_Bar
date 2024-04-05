import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/categorias.controller.js";
const router=Router();

router.get("/categorias",Get );
router.get("/categorias/:id", GetId);
router.get("/categorias/:id/:idDos",GetIdRango );
router.post("/categorias",Post );
router.patch("/categorias/:id",Patch );
router.delete("/categorias/:id",Delete );
router.delete("/categorias/:id/:idDos",DeleteRango );

export default router;