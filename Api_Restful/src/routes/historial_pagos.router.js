import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/historial_pagos.controller.js";


const router=Router();


router.get("/historial_pagas",Get);
router.get("/historial_pagas/:id",GetId,);
router.get("/historial_pagas/:id/:idDos",GetIdRango);
router.post("/historial_pagas",Post);
router.patch("/historial_pagas/:id",Patch);
router.delete("/historial_pagas/:id",Delete);
router.delete("/historial_pagas/:id/:idDos",DeleteRango);

// router.options("/index",hola );
// router.path("/index",hola );


export default router;