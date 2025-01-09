import conMysql from "../ultis/connectDB";
import { pettitionFiles } from "../db/schema";

const db = await conMysql();

// Get a file by ID
export const getFileById = async (c: any) => {
  try {
    const fileId = c.req.query("id"); // Receive `id` from query parameter
    if (!fileId) {
      return c.json({ error: "File ID is required." }, 400);
    }

    const file = await db.select().from(pettitionFiles).where({ id: fileId }).limit(1);

    if (!file.length) {
      return c.json({ error: "File not found." }, 404);
    }

    return c.json(file[0], 200); // Return a single file record
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve file.", details: (error as any).message },
      500
    );
  }
};

// Get all files
export const getAllFiles = async (c: any) => {
  try {
    const allFiles = await db.select().from(pettitionFiles);
    return c.json(allFiles, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve files.", details: (error as any).message },
      500
    );
  }
};

// Add a new file
export const addFile = async (c: any) => {
  try {
    const { name, extension, md5, petitionId, documentTypeId } = await c.req.json();

    if (!name || !extension || !md5 || !petitionId || !documentTypeId) {
      return c.json({ error: "All fields are required." }, 400);
    }

    const newFile = await db.insert(pettitionFiles).values({
      name,
      extension,
      md5,
      petitionId,
      documentTypeId,
    });

    return c.json({ success: true, data: newFile }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add file.", details: (error as any).message },
      500
    );
  }
};