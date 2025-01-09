import { Hono } from "hono";
import { getResearcherById, getAllResearchersWithPrenameDepartment, addResearcher } from "../controllers/researcherController";

const researcherRoutes = new Hono();

researcherRoutes.get("/", getResearcherById);
researcherRoutes.get("/all", getAllResearchersWithPrenameDepartment);

researcherRoutes.post("/", addResearcher);

export default researcherRoutes;