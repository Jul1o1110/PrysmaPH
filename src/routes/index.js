import express from 'express';
import proyectosRoutes from './proyectos.routes.js';
import galeriaRoutes from './galeria.routes.js';
import mensajesRoutes from './mensajes.routes.js';
import fotografiasRoutes from './fotografias.routes.js';

const router = express.Router();

// Montar rutas
router.use('/proyectos', proyectosRoutes);
router.use('/', galeriaRoutes); // Incluye rutas de galería (proyectos/:id/galeria y galeria)
router.use('/mensajes_contacto', mensajesRoutes); // Cambiar a mensajes_contacto para coincidir con frontend
router.use('/fotografias', fotografiasRoutes);

// Ruta de prueba para verificar que la API está funcionando
router.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'API PrysmaPH funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

export default router;
