import conMysql from "../ultis/connectDB";
import { petitionCommittee, committee , petition, staff, petitionStatus} from "../db/schema";
import { sql } from "drizzle-orm";

const db = await conMysql();

export const petitionCommitteeWithCommittee = async (c: any) => {
    try {
        const petitionCommitteeWithCommittee = await db
            .select()
            .from(petitionCommittee)
            .leftJoin(committee, sql`${petitionCommittee.committeeId} = ${committee.id}`)
            .leftJoin(petition, sql`${petitionCommittee.petitionId} = ${petition.id}`)
            .leftJoin(staff, sql`${petitionCommittee.approvedByStaff} = ${staff.id}`)
            .leftJoin(petitionStatus, sql`${petitionCommittee.statusId} = ${petitionStatus.id}`);
        return c.json(petitionCommitteeWithCommittee, 200);
    } catch (error) {
        console.error(error);
        return c.json(
            { error: "Failed to retrieve petition committees.", details: (error as any).message },
            500
        );
    }
};

export const addPetitionCommittee = async (c: any) => {
    try {
        const { petitionId, levelId, committeeId, statusId, note, approvedByStaff } = await c.req.json();
        await db.insert(petitionCommittee).values({
            petitionId,
            levelId,
            committeeId,
            statusId,
            note,
            approvedByStaff,
        });
        return c.json({ message: "Petition committee added successfully!" }, 201);
    } catch (error) {
        console.error(error);
        return c.json(
            { error: "Failed to add petition committee.", details: (error as any).message },
            500
        );
    }
};