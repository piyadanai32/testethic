import conMysql from "../ultis/connectDB";
import { roles } from "../db/schema";

const db = await conMysql();

// Get role by ID
export const getRoleById = async (c: any) => {
  try {
    const roleId = c.req.query("id"); // รับค่า id จาก query parameter
    if (!roleId) {
      return c.json({ error: "Role ID is required." }, 400);
    }

    const role = await db.select().from(roles).where({ id: roleId }).limit(1);

    if (!role.length) {
      return c.json({ error: "Role not found." }, 404);
    }

    return c.json(role[0], 200); // ส่งคืนข้อมูล role เดียว
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve role.", details: (error as any).message },
      500
    );
  }
};

// Get all roles
export const getAllRoles = async (c: any) => {
  try {
    const allRoles = await db.select().from(roles);
    return c.json(allRoles, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve roles.", details: (error as any).message },
      500
    );
  }
};
