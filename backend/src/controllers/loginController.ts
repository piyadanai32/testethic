import connectDB from "../ultis/connectDB";
import { staff } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await connectDB();

// login staff ด้วย telNo จาก staff
export const loginStaff = async (c: any) => {
    try {
        const { telNo } = await c.req.json();

        if (!telNo) {
            return c.json({ error: "Phone number is required." }, 400);  // ตรวจสอบว่า telNo มีหรือไม่
        }

        // ค้นหาพนักงานโดยใช้ telNo
        const staffMember = await db
            .select()
            .from(staff)
            .where(sql`${staff.telNo} = ${telNo}`);  // ใช้ sql สำหรับการเปรียบเทียบค่า telNo

        if (staffMember.length === 0) {  // เช็คว่า staffMember มีข้อมูลหรือไม่
            return c.json({ error: "Staff not found." }, 404);
        }

        return c.json(staffMember[0], 200);  // ส่งข้อมูลพนักงานตัวแรก
    } catch (error) {
        console.error(error);
        return c.json(
            { error: "Failed to login staff.", details: (error as any).message },
            500
        );
    }
};
