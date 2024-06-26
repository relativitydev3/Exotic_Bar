import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete } from "../controllers/usuario.controller.js";
const router=Router();


router.get("/usuario",Get );
router.get("/usuario/:id",GetId );
router.get("/usuario/:id/:idDos",GetIdRango );
router.post("/usuario",Post );
router.patch("/usuario/:id", Patch);
router.delete("/usuario/:id",Delete );

export default router;