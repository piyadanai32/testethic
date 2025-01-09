import { Hono } from "hono";
import { getAllPetitionResearchTypes,addPetitionResearchType,getPetitionResearchTypeById} from "../controllers/petitionresearchtypeController";

const petitionResearchTypeRoutes = new Hono();

petitionResearchTypeRoutes.get("/", getPetitionResearchTypeById);
petitionResearchTypeRoutes.get("/all", getAllPetitionResearchTypes);

petitionResearchTypeRoutes.post("/", addPetitionResearchType);

export default petitionResearchTypeRoutes;