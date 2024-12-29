const crypto = require('crypto');

const encryptValue = (value, encryptionKey) => {
  const cipher = crypto.createCipheriv('aes-128-ecb', encryptionKey, null);
  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

const generateEncryptedURL = async (params, encryptionKey) => {
  if (!encryptionKey || encryptionKey.length !== 16) {
    throw new Error("Invalid encryption key. Ensure it's 16 bytes long.");
  }

  const keyBuffer = Buffer.from(encryptionKey, 'utf8');
  const encryptedParams = {
    'mandatory fields': encodeURIComponent(encryptValue(params.mandatoryFields, keyBuffer)),
    'optional fields': encodeURIComponent(encryptValue(params.optionalFields || '', keyBuffer)),
    'returnurl': encodeURIComponent(encryptValue(params.returnURL, keyBuffer)),
    'Reference No': encodeURIComponent(encryptValue(params.referenceNo, keyBuffer)),
    'submerchantid': encodeURIComponent(encryptValue(params.subMerchantID, keyBuffer)),
    'transaction amount': encodeURIComponent(encryptValue(params.transactionAmount, keyBuffer)),
    'paymode': encodeURIComponent(encryptValue(params.payMode, keyBuffer)),
  };

  const plainParams = {
    'mandatory fields': params.mandatoryFields,
    'optional fields': params.optionalFields || '',
    'returnurl': params.returnURL,
    'Reference No': params.referenceNo,
    'submerchantid': params.subMerchantID,
    'transaction amount': params.transactionAmount,
    'paymode': params.payMode,
  };

  const encryptedURL = `https://eazypay.icicibank.com/EazyPG?merchantid=${encodeURIComponent(params.merchantID)}` +
    `&mandatory fields=${encryptedParams['mandatory fields']}` +
    `&optional fields=${encryptedParams['optional fields']}` +
    `&returnurl=${encryptedParams.returnurl}` +
    `&Reference No=${encryptedParams['Reference No']}` +
    `&submerchantid=${encryptedParams.submerchantid}` +
    `&transaction amount=${encryptedParams['transaction amount']}` +
    `&paymode=${encryptedParams.paymode}`;

  const plainURL = `https://eazypay.icicibank.com/EazyPG?merchantid=${encodeURIComponent(params.merchantID)}` +
    `&mandatory fields=${encodeURIComponent(plainParams['mandatory fields'])}` +
    `&optional fields=${encodeURIComponent(plainParams['optional fields'])}` +
    `&returnurl=${encodeURIComponent(plainParams['returnurl'])}` +
    `&Reference No=${encodeURIComponent(plainParams['Reference No'])}` +
    `&submerchantid=${encodeURIComponent(plainParams['submerchantid'])}` +
    `&transaction amount=${encodeURIComponent(plainParams['transaction amount'])}` +
    `&paymode=${encodeURIComponent(plainParams['paymode'])}`;

  return { encryptedURL, plainURL };
};

module.exports = { generateEncryptedURL };
