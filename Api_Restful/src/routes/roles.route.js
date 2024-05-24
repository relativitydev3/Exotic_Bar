import { Router } from "express";
import {Get,GetId,GetIdRango,Post,Patch,Delete} from "../controllers/roles.Controller.js";
const router=Router();

router.get("/roles",Get);
router.get("/roles/:id",GetId);
router.get("/roles/:id/:idDos",GetIdRango);


router.post("/roles",Post);

router.patch("/roles/:id",Patch);

router.delete("/roles/:id",Delete);



export default router;