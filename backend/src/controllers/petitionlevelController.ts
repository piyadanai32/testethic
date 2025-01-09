import conMysql from "../ultis/connectDB";
import { petitionLevel } from "../db/schema";

const db = await conMysql();

// Get all petition levels
export const getAllPetitionLevels = async (c: any) => {
  try {
    const allPetitionLevels = await db.select().from(petitionLevel);
    return c.json(allPetitionLevels, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition levels.", details: (error as any).message },
      500
    );
  }
};

// Add new petition level
export const addPetitionLevel = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionLevel).values({
      description,
    });

    return c.json({ message: "Petition level added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition level.", details: (error as any).message },
      500
    );
  }
};

// Get petition level by ID
export const getPetitionLevelById = async (c: any) => {
  try {
    const petitionLevelId = c.req.query("id"); // Get the id from query parameter
    if (!petitionLevelId) {
      return c.json({ error: "Petition level ID is required." }, 400);
    }

    const petitionLevelItem = await db.select().from(petitionLevel).where({ id: petitionLevelId }).limit(1);

    if (!petitionLevelItem.length) {
      return c.json({ error: "Petition level not found." }, 404);
    }

    return c.json(petitionLevelItem[0], 200); // Return the petition level data
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition level.", details: (error as any).message },
      500
    );
  }
};