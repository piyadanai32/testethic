import { Hono } from "hono";
import { getCommitteeById, getAllCommitteesWithPrenameCommitteePosition, addCommittee } from "../controllers/committeeController";

const committeeRoutes = new Hono();

committeeRoutes.get("/", getCommitteeById);
committeeRoutes.get("/all", getAllCommitteesWithPrenameCommitteePosition);

committeeRoutes.post("/", addCommittee);

export default committeeRoutes;