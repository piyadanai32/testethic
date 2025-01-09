import { Hono } from "hono";
import {
  getStaffById,
  getAllStaffWithRole,
  addStaff,
} from "../controllers/staffController";

const staffRoutes = new Hono();

staffRoutes.get("/", getStaffById);
staffRoutes.get("/all", getAllStaffWithRole);

staffRoutes.post("/", addStaff);

export default staffRoutes;
