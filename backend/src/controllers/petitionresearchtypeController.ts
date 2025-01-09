import conMysql from "../ultis/connectDB";
import { petitionResearchType } from "../db/schema";

const db = await conMysql();

// Get all petition research types
export const getAllPetitionResearchTypes = async (c: any) => {
  try {
    const allPetitionResearchTypes = await db.select().from(petitionResearchType);
    return c.json(allPetitionResearchTypes, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition research types.", details: (error as any).message },
      500
    );
  }
};

// Add a new petition research type
export const addPetitionResearchType = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionResearchType).values({ description });

    return c.json({ message: "Petition research type added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition research type.", details: (error as any).message },
      500
    );
  }
};

// Get petition research type by ID
export const getPetitionResearchTypeById = async (c: any) => {
  try {
    const petitionResearchTypeId = c.req.query("id"); // Receive ID from query parameter
    if (!petitionResearchTypeId) {
      return c.json({ error: "Petition research type ID is required." }, 400);
    }

    const petitionResearchTypeData = await db
      .select()
      .from(petitionResearchType)
      .where({ id: petitionResearchTypeId })
      .limit(1);

    if (!petitionResearchTypeData.length) {
      return c.json({ error: "Petition research type not found." }, 404);
    }

    return c.json(petitionResearchTypeData[0], 200); // Return the petition research type data
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition research type.", details: (error as any).message },
      500
    );
  }
};