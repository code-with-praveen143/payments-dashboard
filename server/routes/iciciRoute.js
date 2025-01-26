const express = require('express');
const router = express.Router();
const { handlePaymentResponse } = require('../controllers/iciciController');

// POST route to handle payment response
router.post('/dashboard/return-url', handlePaymentResponse);

module.exports = router;