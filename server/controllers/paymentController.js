// controllers/paymentController.js
const { initiatePayment, verifyPayment } = require('../services/paymentService');

exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const payment = await initiatePayment(orderId, amount);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const payment = await verifyPayment(paymentData);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
