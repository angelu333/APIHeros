/**
 * @swagger
 * tags:
 *   name: Heroes
 *   description: Endpoints para gestión de superhéroes
 */

import express from "express";
import { check, validationResult } from 'express-validator';
import heroService from "../services/heroService.js";
import Hero from "../models/heroModel.js";
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Proteger todos los endpoints
router.use(requireAuth);

/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: Lista todos los héroes
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de héroes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hero'
 */
router.get('/heroes', async (req, res) => {
    try {
        const heroes = await Hero.find({ owner: req.user._id });
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Agrega un nuevo héroe
 *     tags: [Heroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - alias
 *             properties:
 *               name:
 *                 type: string
 *               alias:
 *                 type: string
 *               city:
 *                 type: string
 *               team:
 *                 type: string
 *     responses:
 *       201:
 *         description: Héroe creado
 *       400:
 *         description: Error de validación
 */
router.post("/heroes",
    [
        check('name').not().isEmpty().withMessage('El nombre es requerido'),
        check('alias').not().isEmpty().withMessage('El alias es requerido')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error : errors.array() })
        }
        try {
            const heroData = { ...req.body, owner: req.user._id };
            const newHero = new Hero(heroData);
            await newHero.save();
            res.status(201).json(newHero);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   put:
 *     summary: Actualiza un héroe existente
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del héroe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               alias:
 *                 type: string
 *               city:
 *                 type: string
 *               team:
 *                 type: string
 *     responses:
 *       200:
 *         description: Héroe actualizado
 *       404:
 *         description: Héroe no encontrado
 */
router.put("/heroes/:id", async (req, res) => {
    try {
        const hero = await Hero.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true }
        );
        if (!hero) return res.status(404).json({ error: 'Héroe no encontrado' });
        res.json(hero);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   delete:
 *     summary: Elimina un héroe
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del héroe
 *     responses:
 *       200:
 *         description: Héroe eliminado
 *       404:
 *         description: Héroe no encontrado
 */
router.delete('/heroes/:id', async (req, res) => {
    try {
        const hero = await Hero.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!hero) return res.status(404).json({ error: 'Héroe no encontrado' });
        res.json({ message: 'Héroe eliminado' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes/city/{city}:
 *   get:
 *     summary: Busca héroes por ciudad
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: Ciudad a buscar
 *     responses:
 *       200:
 *         description: Lista de héroes de la ciudad
 */
router.get('/heroes/city/:city', async (req, res) => {
    try {
        const heroes = await heroService.findHeroesByCity(req.params.city);
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/heroes/{id}/enfrentar:
 *   post:
 *     summary: Enfrenta a un héroe con un villano
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del héroe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               villain:
 *                 type: string
 *                 description: Nombre del villano
 *     responses:
 *       200:
 *         description: Mensaje de enfrentamiento
 *       404:
 *         description: Héroe no encontrado
 */
router.post('/heroes/:id/enfrentar', async (req, res) => {
    try {
        const result = await heroService.faceVillain(req.params.id, req.body.villain);
        res.json({ message: result });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/heroes/{id}/adoptar:
 *   post:
 *     summary: Un héroe adopta una mascota
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del héroe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: string
 *                 description: ID de la mascota a adoptar
 *     responses:
 *       200:
 *         description: Héroe con mascota adoptada
 *       404:
 *         description: Héroe o mascota no encontrada
 */
router.post('/heroes/:id/adoptar', async (req, res) => {
    try {
        const { petId } = req.body;
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Héroe no encontrado' });
        hero.petId = petId;
        await hero.save();
        res.json({ message: 'Mascota adoptada', hero });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes/adoptantes:
 *   get:
 *     summary: Lista los héroes que han adoptado una mascota, mostrando toda la info del héroe y de la mascota
 *     tags: [Heroes]
 *     responses:
 *       200:
 *         description: Lista de héroes con mascota adoptada
 */
router.get('/heroes/adoptantes', async (req, res) => {
    try {
        const heroes = await heroService.getHeroesWithPets(req.user._id);
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un héroe por ID
router.get('/heroes/:id', async (req, res) => {
    try {
        // Si usas autenticación por usuario, puedes agregar: owner: req.user._id
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Héroe no encontrado' });
        res.json(hero);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Listar héroes solo del usuario autenticado
router.get('/heroes', async (req, res) => {
    try {
        const heroes = await Hero.find({ owner: req.user._id });
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 