const PaymentHistory = require('../models/PaymentHistory');
const logger = require('../utils/logger');

// Initiate a payment
const initiatePayment = async (req, res) => {
  try {
    const { studentId, amount, gatewayName } = req.body;

    const payment = new PaymentHistory({ studentId, amount, gatewayName });
    await payment.save();

    logger.info(`Payment initiated for studentId: ${studentId}, amount: ${amount}`);
    res.status(200).json({ message: 'Payment initiated successfully', payment });
  } catch (error) {
    logger.error(`Error initiating payment: ${error.message}`);
    res.status(500).json({ message: 'Error initiating payment' });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await PaymentHistory.find().populate('studentId', 'name email');
    res.status(200).json(payments);
  } catch (error) {
    logger.error(`Error fetching payment history: ${error.message}`);
    res.status(500).json({ message: 'Error fetching payment history' });
  }
};

module.exports = { initiatePayment, getPaymentHistory };
