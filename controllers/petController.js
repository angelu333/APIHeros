/**
 * @swagger
 * tags:
 *   name: Mascotas
 *   description: Endpoints para gestión de mascotas
 */

import express from "express";
import { check, validationResult } from 'express-validator';
import petService from "../services/petService.js";
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
        const pets = await petService.getAllPets();
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
            const { name, type, superPower } = req.body;
            const newPet = new Pet(null, name, type, superPower);
            const addedPet = await petService.addPet(newPet);
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
 *           type: integer
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
        const result = await petService.deletePet(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router; 