import  Router  from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango } from "../controllers/permisos.controller.js";


const router=Router();

router.get("/Permiso",Get );
router.get("/Permiso/:id",GetId );
router.get("/Permiso/:id/:idDos",GetIdRango );
router.post("/Permiso",Post );
router.patch("/Permiso/:id",Patch );
router.delete("/Permiso/:id",Delete );
router.delete("/Permiso/:id/:idDos",DeleteRango );

// router.options("/index",hola );
// router.path("/index",hola );


export default router;