import conMysql from "../ultis/connectDB";
import { department, faculty } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await conMysql();

export const getAllDepartmentsWithFaculty = async (c: any) => {
  try {
    const allDepartmentsWithFaculty = await db
      .select()
      .from(department)
      .leftJoin(faculty, sql`${department.facultyId} = ${faculty.id}`);
    return c.json(allDepartmentsWithFaculty, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve departments.", details: (error as any).message },
      500
    );
  }
};

// 