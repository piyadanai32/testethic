import conMysql from "../ultis/connectDB";
import { staff, roles } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await conMysql();

// Get all staff
export const getAllStaffWithRole = async (c: any) => {
  try {
    const allStaffWithRole = await db
      .select()
      .from(staff)
      .leftJoin(roles, sql`${staff.roleId} = ${roles.id}`);
    return c.json(allStaffWithRole, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve staff.", details: (error as any).message },
      500
    );
  }
};

// Add new staff
export const addStaff = async (c: any) => {
  try {
    const { email, name, surname, telNo, roleId } = await c.req.json();

    if (!email || !name || !surname || !telNo || !roleId) {
      return c.json({ error: "All fields are required." }, 400);
    }

    await db.insert(staff).values({
      email,
      name,
      surname,
      telNo,
      roleId,
    });

    return c.json({ message: "Staff added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add staff.", details: (error as any).message },
      500
    );
  }
};

export const getStaffById = async (c: any) => {
    try {
      const staffId = c.req.query("id"); // รับค่า id จาก query parameter
      if (!staffId) {
        return c.json({ error: "Staff ID is required." }, 400);
      }
  
      const staffMember = await db.select().from(staff).where({ id: staffId }).limit(1);
  
      if (!staffMember.length) {
        return c.json({ error: "Staff not found." }, 404);
      }
  
      return c.json(staffMember[0], 200); // ส่งคืนข้อมูล staff เดียว
    } catch (error) {
      console.error(error);
      return c.json(
        { error: "Failed to retrieve staff.", details: (error as any).message },
        500
      );
    }
  };
