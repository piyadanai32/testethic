import { Hono } from "hono";
import { getAllPetitions, addPetition } from "../controllers/petitionController";

const petitionRoutes = new Hono();

petitionRoutes.get("/all", getAllPetitions);

petitionRoutes.post("/", addPetition);

export default petitionRoutes;