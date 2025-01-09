import { Hono } from "hono";
import { getAllFaculties,addFaculty,getFacultyById} from "../controllers/facultyController";

const facultyRoutes = new Hono();

facultyRoutes.get("/all", getAllFaculties);
facultyRoutes.post("/", addFaculty);
facultyRoutes.get("/:id", getFacultyById);

export default facultyRoutes;