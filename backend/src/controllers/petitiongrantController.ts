import conMysql from "../ultis/connectDB";
import { petitionGrant } from "../db/schema";

const db = await conMysql();

// Get all petition grants
export const getAllPetitionGrants = async (c: any) => {
  try {
    const allPetitionGrants = await db.select().from(petitionGrant);
    return c.json(allPetitionGrants, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition grants.", details: (error as any).message },
      500
    );
  }
};

// Add new petition grant
export const addPetitionGrant = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionGrant).values({
      description,
    });

    return c.json({ message: "Petition grant added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition grant.", details: (error as any).message },
      500
    );
  }
};

// Get petition grant by ID
export const getPetitionGrantById = async (c: any) => {
  try {
    const petitionGrantId = c.req.query("id"); // Get petition grant ID from query parameter
    if (!petitionGrantId) {
      return c.json({ error: "Petition Grant ID is required." }, 400);
    }

    const petitionGrantRecord = await db
      .select()
      .from(petitionGrant)
      .where({ id: petitionGrantId })
      .limit(1);

    if (!petitionGrantRecord.length) {
      return c.json({ error: "Petition Grant not found." }, 404);
    }

    return c.json(petitionGrantRecord[0], 200); // Return the found petition grant
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition grant.", details: (error as any).message },
      500
    );
  }
};
