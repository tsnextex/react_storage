import crypto from 'crypto';
import base64url from 'base64url';

export function encryptObjectToBase64url(data, key) {
  const dataAsString = JSON.stringify(data);
  // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
  // password= 'jL8zdxJ0Vpqv?m?' -> random, salt = 16 bytes -> 128 bit, iterations = 100000, keylen = 16 bytes -> 128 bit, digest = 'md5' -> 128 bit
  // config.encryptionKey = base64url(crypto.pbkdf2Sync('jL8zdxJ0Vpqv?m?', crypto.randomBytes(16), 100000, 16, 'md5'));
  const iv = crypto.randomBytes(16); // IV is always 16 bytes
  const cipher = crypto.createCipheriv('aes-128-cbc', base64url.toBuffer(key), iv);
  const encrypted = cipher.update(dataAsString);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  // Need to retain IV for decryption, so this can be appended to the output with a separator
  return `${base64url(iv)}:${base64url(finalBuffer)}`;
}

export function decryptBase64urlToObject(encryptedBase64url, key) {
  const encryptedArray = encryptedBase64url.split(':');
  const iv = base64url.toBuffer(encryptedArray[0]);
  const encrypted = base64url.toBuffer(encryptedArray[1]);
  const decipher = crypto.createDecipheriv('aes-128-cbc', base64url.toBuffer(key), iv);
  const decrypted = decipher.update(encrypted);
  const dataAsString = Buffer.concat([decrypted, decipher.final()]).toString();
  return JSON.parse(dataAsString);
}

export function randomStringAsBase64Url(size) {
  return base64url(crypto.randomBytes(size));
}
