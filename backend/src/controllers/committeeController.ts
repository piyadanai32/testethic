import conMysql from "../ultis/connectDB";
import { committee, prename, committeePosition } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await conMysql();

// Get all committees
export const getAllCommitteesWithPrenameCommitteePosition = async (c: any) => {
  try {
    const allCommitteesWithPrenameCommitteePosition = await db
      .select()
      .from(committee)
      .leftJoin(prename, sql`${committee.prenameId} = ${prename.id}`)
      .leftJoin(committeePosition, sql`${committee.positionId} = ${committeePosition.id}`);
    return c.json(allCommitteesWithPrenameCommitteePosition, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve committees.", details: (error as any).message },
      500
    );
  }
}

// Add new committee
export const addCommittee = async (c: any) => {
  try {
    const { prenameId, name, surname, positionId, description, telNo } =
      await c.req.json();

    if (!prenameId || !name || !surname || !positionId || !description || !telNo) {
      return c.json({ error: "All fields are required." }, 400);
    }

    await db.insert(committee).values({
      prenameId,
      name,
      surname,
      positionId,
      description,
      telNo,
    });

    return c.json({ message: "Committee added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add committee.", details: (error as any).message },
      500
    );
  }
};

// Get committee by ID
export const getCommitteeById = async (c: any) => {
  try {
    const committeeId = c.req.query("id"); // รับค่า id จาก query parameter
    if (!committeeId) {
      return c.json({ error: "Committee ID is required." }, 400);
    }

    const committeeMember = await db
      .select()
      .from(committee)
      .where({ id: committeeId })
      .limit(1);

    if (!committeeMember.length) {
      return c.json({ error: "Committee not found." }, 404);
    }

    return c.json(committeeMember[0], 200); // ส่งคืนข้อมูล committee เดียว
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve committee.", details: (error as any).message },
      500
    );
  }
};