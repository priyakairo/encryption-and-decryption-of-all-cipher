function encrypt() {
  const message = document.getElementById("message").value;
  const key = document.getElementById("key").value;
  const encryptedMessage = vigenereEncrypt(message, key);
  document.getElementById("result").textContent = `Encrypted Message: ${encryptedMessage}`;
}

function decrypt() {
  const message = document.getElementById("message").value;
  const key = document.getElementById("key").value;
  const decryptedMessage = vigenereDecrypt(message, key);
  document.getElementById("result").textContent = `Decrypted Message: ${decryptedMessage}`;
}

function vigenereEncrypt(plainText, key) {
  let result = '';
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText[i];
    const charCode = char.charCodeAt(0);
    const shift = key.charCodeAt(i % key.length) - 65; // Assuming the key is uppercase letters
    const encryptedChar = String.fromCharCode(((charCode + shift - 65) % 26) + 65);
    result += encryptedChar;
  }
  return result;
}

function vigenereDecrypt(cipherText, key) {
  let result = '';
  for (let i = 0; i < cipherText.length; i++) {
    const char = cipherText[i];
    const charCode = char.charCodeAt(0);
    const shift = key.charCodeAt(i % key.length) - 65; // Assuming the key is uppercase letters
    const decryptedChar = String.fromCharCode(((charCode - shift - 65 + 26) % 26) + 65);
    result += decryptedChar;
  }
  return result;
}
