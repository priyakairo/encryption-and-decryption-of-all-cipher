
    var substitutionKey = {
      'a': 'q', 'b': 'w', 'c': 'e', 'd': 'r', 'e': 't', 'f': 'y', 'g': 'u', 'h': 'i', 'i': 'o', 'j': 'p',
      'k': 'a', 'l': 's', 'm': 'd', 'n': 'f', 'o': 'g', 'p': 'h', 'q': 'j', 'r': 'k', 's': 'l', 't': 'z',
      'u': 'x', 'v': 'c', 'w': 'v', 'x': 'b', 'y': 'n', 'z': 'm'
    };

    function encrypt() {
      var message = document.getElementById("message").value.toLowerCase();
      var encryptedMessage = monoalphabeticEncrypt(message);
      document.getElementById("result").innerHTML = "Encrypted message: " + encryptedMessage;
    }

    function decrypt() {
      var message = document.getElementById("message").value.toLowerCase();
      var decryptedMessage = monoalphabeticDecrypt(message);
      document.getElementById("result").innerHTML = "Decrypted message: " + decryptedMessage;
    }

    function monoalphabeticEncrypt(message) {
      var result = "";
      for (var i = 0; i < message.length; i++) {
        var char = message.charAt(i);
        if (substitutionKey[char]) {
          result += substitutionKey[char];
        } else {
          result += char;  // Leave non-alphabetic characters unchanged
        }
      }
      return result;
    }

    function monoalphabeticDecrypt(message) {
      var reverseKey = {};
      for (var key in substitutionKey) {
        if (substitutionKey.hasOwnProperty(key)) {
          reverseKey[substitutionKey[key]] = key;
        }
      }
      var result = "";
      for (var i = 0; i < message.length; i++) {
        var char = message.charAt(i);
        if (reverseKey[char]) {
          result += reverseKey[char];
        } else {
          result += char;  // Leave non-alphabetic characters unchanged
        }
      }
      return result;
    }
  
