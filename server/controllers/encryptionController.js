// controllers/encryptionController.js
const { generateEncryptedURL } = require('../services/encryptionService');
const PaymentRequest = require('../models/PaymentRequest');

exports.createEncryptedURL = async (req, res) => {
  const encryptionKey = process.env.ICICI_ENCRYPTION_KEY;
  const {
    merchantID,
    mandatoryFields,
    optionalFields,
    returnURL,
    referenceNo,
    subMerchantID,
    transactionAmount,
    payMode,
  } = req.body;

  try {
    // Generate encrypted URL
    const encryptedURL = await generateEncryptedURL(
      { merchantID, mandatoryFields, optionalFields, returnURL, referenceNo, subMerchantID, transactionAmount, payMode },
      encryptionKey
    );

    // Log the request in the database
    const paymentRequest = new PaymentRequest({
      merchantID,
      mandatoryFields,
      optionalFields,
      returnURL,
      referenceNo,
      subMerchantID,
      transactionAmount,
      payMode,
      encryptedURL,
    });
    await paymentRequest.save();

    res.status(200).json({ encryptedURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
