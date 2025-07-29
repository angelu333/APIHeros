import express from 'express';
import heroController from './controllers/heroController.js';
import petController from './controllers/petController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { connectDB } from './db.js';
import userController from './controllers/userController.js';

const app = express();

// Conectar a MongoDB
connectDB();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Superhéroes',
      version: '1.0.0',
      description: 'Documentación de la API de superhéroes y mascotas'
    },
    tags: [
      { name: 'Autenticación', description: 'Endpoints para registro y login de usuarios' },
      { name: 'Heroes', description: 'Endpoints para gestión de superhéroes' },
      { name: 'Mascotas', description: 'Endpoints para gestión de mascotas' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos del juego
app.use('/api', userController); // Registrar primero para que salga arriba
app.use('/api', heroController);
app.use('/api', petController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
