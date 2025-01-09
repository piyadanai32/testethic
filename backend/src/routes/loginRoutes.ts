import { Hono } from "hono";
import { loginStaff } from "../controllers/loginController";

const loginRoutes = new Hono();

loginRoutes.post("/", loginStaff);

export default loginRoutes;