const express = require('express');
const { addBusRoute, getBusRoutes, updateBusRoute } = require('../controllers/busRouteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bus Routes
 *   description: APIs to manage bus routes
 */

/**
 * @swagger
 * /api/busRoutes:
 *   post:
 *     summary: Add a new bus route
 *     tags: [Bus Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route:
 *                 type: string
 *                 example: "Route A"
 *               fee:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Bus route added successfully
 */
router.post('/', authMiddleware, addBusRoute);

/**
 * @swagger
 * /api/busRoutes:
 *   get:
 *     summary: Get all bus routes
 *     tags: [Bus Routes]
 *     responses:
 *       200:
 *         description: Successfully fetched bus routes
 */
router.get('/', authMiddleware, getBusRoutes);

/**
 * @swagger
 * /api/busRoutes/{id}:
 *   put:
 *     summary: Update a bus route
 *     tags: [Bus Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Bus route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fee:
 *                 type: number
 *                 example: 6000
 *     responses:
 *       200:
 *         description: Bus route updated successfully
 */
router.put('/:id', authMiddleware, updateBusRoute);

module.exports = router;
