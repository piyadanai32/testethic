import conMysql from "../ultis/connectDB";
import { committeePosition } from "../db/schema";

const db = await conMysql();

// Get all committee positions
export const getAllCommitteePositions = async (c: any) => {
  try {
    const allCommitteePositions = await db.select().from(committeePosition);
    return c.json(allCommitteePositions, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve committee positions.", details: (error as any).message },
      500
    );
  }
};

// Add new committee position
export const addCommitteePosition = async (c: any) => {
  try {
    const { id, description } = await c.req.json();

    if (!IDBCursorWithValue || !description) {
      return c.json({ error: "Position name and description are required." }, 400);
    }

    await db.insert(committeePosition).values({
      id,
      description,
    });

    return c.json({ message: "Committee position added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add committee position.", details: (error as any).message },
      500
    );
  }
};

// Get committee position by ID
export const getCommitteePositionById = async (c: any) => {
  try {
    const positionId = c.req.query("id"); // รับค่า id จาก query parameter
    if (!positionId) {
      return c.json({ error: "Committee position ID is required." }, 400);
    }

    const positionRecord = await db
      .select()
      .from(committeePosition)
      .where({ id: positionId })
      .limit(1);

    if (!positionRecord.length) {
      return c.json({ error: "Committee position not found." }, 404);
    }

    return c.json(positionRecord[0], 200); // ส่งคืนข้อมูล committee position เดียว
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve committee position.", details: (error as any).message },
      500
    );
  }
};
