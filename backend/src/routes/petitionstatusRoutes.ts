import { Hono } from "hono";
import { getAllPetitionStatuses, addPetitionStatus, getPetitionStatusById } from "../controllers/petitionstatusController";

const petitionstatusRoutes = new Hono();

petitionstatusRoutes.get("/", getPetitionStatusById);
petitionstatusRoutes.get("/all", getAllPetitionStatuses);

petitionstatusRoutes.post("/", addPetitionStatus);

export default petitionstatusRoutes;