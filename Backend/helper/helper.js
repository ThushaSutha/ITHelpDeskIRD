const crypto = require('crypto');
const secretKey = "mySuperSecretKey1234567890123456";

// AES-256-CBC Encryption function
function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a random Initialization Vector (IV)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'), // Return the IV as a hex string
    encryptedData: encrypted // Return the encrypted data
  };
}

// AES-256-CBC Decryption function
// AES-256-CBC Decryption function
function decrypt(encryptedData, ivHex) {
  if (!encryptedData || !ivHex) {
    throw new Error('Both encrypted data and ivHex must be provided for decryption');
  }

  const iv = Buffer.from(ivHex, 'hex'); // Convert hex IV back to Buffer
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}


// Export functions for use in other files
module.exports = {
  encrypt,
  decrypt
};
