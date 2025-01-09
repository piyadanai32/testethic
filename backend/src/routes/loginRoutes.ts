import { Hono } from "hono";
import { loginStaffResearcher } from "../controllers/loginController";

const loginRoutes = new Hono();

loginRoutes.post("/", loginStaffResearcher);

export default loginRoutes;