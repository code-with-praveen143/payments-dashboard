// routes/encryptionRoutes.js
const express = require('express');
const router = express.Router();
const encryptionController = require('../controllers/encryptionController');

/**
 * @swagger
 * tags:
 *   name: Encryption
 *   description: APIs to manage Encryption
 */

/**
 * @swagger
 * /api/encryption/generate:
 *   post:
 *     summary: Generate Encrypted ICICI Payment URL
 *     tags: [Encryption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantID:
 *                 type: string
 *               mandatoryFields:
 *                 type: string
 *               optionalFields:
 *                 type: string
 *               returnURL:
 *                 type: string
 *               referenceNo:
 *                 type: string
 *               subMerchantID:
 *                 type: string
 *               transactionAmount:
 *                 type: string
 *               payMode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Encrypted URL generated successfully
 */
router.post('/generate', encryptionController.createEncryptedURL);

module.exports = router;
