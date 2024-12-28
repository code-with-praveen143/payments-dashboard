const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to the User (Student)
  paymentType: { type: String, enum: ['tuition', 'special'], required: true }, // Fee type
  yearSem: { type: String, required: true }, // Year and semester for the payment
  amount: { type: Number, required: true }, // Amount paid
  paymentDate: { type: Date, default: Date.now }, // Date of the payment
  transactionId: { type: String, required: true }, // Unique transaction ID from the payment gateway
  remarks: { type: String }, // Optional remarks for the payment
});

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);
