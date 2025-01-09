import conMysql from "../ultis/connectDB";
import { faculty } from "../db/schema";

const db = await conMysql();

// Get all faculties
export const getAllFaculties = async (c: any) => {
  try {
    const allFaculties = await db.select().from(faculty);
    return c.json(allFaculties, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve faculties.", details: (error as any).message },
      500
    );
  }
};

// Add new faculty
export const addFaculty = async (c: any) => {
  try {
    const { description, telNo } = await c.req.json();

    if (!description || !telNo) {
      return c.json({ error: "Both description and telNo are required." }, 400);
    }

    await db.insert(faculty).values({
      description,
      telNo,
    });

    return c.json({ message: "Faculty added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add faculty.", details: (error as any).message },
      500
    );
  }
};

// Get faculty by ID
export const getFacultyById = async (c: any) => {
  try {
    const facultyId = c.req.query("id"); // รับค่า id จาก query parameter
    if (!facultyId) {
      return c.json({ error: "Faculty ID is required." }, 400);
    }

    const facultyMember = await db.select().from(faculty).where({ id: facultyId }).limit(1);

    if (!facultyMember.length) {
      return c.json({ error: "Faculty not found." }, 404);
    }

    return c.json(facultyMember[0], 200); // ส่งคืนข้อมูล faculty เดียว
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve faculty.", details: (error as any).message },
      500
    );
  }
};
