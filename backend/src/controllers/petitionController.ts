import conMysql from "../ultis/connectDB";
import { petition, 
  petitionLevel, 
  petitionObjectiveType, 
  petitionResearchType, 
  petitionStatus, 
  petitionType, 
  petitionGrant, 
  staff, 
  researcher, 
 } from "../db/schema";

const db = await conMysql();

// Get all petitions
export const getAllPetitions = async (c: any) => {
  try {
    const allPetitions = await db.select().from(petition);
    return c.json(allPetitions, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petitions.", details: (error as any).message },
      500
    );
  }
};

// Add new petition
export const addPetition = async (c: any) => {
  try {
    const {
      correspondenceNo,
      title_th,
      title_en,
      objectiveId,
      grantId,
      typeId,
      statusId,
      researcherId,
      currentLevelId,
      staffId,
      note,
    } = await c.req.json();

    // Validate required fields
    if (
      !correspondenceNo ||
      !title_th ||
      !title_en ||
      !objectiveId ||
      !grantId ||
      !typeId ||
      !statusId ||
      !researcherId ||
      !currentLevelId ||
      !staffId
    ) {
      return c.json({ error: "All required fields must be filled." }, 400);
    }

    await db.insert(petition).values({
      correspondenceNo,
      title_th,
      title_en,
      objectiveId,
      grantId,
      typeId,
      statusId,
      researcherId,
      currentLevelId,
      staffId,
      note,
    });

    return c.json({ message: "Petition added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition.", details: (error as any).message },
      500
    );
  }
};