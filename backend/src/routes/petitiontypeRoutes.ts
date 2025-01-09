import { Hono } from "hono";
import { getAllPetitionTypes, addPetitionType, getPetitionTypeById } from "../controllers/petitiontypeController";

const PetitionTypeRoutes = new Hono();

PetitionTypeRoutes.get("/", getPetitionTypeById);
PetitionTypeRoutes.get("/all", getAllPetitionTypes);

PetitionTypeRoutes.post("/", addPetitionType);

export default PetitionTypeRoutes;