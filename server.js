import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './src/config/database.js';
import routes from './src/routes/index.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parser para JSON
app.use(express.urlencoded({ extended: true })); // Parser para URL-encoded

// Middleware de logging para desarrollo
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Rutas principales
app.use('/api/portafolio', routes);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido a la API de PrysmaPH',
        version: '1.0.0',
        endpoints: {
            proyectos: '/api/portafolio/proyectos',
            galeria: '/api/portafolio/galeria',
            mensajes: '/api/portafolio/mensajes_contacto',
            fotografias: '/api/portafolio/fotografias',
            health: '/api/portafolio/health'
        }
    });
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path 
    });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Función para iniciar el servidor
async function startServer() {
    try {
        // Probar conexión a la base de datos
        console.log('🔌 Probando conexión a la base de datos...');
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.error('⚠️  No se pudo conectar a la base de datos. Verifica tu configuración en .env');
            console.log('El servidor se iniciará de todos modos, pero las operaciones de base de datos fallarán.');
        }

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log('=====================================');
            console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
            console.log(`📍 URL: http://localhost:${PORT}`);
            console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log('=====================================');
            console.log('Endpoints disponibles:');
            console.log(`  - GET    /api/portafolio/proyectos`);
            console.log(`  - POST   /api/portafolio/proyectos`);
            console.log(`  - GET    /api/portafolio/proyectos/:id`);
            console.log(`  - PUT    /api/portafolio/proyectos/:id`);
            console.log(`  - DELETE /api/portafolio/proyectos/:id`);
            console.log(`  - GET    /api/portafolio/proyectos/:id/galeria`);
            console.log(`  - POST   /api/portafolio/galeria`);
            console.log(`  - DELETE /api/portafolio/galeria/:id`);
            console.log(`  - GET    /api/portafolio/mensajes_contacto`);
            console.log(`  - POST   /api/portafolio/mensajes_contacto`);
            console.log(`  - DELETE /api/portafolio/mensajes_contacto/:id`);
            console.log(`  - GET    /api/portafolio/fotografias`);
            console.log(`  - POST   /api/portafolio/fotografias`);
            console.log(`  - DELETE /api/portafolio/fotografias/:id`);
            console.log('=====================================');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Manejo de señales de terminación
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT recibido. Cerrando servidor...');
    process.exit(0);
});

// Iniciar servidor
startServer();

export default app;
