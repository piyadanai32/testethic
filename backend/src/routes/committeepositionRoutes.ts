import { Hono } from "hono";
import { getAllCommitteePositions,addCommitteePosition,getCommitteePositionById} from "../controllers/committeepositionController";

const committeePositionRoutes = new Hono();

committeePositionRoutes.get("/all", getAllCommitteePositions);
committeePositionRoutes.post("/", addCommitteePosition);
committeePositionRoutes.get("/:id", getCommitteePositionById);

export default committeePositionRoutes;