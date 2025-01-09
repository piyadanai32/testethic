import { Hono } from "hono";
import { getAllPetitionGrants,addPetitionGrant,getPetitionGrantById} from "../controllers/petitiongrantController";

const petitiongrantRoutes = new Hono();

petitiongrantRoutes.get("/all", getAllPetitionGrants);
petitiongrantRoutes.post("/", addPetitionGrant);
petitiongrantRoutes.get("/:id", getPetitionGrantById);

export default petitiongrantRoutes;