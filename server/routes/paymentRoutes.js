// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /api/payments/initiate:
 *   post:
 *     summary: Initiate payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment initiation successful
 */
router.post('/initiate', paymentController.initiatePayment);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verification successful
 */
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
