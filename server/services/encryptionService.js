// services/encryptionService.js
const crypto = require('crypto');
const PaymentRequest = require('../models/PaymentRequest');

const encryptValue = (value, encryptionKey) => {
  const cipher = crypto.createCipheriv('aes-128-ecb', encryptionKey, null);
  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

const generateEncryptedURL = async (params, encryptionKey) => {
  const encryptedParams = {
    'mandatory fields': encodeURIComponent(encryptValue(params.mandatoryFields, encryptionKey)),
    'optional fields': encodeURIComponent(encryptValue(params.optionalFields || '', encryptionKey)),
    'returnurl': encodeURIComponent(encryptValue(params.returnURL, encryptionKey)),
    'Reference No': encodeURIComponent(encryptValue(params.referenceNo, encryptionKey)),
    'submerchantid': encodeURIComponent(encryptValue(params.subMerchantID, encryptionKey)),
    'transaction amount': encodeURIComponent(encryptValue(params.transactionAmount, encryptionKey)),
    'paymode': encodeURIComponent(encryptValue(params.payMode, encryptionKey)),
  };

  const encryptedURL = `https://eazypay.icicibank.com/EazyPG?merchantid=${encodeURIComponent(params.merchantID)}` +
    `&mandatory fields=${encryptedParams['mandatory fields']}` +
    `&optional fields=${encryptedParams['optional fields']}` +
    `&returnurl=${encryptedParams.returnurl}` +
    `&Reference No=${encryptedParams['Reference No']}` +
    `&submerchantid=${encryptedParams.submerchantid}` +
    `&transaction amount=${encryptedParams['transaction amount']}` +
    `&paymode=${encryptedParams['paymode']}`;

  return encryptedURL;
};


module.exports = { generateEncryptedURL };
