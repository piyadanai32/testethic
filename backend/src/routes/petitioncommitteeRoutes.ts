import { Hono } from "hono";
import { 
    petitionCommitteeWithCommittee,
    addPetitionCommittee

 } from "../controllers/petitioncommitteeController";

const petitioncommitteeRoutes = new Hono();

petitioncommitteeRoutes.get("/all", petitionCommitteeWithCommittee);
petitioncommitteeRoutes.post("/", addPetitionCommittee);

export default petitioncommitteeRoutes;