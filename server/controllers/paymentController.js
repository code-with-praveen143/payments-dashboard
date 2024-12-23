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
    // ICICI Eazypay sends payment data to this endpoint
    const paymentData = req.body;

    // Verify the payment
    const payment = await verifyPayment(paymentData);

    // Redirect user to a frontend page with status
    const status = payment.status === 'success' ? 'success=true' : 'success=false';
    res.redirect(`https://khit.campusify.io/dashboard/return-url?${status}`);
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    res.redirect('https://khit.campusify.io/dashboard/return-url?success=false');
  }
};

