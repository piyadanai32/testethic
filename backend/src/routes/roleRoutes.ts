import { Hono } from "hono";
import { getRoleById, getAllRoles } from "../controllers/roleController";

const roleRoutes = new Hono();

roleRoutes.get("/", getRoleById);
roleRoutes.get("/all", getAllRoles);

export default roleRoutes;
