import { Hono } from "hono";
import { getResearcherById, getAllResearchersWithPrenameDepartment, addResearcher, getResearchersByName } from "../controllers/researcherController";

const researcherRoutes = new Hono();

researcherRoutes.get("/", getResearcherById);
researcherRoutes.get("/all", getAllResearchersWithPrenameDepartment);
researcherRoutes.get("/name", getResearchersByName);

researcherRoutes.post("/", addResearcher);

export default researcherRoutes;