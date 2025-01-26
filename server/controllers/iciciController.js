const Payment = require('../models/Payment');

const handlePaymentResponse = async (req, res) => {
    try {
        // Extract data from the request body
        const {
            'Response Code': responseCode,
            'Unique Ref Number': uniqueRefNumber,
            'Service Tax Amount': serviceTaxAmount,
            'Processing Fee Amount': processingFeeAmount,
            'Total Amount': totalAmount,
            'Transaction Amount': transactionAmount,
            'Transaction Date': transactionDate,
            'Interchange Value': interchangeValue,
            'TDR': tdr,
            'Payment Mode': paymentMode,
            'SubMerchantId': subMerchantId,
            'ReferenceNo': referenceNo,
            'ID': id,
            'RS': rs,
            'TPS': tps,
            'mandatory fields': mandatoryFields,
            'optional fields': optionalFields,
            'RSV': rsv,
        } = req.body;

        // Log the data to the terminal
        console.log('Received Payment Response:', req.body);

        // Create a new payment record
        const payment = new Payment({
            responseCode,
            uniqueRefNumber,
            serviceTaxAmount: parseFloat(serviceTaxAmount),
            processingFeeAmount: parseFloat(processingFeeAmount),
            totalAmount: parseFloat(totalAmount),
            transactionAmount: parseFloat(transactionAmount),
            transactionDate,
            interchangeValue,
            tdr,
            paymentMode,
            subMerchantId,
            referenceNo,
            id,
            rs,
            tps,
            mandatoryFields,
            optionalFields,
            rsv,
        });

        // Save the payment record to the database
        await payment.save();

        // Send a success response
        res.status(200).json({ message: 'Payment data saved successfully', payment });
    } catch (error) {
        console.error('Error processing payment response:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handlePaymentResponse };