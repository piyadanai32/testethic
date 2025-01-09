import conMysql from "../ultis/connectDB";
import { researcher, prename, department } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await conMysql();

// Get all researchers
export const getAllResearchersWithPrenameDepartment = async (c: any) => {
  try {
    const allResearchersWithPrenameDepartment = await db
      .select()
      .from(researcher)
      .leftJoin(prename, sql`${researcher.prenameId} = ${prename.id}`)
      .leftJoin(department, sql`${researcher.departmentId} = ${department.id}`);
    return c.json(allResearchersWithPrenameDepartment, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve researchers.", details: (error as any).message },
      500
    );
  }
}

// Add new researcher
export const addResearcher = async (c: any) => {
  try {
    const { prenameId, name, surname, departmentId, telNo, email } = await c.req.json();

    if (!prenameId || !name || !surname || !departmentId || !telNo || !email) {
      return c.json({ error: "All fields are required." }, 400);
    }

    await db.insert(researcher).values({
      prenameId,
      name,
      surname,
      departmentId,
      telNo,
      email,
    });

    return c.json({ message: "Researcher added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add researcher.", details: (error as any).message },
      500
    );
  }
};

export const getResearcherById = async (c: any) => {
    try {
      const researcherId = c.req.query("id"); // รับค่า id จาก query parameter
      if (!researcherId) {
        return c.json({ error: "Researcher ID is required." }, 400);
      }
  
      const researcherData = await db.select().from(researcher).where({ id: researcherId }).limit(1);
  
      if (!researcherData.length) {
        return c.json({ error: "Researcher not found." }, 404);
      }
  
      return c.json(researcherData[0], 200); // ส่งคืนข้อมูล researcher เดียว
    } catch (error) {
      console.error(error);
      return c.json(
        { error: "Failed to retrieve researcher.", details: (error as any).message },
        500
      );
    }
  };