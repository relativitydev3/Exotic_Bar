import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete,DeleteRango} from "../controllers/proveedores.controller.js";

const router=Router();

router.get("/proveedores",Get );
router.get("/proveedores/:id",GetId );
router.get("/proveedores/:id/:idDos",GetIdRango );
router.post("/proveedores", Post);
router.patch("/proveedores/:id",Patch );
router.delete("/proveedores/:id",Delete );
router.delete("/proveedores/:id/:idDos",DeleteRango );

export default router;
