import conMysql from "../ultis/connectDB";
import { petitionType } from "../db/schema";

const db = await conMysql();

// Get all petition types
export const getAllPetitionTypes = async (c: any) => {
  try {
    const allPetitionTypes = await db.select().from(petitionType);
    return c.json(allPetitionTypes, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition types.", details: (error as any).message },
      500
    );
  }
};

// Add new petition type
export const addPetitionType = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionType).values({
      description,
    });

    return c.json({ message: "Petition type added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition type.", details: (error as any).message },
      500
    );
  }
};

// Get petition type by ID
export const getPetitionTypeById = async (c: any) => {
  try {
    const petitionTypeId = c.req.query("id"); // รับค่า id จาก query parameter
    if (!petitionTypeId) {
      return c.json({ error: "Petition type ID is required." }, 400);
    }

    const petitionTypeData = await db
      .select()
      .from(petitionType)
      .where({ id: petitionTypeId })
      .limit(1);

    if (!petitionTypeData.length) {
      return c.json({ error: "Petition type not found." }, 404);
    }

    return c.json(petitionTypeData[0], 200); // ส่งคืนข้อมูล petition type เดียว
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition type.", details: (error as any).message },
      500
    );
  }
};
