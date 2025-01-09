import connectDB from "../ultis/connectDB";
import { staff, researcher } from "../db/schema";
import { sql } from "drizzle-orm";

const db = await connectDB();

// Login function for both staff and researcher
export const loginStaffResearcher = async (c: any) => {
    try {
        const { telNo } = await c.req.json();
        if (!telNo) {
            return c.json({ error: "TelNo is required." }, 400);
        }

        // Query staff table
        const staffMember = await db
            .select()
            .from(staff)
            .where(sql`${staff.telNo} = ${telNo}`)
            .limit(1);

        if (staffMember.length) {
            return c.json(staffMember[0], 200); // Found in staff
        }

        // Query researcher table if not found in staff
        const researcherMember = await db
            .select()
            .from(researcher)
            .where(sql`${researcher.telNo} = ${telNo}`)
            .limit(1);

        if (researcherMember.length) {
            return c.json(researcherMember[0], 200); // Found in researcher
        }

        // Not found in both tables
        return c.json({ error: "User not found." }, 404);
    } catch (error) {
        console.error(error);
        return c.json(
            { error: "Failed to login.", details: (error as any).message },
            500
        );
    }
};
