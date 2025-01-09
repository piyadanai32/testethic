import conMysql from "../ultis/connectDB";
import { petitionDocumentType } from "../db/schema";

const db = await conMysql();

// Get all petition document types
export const getAllPetitionDocumentTypes = async (c: any) => {
  try {
    const allPetitionDocumentTypes = await db.select().from(petitionDocumentType);
    return c.json(allPetitionDocumentTypes, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition document types.", details: (error as any).message },
      500
    );
  }
};

// Add new petition document type
export const addPetitionDocumentType = async (c: any) => {
  try {
    const { description } = await c.req.json();

    if (!description) {
      return c.json({ error: "Description is required." }, 400);
    }

    await db.insert(petitionDocumentType).values({
      description,
    });

    return c.json({ message: "Petition document type added successfully!" }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to add petition document type.", details: (error as any).message },
      500
    );
  }
};

// Get petition document type by ID
export const getPetitionDocumentTypeById = async (c: any) => {
  try {
    const documentTypeId = c.req.query("id"); // Retrieve the 'id' from query parameter
    if (!documentTypeId) {
      return c.json({ error: "Petition document type ID is required." }, 400);
    }

    const petitionDocumentTypeItem = await db.select().from(petitionDocumentType).where({ id: documentTypeId }).limit(1);

    if (!petitionDocumentTypeItem.length) {
      return c.json({ error: "Petition document type not found." }, 404);
    }

    return c.json(petitionDocumentTypeItem[0], 200); // Return the specific petition document type
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to retrieve petition document type.", details: (error as any).message },
      500
    );
  }
};
