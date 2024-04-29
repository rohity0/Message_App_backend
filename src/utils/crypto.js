const crypto = require("crypto");

// Define passphrase and salt
const passphrase = "yourSecretPassphrase";
const salt = "yourSalt"; // Salt should be unique per encryption, store it securely

// Derive encryption key and IV using PBKDF2
const encryptionKey = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, "sha512"); // 256 bits
const iv = crypto.pbkdf2Sync(passphrase, salt, 100000, 16, "sha512"); // 128 bits

// Encryption function
function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt,
};
