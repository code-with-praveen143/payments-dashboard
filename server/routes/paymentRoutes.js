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
 * /return-url:
 *   post:
 *     summary: Handle the return URL callback from ICICI Eazypay.
 *     description: This endpoint receives payment data from ICICI Eazypay, verifies the payment, and redirects the user to the frontend with a status.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Unique ID for the payment order.
 *                 example: "ORD12345"
 *               transactionId:
 *                 type: string
 *                 description: Transaction ID provided by ICICI Eazypay.
 *                 example: "TXN67890"
 *               status:
 *                 type: string
 *                 description: Payment status (e.g., success, failure).
 *                 example: "success"
 *     responses:
 *       302:
 *         description: Redirects the user to the frontend return URL with the payment status.
 *       500:
 *         description: Server error or payment verification failed.
 */
router.post('/dashboard/return-url', paymentController.verifyPayment);
  

module.exports = router;
