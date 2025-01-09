import { Hono } from "hono";
import { getAllPetitionLevels,addPetitionLevel,getPetitionLevelById} from "../controllers/petitionlevelController";

const petitionlevelRoutes = new Hono();

petitionlevelRoutes.get("/all", getAllPetitionLevels);
petitionlevelRoutes.post("/", addPetitionLevel);
petitionlevelRoutes.get("/:id", getPetitionLevelById);

export default petitionlevelRoutes;