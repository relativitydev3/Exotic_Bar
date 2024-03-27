import  Router  from "express";
import { GetPermisos,PostCreate,GetPermisosID,DeletePermisosID,PatchUdate,GetPermisosIDRango,DeletePermisosIDRango } from "../controllers/permisos.controller.js";


const router=Router();

router.get("/Permiso",GetPermisos );
router.get("/Permiso/:id",GetPermisosID );
router.get("/Permiso/:id/:idDos",GetPermisosIDRango );
router.post("/Permiso",PostCreate );
router.delete("/Permiso/:id",DeletePermisosID );
router.delete("/Permiso/:id/:iddos",DeletePermisosIDRango );
router.patch("/Permiso/:id",PatchUdate );

// router.options("/index",hola );
// router.path("/index",hola );


export default router;