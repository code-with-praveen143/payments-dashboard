const { generateEncryptedURL } = require("../services/encryptionService");
const PaymentRequest = require("../models/PaymentRequest");

exports.createEncryptedURL = async (req, res) => {
  const encryptionKey = process.env.ICICI_ENCRYPTION_KEY;
  if (!encryptionKey) {
    return res.status(500).json({ error: "Encryption key is undefined." });
  }
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
    const encodeParameter = (value) => encodeURIComponent(value);

    const { encryptedURL, plainURL } = await generateEncryptedURL(
      {
        merchantID: encodeParameter(merchantID),
        mandatoryFields: encodeParameter(mandatoryFields),
        optionalFields: encodeParameter(optionalFields),
        returnURL: encodeParameter(
          "https://khit.campusify.io/dashboard/return-url"
        ),
        referenceNo: encodeParameter(referenceNo),
        subMerchantID: encodeParameter(subMerchantID),
        transactionAmount: encodeParameter(transactionAmount),
        payMode: encodeParameter(payMode),
      },
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

    res.status(200).json({ encryptedURL, plainURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};