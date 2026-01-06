import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Admin credentials for frontend authentication
export const ADMIN = [
    {
        usuario: process.env.ADMIN_USER || 'admin',
        contrasena: process.env.ADMIN_PASSWORD || 'admin'
    }
];

// Database connection pool configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portafolio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

export default pool;