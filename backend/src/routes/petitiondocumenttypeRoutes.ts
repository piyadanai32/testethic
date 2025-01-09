import { Hono } from "hono";
import { getAllPetitionDocumentTypes,addPetitionDocumentType,getPetitionDocumentTypeById} from "../controllers/petitiondocumenttypeController";

const petitionDocumentTypeRoutes = new Hono();

petitionDocumentTypeRoutes.get("/all", getAllPetitionDocumentTypes);
petitionDocumentTypeRoutes.post("/", addPetitionDocumentType);
petitionDocumentTypeRoutes.get("/:id", getPetitionDocumentTypeById);

export default petitionDocumentTypeRoutes;