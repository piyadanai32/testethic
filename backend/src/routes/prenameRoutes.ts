import { Hono } from "hono";
import {getAllPrenames,addPrename,getPrenameById} from "../controllers/prenameController";

const prenameRoutes = new Hono();

prenameRoutes.get("/", getPrenameById);
prenameRoutes.get("/all", getAllPrenames);

prenameRoutes.post("/", addPrename);

export default prenameRoutes;