import { Hono } from "hono";

// import userRoutes from "./routes/userRoutes";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import staffRoutes from "./routes/staffRoutes";
import researcherRoutes from "./routes/researcherRoutes"
import petitionRoutes from "./routes/petitionRoutes";
import committeeRoutes from "./routes/committeeRoutes";
import petitioncommitteeRoutes from "./routes/petitioncommitteeRoutes";
import departmentRoutes from "./routes/departmentRoutes";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => c.json({ msg: "Hello Hono!" }));

app.route("/staff", staffRoutes);
app.route("/researchers", researcherRoutes);
app.route("/petitions", petitionRoutes);
app.route("/committees", committeeRoutes);


app.route("/petitioncommittee",petitioncommitteeRoutes);
app.route("/departments",departmentRoutes);


export default {
  host: "0.0.0.0",
  port: 8000,
  fetch: app.fetch,
};
