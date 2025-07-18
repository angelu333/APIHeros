/**
 * @swagger
 * tags:
 *   name: Mascotas
 *   description: Endpoints para gestión de mascotas
 */

import express from "express";
import { check, validationResult } from 'express-validator';
import {
  getAllPets,
  addPet,
  deletePet,
  getPetById,
  feedPet,
  bathPet,
  walkPet,
  equipPet,
  unequipPet,
  curePet
} from "../services/petService.js";
import Pet from "../models/petModel.js";
import Hero from '../models/heroModel.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Proteger todos los endpoints
router.use(requireAuth);

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get("/pets", async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user._id });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Agrega una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - superPower
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               superPower:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota creada
 *       400:
 *         description: Error de validación
 */
router.post("/pets",
    [
        check('name').not().isEmpty().withMessage('El nombre es requerido'),
        check('type').not().isEmpty().withMessage('El tipo es requerido'),
        check('superPower').not().isEmpty().withMessage('El super poder es requerido')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error : errors.array() })
        }
        try {
            const petData = { ...req.body, owner: req.user._id };
            const newPet = new Pet(petData);
            await newPet.save();
            res.status(201).json(newPet);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Elimina una mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada
 *       404:
 *         description: Mascota no encontrada
 */
router.delete('/pets/:id', async (req, res) => {
    try {
        const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });
        res.json({ message: 'Mascota eliminada' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/status:
 *   get:
 *     summary: Consulta el estado dinámico de la mascota (solo si está adoptada)
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Estado actual de la mascota
 *       404:
 *         description: Mascota no encontrada o no adoptada
 */
router.get('/pets/:id/status', async (req, res) => {
    try {
        // Verifica si la mascota está adoptada por algún héroe
        const petId = parseInt(req.params.id);
        const heroes = await Hero.find().lean();
        const adopted = heroes.some(hero => hero.petId === petId);
        if (!adopted) {
            return res.status(404).json({ error: 'La mascota no ha sido adoptada por ningún héroe.' });
        }
        const pet = await getPetById(petId);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/feed:
 *   post:
 *     summary: Alimenta a la mascota con un alimento específico
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comida:
 *                 type: string
 *                 description: Tipo de comida (manzana, galleta, pizza, pastel, zanahoria, carne)
 *                 example: pizza
 *     responses:
 *       200:
 *         description: Mascota alimentada
 *       400:
 *         description: Comida no válida
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/feed', async (req, res) => {
    try {
        const { comida } = req.body || {};
        const pet = await feedPet(req.params.id, comida);
        res.json(pet);
    } catch (error) {
        if (error.message.startsWith('Debes especificar una comida válida')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/bath:
 *   post:
 *     summary: Baña a la mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota bañada
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/bath', async (req, res) => {
    try {
        const pet = await bathPet(req.params.id);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/walk:
 *   post:
 *     summary: Saca a pasear a la mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota paseada
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/walk', async (req, res) => {
    try {
        const pet = await walkPet(req.params.id);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/equip:
 *   post:
 *     summary: Equipa un item de ropa a la mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 description: free o pay
 *     responses:
 *       200:
 *         description: Mascota equipada
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/equip', async (req, res) => {
    try {
        const pet = await equipPet(req.params.id, req.body);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/unequip:
 *   post:
 *     summary: Quita un item de ropa a la mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota sin ese item
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/unequip', async (req, res) => {
    try {
        const { nombre } = req.body;
        const pet = await unequipPet(req.params.id, nombre);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}/cure:
 *   post:
 *     summary: Cura todas las enfermedades de la mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota curada
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/pets/:id/cure', async (req, res) => {
    try {
        const pet = await curePet(req.params.id);
        res.json(pet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/pets/adopt/{id}:
 *   post:
 *     summary: Adoptar una mascota
 *     tags: [Mascotas]
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
 *         description: Mascota adoptada
 *       404:
 *         description: Héroe o mascota no encontrados
 */
router.post('/pets/adopt/:id', async (req, res) => {
    try {
        const heroId = req.params.id;
        const { petId } = req.body;

        const hero = await Hero.findById(heroId);
        if (!hero) {
            return res.status(404).json({ error: 'Héroe no encontrado' });
        }

        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        // Verifica si la mascota ya está adoptada por otro héroe
        if (pet.adoptedBy) {
            return res.status(400).json({ error: 'Esta mascota ya ha sido adoptada por otro héroe.' });
        }

        // Verifica si el héroe ya tiene una mascota
        if (hero.petId) {
            return res.status(400).json({ error: 'Este héroe ya tiene una mascota.' });
        }

        pet.adoptedBy = heroId;
        pet.owner = heroId; // Asigna el héroe como propietario
        hero.petId = petId;

        await pet.save();
        await hero.save();

        res.json({ message: 'Mascota adoptada', pet, hero });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 