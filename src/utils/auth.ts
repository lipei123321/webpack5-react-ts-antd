import cryptoJS from 'crypto-js';

export function encryptByDES(message: string, key: string) {
  let keyHex = cryptoJS.enc.Utf8.parse(key);
  let encrypted = cryptoJS.DES.encrypt(message, keyHex, { mode: cryptoJS.mode.ECB, padding: cryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

export const encryptionPwd = (key: string) => encryptByDES(key, '12345679');

export function getToken() {
  return localStorage.getItem('base.token');
}

export function setToken(token: string) {
  localStorage.setItem('base.token', token);
}

export function removeToken() {
  Object.keys(localStorage).forEach((item) => (item.indexOf('base.') !== -1 ? localStorage.removeItem(item) : ''));
}
