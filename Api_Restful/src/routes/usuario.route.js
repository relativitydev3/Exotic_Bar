import { Router } from "express";
import { GetUsuarios,GetUsuariosID,GetUsuariosIDRango,PostCreate } from "../controllers/usuario.controller.js";
const router=Router();


router.get("/usuario",GetUsuarios );
router.get("/usuario/:id",GetUsuariosID );
router.get("/usuario/:id/:idDos",GetUsuariosIDRango );
router.post("/usuario",PostCreate );
router.delete("/usuario/:id", );
router.delete("/usuario/:id/:iddos", );
router.patch("/usuario/:id", );

export default router;