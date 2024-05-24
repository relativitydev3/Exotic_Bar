import  Router  from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete } from "../controllers/pagos_empleados.controller.js";


const router=Router();

router.get("/pagos_empleados",Get );
router.get("/pagos_empleados/:id",GetId );
router.get("/pagos_empleados/:id/:idDos",GetIdRango );
router.post("/pagos_empleados",Post );
router.patch("/pagos_empleados/:id",Patch );
router.delete("/pagos_empleados/:id",Delete );



export default router;