# PrysmaPH - Backend API

Backend API del sistema de portafolio PrysmaPH para gestión de proyectos de arquitectura y fotografía.

## 🚀 Características

- **API RESTful** completa con Express.js
- **Base de datos MySQL** con conexión mediante pool
- **Validaciones robustas** usando express-validator
- **Manejo de errores** consistente
- **Arquitectura en capas**: Modelos, Repositorios, Controladores, Rutas
- **Integridad referencial** con CASCADE en relaciones
- **CORS habilitado** para comunicación con frontend

## 📋 Requisitos Previos

- Node.js >= 18.x
- MySQL >= 8.0
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd PrysmaPH
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Copiar el archivo de ejemplo y configurar:
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=portafolio

PORT=8081
NODE_ENV=development

ADMIN_USER=admin
ADMIN_PASSWORD=admin
```

4. **Crear la base de datos:**

Ejecutar el script SQL incluido:
```bash
mysql -u root -p < portafolio.sql
```

O crear manualmente desde MySQL:
```sql
CREATE DATABASE portafolio;
USE portafolio;
SOURCE portafolio.sql;
```

## ▶️ Ejecución

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:8081`

## 📚 Estructura del Proyecto

```
PrysmaPH/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuración de conexión MySQL
│   │   └── local-storage.js     # Utilidades de localStorage (frontend)
│   ├── models/
│   │   ├── Proyecto.js          # Modelo de datos de Proyecto
│   │   ├── GaleriaProyecto.js   # Modelo de datos de Galería
│   │   ├── MensajeContacto.js   # Modelo de datos de Mensaje
│   │   └── Fotografia.js        # Modelo de datos de Fotografía
│   ├── repositories/
│   │   ├── ProyectoRepository.js
│   │   ├── GaleriaProyectoRepository.js
│   │   ├── MensajeContactoRepository.js
│   │   └── FotografiaRepository.js
│   ├── validators/
│   │   ├── proyectoValidator.js
│   │   ├── galeriaProyectoValidator.js
│   │   ├── mensajeContactoValidator.js
│   │   └── fotografiaValidator.js
│   ├── controllers/
│   │   ├── ProyectoController.js
│   │   ├── GaleriaProyectoController.js
│   │   ├── MensajeContactoController.js
│   │   └── FotografiaController.js
│   └── routes/
│       ├── proyectos.routes.js
│       ├── galeria.routes.js
│       ├── mensajes.routes.js
│       ├── fotografias.routes.js
│       └── index.js
├── server.js                    # Punto de entrada del servidor
├── package.json
├── .env.example
├── .gitignore
└── portafolio.sql               # Script de creación de BD
```

## 🌐 API Endpoints

### Proyectos

#### Listar todos los proyectos
```http
GET /api/portafolio/proyectos
```

Filtrar por categoría:
```http
GET /api/portafolio/proyectos?categoria=arquitectura
GET /api/portafolio/proyectos?categoria=fotografia
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "titulo": "Casa Moderna",
    "descripcion": "Diseño arquitectónico minimalista",
    "imagen_principal": "/images/proyecto1.jpg",
    "categoria": "arquitectura",
    "fecha_creacion": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Obtener proyecto por ID (con galería)
```http
GET /api/portafolio/proyectos/:id
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "titulo": "Casa Moderna",
  "descripcion": "Diseño arquitectónico minimalista",
  "imagen_principal": "/images/proyecto1.jpg",
  "categoria": "arquitectura",
  "fecha_creacion": "2024-01-15T10:30:00.000Z",
  "galeria": [
    {
      "id": 1,
      "id_proyecto": 1,
      "url_imagen": "/images/galeria1.jpg"
    }
  ]
}
```

#### Crear proyecto
```http
POST /api/portafolio/proyectos
Content-Type: application/json

{
  "titulo": "Nuevo Proyecto",
  "descripcion": "Descripción del proyecto",
  "imagen_principal": "/images/nuevo.jpg",
  "categoria": "arquitectura"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Proyecto creado exitosamente",
  "proyecto": {
    "id": 2,
    "titulo": "Nuevo Proyecto",
    "descripcion": "Descripción del proyecto",
    "imagen_principal": "/images/nuevo.jpg",
    "categoria": "arquitectura",
    "fecha_creacion": "2024-01-20T15:45:00.000Z"
  }
}
```

#### Actualizar proyecto
```http
PUT /api/portafolio/proyectos/:id
Content-Type: application/json

{
  "titulo": "Proyecto Actualizado",
  "descripcion": "Nueva descripción"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Proyecto actualizado exitosamente",
  "proyecto": { ... }
}
```

#### Eliminar proyecto
```http
DELETE /api/portafolio/proyectos/:id
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Proyecto y su galería eliminados exitosamente"
}
```

### Galería de Proyectos

#### Obtener galería de un proyecto
```http
GET /api/portafolio/proyectos/:id/galeria
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "id_proyecto": 1,
    "url_imagen": "/images/galeria1.jpg"
  }
]
```

#### Agregar imagen a galería
```http
POST /api/portafolio/galeria
Content-Type: application/json

{
  "id_proyecto": 1,
  "url_imagen": "/images/nueva_imagen.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Imagen agregada a la galería exitosamente",
  "id": 5,
  "id_proyecto": 1,
  "url_imagen": "/images/nueva_imagen.jpg"
}
```

#### Eliminar imagen de galería
```http
DELETE /api/portafolio/galeria/:id
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Imagen eliminada de la galería exitosamente"
}
```

### Mensajes de Contacto

#### Listar todos los mensajes
```http
GET /api/portafolio/mensajes_contacto
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+34 600 123 456",
    "mensaje": "Estoy interesado en sus servicios",
    "fechaEnvio": "2024-01-15T12:30:00.000Z"
  }
]
```

#### Crear mensaje de contacto
```http
POST /api/portafolio/mensajes_contacto
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@example.com",
  "telefono": "+34 600 987 654",
  "mensaje": "Me gustaría solicitar información sobre sus proyectos"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Mensaje enviado exitosamente",
  "id": 2
}
```

#### Eliminar mensaje
```http
DELETE /api/portafolio/mensajes_contacto/:id
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Mensaje eliminado exitosamente"
}
```

### Fotografías

#### Listar todas las fotografías
```http
GET /api/portafolio/fotografias
```

Filtrar por categoría:
```http
GET /api/portafolio/fotografias?categoria=retrato
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "url_imagen": "/images/foto1.jpg",
    "categoria": "retrato",
    "alt_text": "Descripción de la foto",
    "fecha_subida": "2024-01-15T10:00:00.000Z"
  }
]
```

#### Crear fotografía
```http
POST /api/portafolio/fotografias
Content-Type: application/json

{
  "url_imagen": "/images/nueva_foto.jpg",
  "categoria": "paisaje",
  "alt_text": "Hermoso paisaje"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Fotografía creada exitosamente",
  "id": 2,
  "fotografia": { ... }
}
```

#### Eliminar fotografía
```http
DELETE /api/portafolio/fotografias/:id
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Fotografía eliminada exitosamente"
}
```

### Health Check

```http
GET /api/portafolio/health
```

**Respuesta (200):**
```json
{
  "status": "OK",
  "message": "API PrysmaPH funcionando correctamente",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## ⚠️ Códigos de Error

- **400 Bad Request**: Datos de entrada inválidos o faltantes
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

**Ejemplo de error de validación:**
```json
{
  "errors": [
    {
      "msg": "El título es requerido",
      "param": "titulo",
      "location": "body"
    }
  ]
}
```

**Ejemplo de error genérico:**
```json
{
  "error": "Proyecto no encontrado"
}
```

## 🔒 Seguridad

- **Prepared Statements**: Todas las queries usan prepared statements para prevenir SQL injection
- **Validación de datos**: express-validator en todas las rutas que reciben datos
- **Sanitización**: Los datos de entrada son limpiados y validados
- **CORS**: Configurado para permitir requests del frontend

## 🗃️ Modelo de Datos

### Proyectos
```sql
CREATE TABLE proyectos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_principal VARCHAR(255) NOT NULL,
  categoria ENUM('arquitectura','fotografia') NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Galería de Proyectos
```sql
CREATE TABLE galeria_proyectos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_proyecto INT NOT NULL,
  url_imagen VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON DELETE CASCADE
);
```

### Mensajes de Contacto
```sql
CREATE TABLE mensajes_contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  mensaje TEXT NOT NULL,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fotografías
```sql
CREATE TABLE fotografias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url_imagen VARCHAR(255) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  alt_text VARCHAR(255),
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Pruebas

Puedes probar los endpoints usando herramientas como:
- **curl**
- **Postman**
- **Thunder Client** (extensión de VS Code)
- **Insomnia**

Ejemplo con curl:
```bash
# Obtener todos los proyectos
curl http://localhost:8081/api/portafolio/proyectos

# Crear un mensaje de contacto
curl -X POST http://localhost:8081/api/portafolio/mensajes_contacto \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "mensaje": "Este es un mensaje de prueba"
  }'
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- **Equipo PrysmaPH**

## 📞 Soporte

Para soporte o preguntas, contactar a través del formulario de contacto del sitio web.
