import { Hono } from "hono";
import {getAllDepartmentsWithFaculty} from '../controllers/departmentController'

const departmentRoutes = new Hono();

departmentRoutes.get("/all", getAllDepartmentsWithFaculty);

export default departmentRoutes;