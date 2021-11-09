import CryptoJS from 'crypto-js'

const envKey = process.env.NEXT_PUBLIC_CRYPTO_KEY

export const encrypt = (text) => {
  const eText = CryptoJS.AES.encrypt(text, envKey).toString()
  // .toString()
  return eText;
}

export const decrypt = (eText) => {
  const decrypted  = CryptoJS.AES.decrypt(eText, envKey)
  const deText = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  return deText
}