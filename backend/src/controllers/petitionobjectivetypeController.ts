import conMysql from "../ultis/connectDB";
import { petitionObjectiveType } from "../db/schema";

const db = await conMysql();

// Get all petition objective types
export const getAllPetitionObjectiveTypes = async (c: any) => {
  try {
    const allPetitionObjectiveTypes = await db.select().from(petitionObjectiveType);
    return c.json(allPetitionObjectiveTypes, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition objective types.", details: (error as any).message },
      500
    );
  }
};

// Add a new petition objective type
export const addPetitionObjectiveType = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionObjectiveType).values({ description });

    return c.json({ message: "Petition objective type added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition objective type.", details: (error as any).message },
      500
    );
  }
};

// Get petition objective type by ID
export const getPetitionObjectiveTypeById = async (c: any) => {
  try {
    const petitionObjectiveTypeId = c.req.query("id"); // Receive ID from query parameter
    if (!petitionObjectiveTypeId) {
      return c.json({ error: "Petition objective type ID is required." }, 400);
    }

    const petitionObjectiveTypeData = await db
      .select()
      .from(petitionObjectiveType)
      .where({ id: petitionObjectiveTypeId })
      .limit(1);

    if (!petitionObjectiveTypeData.length) {
      return c.json({ error: "Petition objective type not found." }, 404);
    }

    return c.json(petitionObjectiveTypeData[0], 200); // Return the petition objective type data
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition objective type.", details: (error as any).message },
      500
    );
  }
};