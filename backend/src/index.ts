import { Hono } from "hono";

// import userRoutes from "./routes/userRoutes";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import roleRoutes from "./routes/roleRoutes";
import staffRoutes from "./routes/staffRoutes";
import researcherRoutes from "./routes/researcherRoutes"
import petitionRoutes from "./routes/petitionRoutes";
import committeeRoutes from "./routes/committeeRoutes";
import pettitionFiles from "./routes/pettitionfileRoutes";
import prenameRoutes from "./routes/prenameRoutes";
import PetitionTypeRoutes from "./routes/petitiontypeRoutes";
import petitionstatusRoutes from "./routes/petitionstatusRoutes";
import petitionResearchTypeRoutes from "./routes/petitionresearchtypeRoutes";
import PetitionObjectiveTypeRoutes from "./routes/petitionobjectivetypeRoutes";
import petitionlevelRoutes from "./routes/petitionlevelRoutes";
import petitiongrantRoutes from "./routes/petitiongrantRoutes";
import petitionDocumentTypeRoutes from "./routes/petitiondocumenttypeRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import committeePositionRoutes from "./routes/committeepositionRoutes";
import petitioncommitteeRoutes from "./routes/petitioncommitteeRoutes";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => c.json({ msg: "Hello Hono!" }));
app.route("/roles", roleRoutes);
app.route("/staff", staffRoutes);
app.route("/researchers", researcherRoutes);
app.route("/petitions", petitionRoutes);
app.route("/committees", committeeRoutes);
app.route("/pettitionfiles", pettitionFiles);
app.route("/prename",prenameRoutes );
app.route("/petitiontype",PetitionTypeRoutes);
app.route("/petitionstatus",petitionstatusRoutes);
app.route("/petitionresearchtype",petitionResearchTypeRoutes);
app.route("/PetitionObjectiveType",PetitionObjectiveTypeRoutes);
app.route("/petitionlevel",petitionlevelRoutes);
app.route("/petitiongrant",petitiongrantRoutes);
app.route("/petitionDocumentType",petitionDocumentTypeRoutes);
app.route("/faculty",facultyRoutes);
app.route("/committeePosition",committeePositionRoutes);

app.route("/petitioncommittee",petitioncommitteeRoutes);


export default {
  host: "0.0.0.0",
  port: 8000,
  fetch: app.fetch,
};
