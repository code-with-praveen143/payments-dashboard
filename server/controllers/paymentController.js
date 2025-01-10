const PaymentHistory = require("../models/PaymentHistory");
const logger = require("../utils/logger");

// Initiate a payment
const initiatePayment = async (req, res) => {
  try {
    const {
      studentId,
      amount,
      gatewayName,
      transactionId,
      yearSem,
      paymentType,
    } = req.body;

    if (
      !studentId ||
      !amount ||
      !gatewayName ||
      !transactionId ||
      !yearSem ||
      !paymentType
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const payment = new PaymentHistory({
      studentId,
      amount,
      gatewayName,
      transactionId,
      yearSem,
      paymentType,
    });

    await payment.save();
    res
      .status(200)
      .json({ message: "Payment initiated successfully", payment });
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    res
      .status(500)
      .json({ message: "Error initiating payment", error: error.message });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  try {
    // Fetch all payments and populate student details if referenced
    const payments = await PaymentHistory.find()
    res.status(200).json(payments);
  } catch (error) {
    logger.error(`Error fetching payment history: ${error.message}`);
    res.status(500).json({ message: 'Error fetching payment history' });
  }
};

const fetch = require('node-fetch'); // Ensure to include node-fetch if you're using it to make HTTP requests

// Get payment data based on transaction ID
exports.getPaymentData = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Example: Replace with actual logic to fetch data from DB or payment service
    const paymentData = {
      transactionId: transactionId,
      amount: 100,  // Example amount
      status: 'Pending',
    };

    res.json(paymentData);
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ error: 'Failed to fetch payment data from server' });
  }
};

// Check payment status (e.g., Completed or Pending)
exports.checkPaymentStatus = async (req, res) => {
  const { transactionId } = req.body;
  try {
    // Example logic for checking status
    const paymentStatus = 'Completed';  // Example status

    res.json({ status: paymentStatus });
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
};

// Generate encrypted URL for payment
exports.generateEncryptedURL = async (req, res) => {
  const { transactionAmount } = req.body;

  try {
    const referenceNo = Math.floor(Math.random() * 1000000000);  // Generate a random reference number
    const mandatoryFields = `${referenceNo}|11|${transactionAmount}`;

    const requestBody = {
      merchantID: '386949',
      mandatoryFields: mandatoryFields,
      optionalFields: '',
      returnURL: 'http://localhost:3000/dashboard/return-url', // Adjust this to your actual return URL
      referenceNo: referenceNo.toString(),
      subMerchantID: '11',
      transactionAmount: transactionAmount,
      payMode: '9', // Adjust this as per your payment system
    };

    const response = await fetch('https://osaw.in/v1/payment/api/encryption/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to generate encrypted URL');
    }

    const data = await response.json();
    res.json({ encryptedURL: data.encryptedURL });
  } catch (error) {
    console.error('Error generating encrypted URL:', error);
    res.status(500).json({ error: 'Failed to generate encrypted URL' });
  }
};


module.exports = { initiatePayment, getPaymentHistory };
