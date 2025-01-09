import { Hono } from "hono";
import {getAllPetitionObjectiveTypes,addPetitionObjectiveType,getPetitionObjectiveTypeById} from "../controllers/petitionobjectivetypeController";

const PetitionObjectiveTypeRoutes = new Hono();

PetitionObjectiveTypeRoutes.get("/all", getAllPetitionObjectiveTypes);
PetitionObjectiveTypeRoutes.post("/", addPetitionObjectiveType);
PetitionObjectiveTypeRoutes.get("/:id", getPetitionObjectiveTypeById);

export default PetitionObjectiveTypeRoutes;
