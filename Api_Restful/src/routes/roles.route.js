import { Router } from "express";
import { GetRoles,GetRolesID,GetRolesRango,PostCreate,PatchEditat,Delete,DeleteRango} from "../controllers/roles.Controller.js";
const router=Router();

router.get("/roles",GetRoles);
router.get("/roles/:id",GetRolesID);
router.get("/roles/:id/:idDos",GetRolesRango);


router.post("/roles",PostCreate);

router.patch("/roles/:id",PatchEditat);

router.delete("/roles/:id",Delete);

router.delete("/roles/:id/:idDos",DeleteRango);


export default router;