const express = require('express');
// const { initiatePayment, getPaymentHistory } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: APIs to manage payments
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Initiate a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "12345"
 *               amount:
 *                 type: number
 *                 example: 5000
 *               gatewayName:
 *                 type: string
 *                 example: "Razorpay"
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 */
router.post('/', authMiddleware, initiatePayment);
router.post('/get-payment-data', paymentController.getPaymentData);

// Check payment status
router.post('/check-payment-status', paymentController.checkPaymentStatus);

// Generate encrypted URL for payment
router.post('/encryption/generate', paymentController.generateEncryptedURL);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get payment history
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Successfully fetched payment history
 */
router.get('/', authMiddleware, getPaymentHistory);

module.exports = router;
