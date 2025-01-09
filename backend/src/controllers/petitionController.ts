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

// ดึงข้อมูลจากฐานข้อมูล
export const getDropdownData = async (c: any) => {
  try {
    const dropdownData = {
      petitionObjectiveType: await db.select().from(petitionObjectiveType),
      petitionGrant: await db.select().from(petitionGrant),
      petitionResearchType: await db.select().from(petitionResearchType),
      petitionLevel: await db.select().from(petitionLevel),
      petitionType: await db.select().from(petitionType),
      petitionStatus: await db.select().from(petitionStatus),
      staff: await db.select().from(staff),
      researcher: await db.select().from(researcher),
    };

    return c.json(dropdownData, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve dropdown data.", details: (error as any).message },
      500
    );
  }
};

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

// Get petition by ID
export const getPetitionById = async (c: any) => {
  try {
    const petitionId = c.req.query("id");
    if (!petitionId) {
      return c.json({ error: "Petition ID is required." }, 400);
    }

    const petitionRecord = await db
      .select()
      .from(petition)
      .where({ id: petitionId })
      .limit(1);

    if (!petitionRecord.length) {
      return c.json({ error: "Petition not found." }, 404);
    }

    return c.json(petitionRecord[0], 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition.", details: (error as any).message },
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