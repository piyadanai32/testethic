import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "db",
            user: process.env.DB_USER || "user",
            password: process.env.DB_PASSWORD || "password",
            database: process.env.DB_NAME || "ethic",
        });

        return drizzle(connection);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    }
}

export default connectDB;
