import conMysql from "../ultis/connectDB";
import { prename } from "../db/schema";

const db = await conMysql();

// Get all prename entries
export const getAllPrenames = async (c: any) => {
  try {
    const allPrenames = await db.select().from(prename);
    return c.json(allPrenames, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve prenames.", details: (error as any).message },
      500
    );
  }
};

// Add new prename
export const addPrename = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(prename).values({ description });

    return c.json({ message: "Prename added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add prename.", details: (error as any).message },
      500
    );
  }
};

// Get prename by ID
export const getPrenameById = async (c: any) => {
  try {
    const prenameId = c.req.query("id");
    if (!prenameId) {
      return c.json({ error: "Prename ID is required." }, 400);
    }

    const prenameEntry = await db
      .select()
      .from(prename)
      .where({ id: prenameId })
      .limit(1);

    if (!prenameEntry.length) {
      return c.json({ error: "Prename not found." }, 404);
    }

    return c.json(prenameEntry[0], 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve prename.", details: (error as any).message },
      500
    );
  }
};