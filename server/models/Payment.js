const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    responseCode: { type: String, required: true },
    uniqueRefNumber: { type: String, required: true },
    serviceTaxAmount: { type: Number, default: 0.00 },
    processingFeeAmount: { type: Number, default: 0.00 },
    totalAmount: { type: Number, required: true },
    transactionAmount: { type: Number, required: true },
    transactionDate: { type: String, required: true },
    interchangeValue: { type: String, default: '' },
    tdr: { type: String, default: '' },
    paymentMode: { type: String, required: true },
    subMerchantId: { type: String, required: true },
    referenceNo: { type: String, required: true },
    id: { type: String, required: true },
    rs: { type: String, required: true },
    tps: { type: String, default: null },
    mandatoryFields: { type: String, required: true },
    optionalFields: { type: String, default: null },
    rsv: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);