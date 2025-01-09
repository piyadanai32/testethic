import { Hono } from "hono";
import { getAllFiles,addFile,getFileById } from "../controllers/petitionfilesController";

const petitionfileRoutes = new Hono();

petitionfileRoutes.get("/", getFileById);
petitionfileRoutes.get("/all", getAllFiles);

petitionfileRoutes.post("/", addFile);

export default petitionfileRoutes;