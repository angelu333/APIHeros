/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro y login de usuarios
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();
const JWT_SECRET = 'supersecreto'; // Cambia esto por una variable de entorno en producción

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: clave123
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Email o contraseña faltante o usuario ya existe
 *       500:
 *         description: Error interno
 */
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'El usuario ya existe' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    // Héroes predefinidos
    const heroes = [
      { name: 'ThunderMan', alias: 'El Rayo', city: 'Metropolis', team: 'Guardianes' },
      { name: 'AquaGirl', alias: 'Sirena Azul', city: 'Atlantis', team: 'Guardianes' },
      { name: 'Shadow', alias: 'El Fantasma', city: 'Gotham', team: 'Sombra' },
      { name: 'Blaze', alias: 'Fuego Vivo', city: 'Volcano City', team: 'Guardianes' },
      { name: 'Windy', alias: 'Viento Ligero', city: 'SkyTown', team: 'Aire' },
      { name: 'Iron Paw', alias: 'Garra de Acero', city: 'Tech City', team: 'Robots' },
      { name: 'Mystic', alias: 'El Mago', city: 'Arcana', team: 'Hechiceros' },
      { name: 'Volt', alias: 'El Chispa', city: 'Electro City', team: 'Guardianes' },
      { name: 'Nova', alias: 'Estrella Fugaz', city: 'Cosmo', team: 'Guardianes' },
      { name: 'Leaf', alias: 'Verde Vivo', city: 'Forestia', team: 'Guardianes' }
    ];
    await Hero.insertMany(heroes.map(h => ({ ...h, owner: user._id })));

    // Mascotas predefinidas
    const pets = [
      { name: 'Bolt', type: 'Perro', superPower: 'Velocidad', personalidad: 'juguetón' },
      { name: 'Whiskers', type: 'Gato', superPower: 'Sigilo', personalidad: 'curioso' },
      { name: 'Draco', type: 'Dragón', superPower: 'Fuego', personalidad: 'valiente' },
      { name: 'Fluffy', type: 'Conejo', superPower: 'Saltos', personalidad: 'alegre' },
      { name: 'Spike', type: 'Erizo', superPower: 'Defensa', personalidad: 'serio' },
      { name: 'Sky', type: 'Águila', superPower: 'Vuelo', personalidad: 'noble' },
      { name: 'Rocky', type: 'Tortuga', superPower: 'Resistencia', personalidad: 'tranquilo' },
      { name: 'Frost', type: 'Lobo', superPower: 'Hielo', personalidad: 'leal' },
      { name: 'Spark', type: 'Ratón', superPower: 'Electricidad', personalidad: 'travieso' },
      { name: 'Sunny', type: 'Pájaro', superPower: 'Luz', personalidad: 'optimista' }
    ];
    await Pet.insertMany(pets.map(p => ({ ...p, owner: user._id })));

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: clave123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email o contraseña incorrectos
 *       500:
 *         description: Error interno
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/user/seleccionar
 * Body: { heroId, petId }
 * Actualiza el héroe y/o mascota seleccionados del usuario autenticado
 */
router.post('/user/seleccionar', requireAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { heroId, petId } = req.body;
    const update = {};
    if (heroId) update.selectedHero = heroId;
    if (petId) update.selectedPet = petId;
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    res.json({ message: 'Selección actualizada', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/user/me
 * Devuelve el usuario autenticado con selectedHero y selectedPet poblados
 */
router.get('/user/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('selectedHero')
      .populate('selectedPet');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 