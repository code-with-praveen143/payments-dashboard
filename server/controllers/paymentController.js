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
    const paymentData = req.body || req.query; // Handle both POST and GET responses

    console.log('Payment Response Received:', paymentData);

    const { status, orderId, transactionId, message, amount } = paymentData;

    // Verify the payment
    const payment = await verifyPayment(paymentData);

    // Determine the status
    let redirectStatus = 'success=false'; // Default to failure
    if (payment.status === 'success') {
      redirectStatus = 'success=true';
    }

    // Redirect user with status and additional parameters
    res.redirect(
      `https://khit.campusify.io/dashboard/return-url?${redirectStatus}&orderId=${orderId}&transactionId=${transactionId}&message=${encodeURIComponent(
        message || 'Transaction failed'
      )}&amount=${amount}`
    );
  } catch (error) {
    console.error('Error verifying payment:', error.message);

    // Redirect to the return URL with failure details
    res.redirect(
      `https://khit.campusify.io/dashboard/return-url?success=false&message=${encodeURIComponent(
        error.message
      )}`
    );
  }
};



