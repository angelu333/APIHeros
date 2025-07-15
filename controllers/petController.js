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

const router = express.Router();

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
        const pets = await getAllPets();
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
            const addedPet = await addPet(req.body);
            res.status(201).json(addedPet);
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
        const result = await deletePet(req.params.id);
        res.json(result);
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
        const heroes = await import('../repositories/heroRepository.js').then(m => m.default.getHeroes());
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

export default router; 