import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// credenciales del administrador para autenticacion en el frontend
export const ADMIN = [
    {
        usuario: process.env.ADMIN_USER || 'admin',
        contrasena: process.env.ADMIN_PASSWORD || 'admin'
    }
];

// configuracion del pool de conexiones a la base de datos
// el pool permite reutilizar conexiones y es mas eficiente
const poolConexion = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // donde esta la base de datos
    port: process.env.DB_PORT || 3306, // puerto de mysql
    user: process.env.DB_USER || 'root', // usuario de la BD
    password: process.env.DB_PASSWORD || '', // contrasena de la BD
    database: process.env.DB_NAME || 'portafolio', // nombre de la base de datos
    waitForConnections: true, // esperar si no hay conexiones disponibles
    connectionLimit: 10, // maximo 10 conexiones simultaneas
    queueLimit: 0 // sin limite de cola
});

// funcion para probar la conexion a la base de datos
export async function probarConexion() {
    try {
        // intento obtener una conexion del pool
        const conexion = await poolConexion.getConnection();
        // si llego aqui, la conexion funciona
        console.log('✅ Base de datos conectada exitosamente');
        // libero la conexion para que otros la puedan usar
        conexion.release();
        // retorno true porque todo salio bien
        return true;
    } catch (error) {
        // si hay error, lo imprimo
        console.error('❌ Fallo la conexion a la base de datos:', error.message);
        // retorno false porque hubo un error
        return false;
    }
}

// exporto el pool como default para usarlo en otros archivos
export default poolConexion;