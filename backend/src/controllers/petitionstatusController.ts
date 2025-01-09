import conMysql from "../ultis/connectDB";
import { petitionStatus } from "../db/schema";

const db = await conMysql();

// Get all petition statuses
export const getAllPetitionStatuses = async (c: any) => {
  try {
    const allStatuses = await db.select().from(petitionStatus);
    return c.json(allStatuses, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition statuses.", details: (error as any).message },
      500
    );
  }
};

// Add a new petition status
export const addPetitionStatus = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionStatus).values({
      description,
    });

    return c.json({ message: "Petition status added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition status.", details: (error as any).message },
      500
    );
  }
};

// Get petition status by ID
export const getPetitionStatusById = async (c: any) => {
  try {
    const statusId = c.req.query("id");

    if (!statusId) {
      return c.json({ error: "Petition status ID is required." }, 400);
    }

    const statusData = await db
      .select()
      .from(petitionStatus)
      .where({ id: statusId })
      .limit(1);

    if (!statusData.length) {
      return c.json({ error: "Petition status not found." }, 404);
    }

    return c.json(statusData[0], 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition status.", details: (error as any).message },
      500
    );
  }
};