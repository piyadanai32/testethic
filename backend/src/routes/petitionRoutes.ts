import { Hono } from "hono";
import { getPetitionById, getAllPetitions, addPetition } from "../controllers/petitionController";

const petitionRoutes = new Hono();

petitionRoutes.get("/", getPetitionById);
petitionRoutes.get("/all", getAllPetitions);

petitionRoutes.post("/", addPetition);

export default petitionRoutes;