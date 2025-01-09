import conMysql from "../ultis/connectDB";
import { pettitionFiles, petition } from "../db/schema"; // ใช้ schema ที่กำหนดไว้

const db = await conMysql();

// Get all petition files
export const getAllFiles = async (c: any) => {
  try {
    const files = await db.select().from(pettitionFiles);
    return c.json(files, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve files.", details: (error as any).message },
      500
    );
  }
};

// Add new petition file
export const addFile = async (c: any) => {
  try {
    const { name, extension, md5, petitionId, documentTypeId } = await c.req.json();

    if (!name || !extension || !md5 || !petitionId || !documentTypeId) {
      return c.json({ error: "All fields are required." }, 400);
    }

    await db.insert(pettitionFiles).values({
      name,
      extension,
      md5,
      petitionId,
      documentTypeId,
      createAt: new Date(),
    });

    return c.json({ message: "File added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add file.", details: (error as any).message },
      500
    );
  }
};
