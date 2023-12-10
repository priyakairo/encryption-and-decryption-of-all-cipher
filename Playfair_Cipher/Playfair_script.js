function encrypt() {
  var message = document.getElementById("message").value.toLowerCase();
  var key = document.getElementById("key").value.toLowerCase();
  var encryptedMessage = playfairEncrypt(message, key);
  document.getElementById("result").innerHTML = "Encrypted message: " + encryptedMessage;
}

function decrypt() {
  var message = document.getElementById("message").value.toLowerCase();
  var key = document.getElementById("key").value.toLowerCase();
  var decryptedMessage = playfairDecrypt(message, key);
  document.getElementById("result").innerHTML = "Decrypted message: " + decryptedMessage;
}

function playfairEncrypt(message, key) {
  var keyTable = generateKeyTable(key);
  var preparedMessage = preparePlayfairMessage(message);
  var encryptedMessage = "";

  for (var i = 0; i < preparedMessage.length; i += 2) {
    var pair = preparedMessage.substr(i, 2);
    var encryptedPair = encryptPlayfairPair(pair, keyTable);
    encryptedMessage += encryptedPair;
  }

  return encryptedMessage;
}

function playfairDecrypt(message, key) {
  var keyTable = generateKeyTable(key);
  var preparedMessage = preparePlayfairMessage(message);
  var decryptedMessage = "";

  for (var i = 0; i < preparedMessage.length; i += 2) {
    var pair = preparedMessage.substr(i, 2);
    var decryptedPair = decryptPlayfairPair(pair, keyTable);
    decryptedMessage += decryptedPair;
  }

  return decryptedMessage;
}

function generateKeyTable(key) {
  // Remove duplicate characters from the key
  key = key.replace(/[^a-z]/g, ""); // Keep only alphabetical characters
  key = key.toLowerCase();
  key = key.replace(/j/g, "i"); // Replace 'j' with 'i'

  // Create a matrix to store the key table
  var keyTable = new Array(5);
  for (var i = 0; i < 5; i++) {
    keyTable[i] = new Array(5);
  }

  var keySet = new Set(); // To keep track of unique characters in the key
  var alphabet = "abcdefghiklmnopqrstuvwxyz"; // Exclude 'j' as per Playfair rules

  // Fill the key table with the characters from the key
  var row = 0;
  var col = 0;

  for (var i = 0; i < key.length; i++) {
    var char = key.charAt(i);

    if (!keySet.has(char)) {
      keyTable[row][col] = char;
      keySet.add(char);

      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }

  // Fill the remaining key table cells with the remaining alphabet characters
  for (var i = 0; i < 25; i++) {
    var char = alphabet.charAt(i);

    if (!keySet.has(char)) {
      keyTable[row][col] = char;
      keySet.add(char);

      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  }

  return keyTable;
}


function preparePlayfairMessage(message) {
  // Remove non-alphabetic characters and replace 'j' with 'i'
  message = message.replace(/[^a-z]/g, ""); // Keep only alphabetical characters
  message = message.toLowerCase();
  message = message.replace(/j/g, "i"); // Replace 'j' with 'i'

  // Split the message into pairs of two characters
  var pairs = [];
  for (var i = 0; i < message.length; i += 2) {
    var pair = message.substr(i, 2);
    if (pair.length === 1 || (pair.length === 2 && pair.charAt(0) === pair.charAt(1))) {
      pair += 'x'; // Add 'x' to the last single character or consecutive identical characters
      i--; // Move back one position to process the next pair
    }
    pairs.push(pair);
  }

  return pairs.join('');
}



function encryptPlayfairPair(pair, keyTable) {
  var char1 = pair.charAt(0);
  var char2 = pair.charAt(1);

  var coords1 = findCoordinates(char1, keyTable);
  var coords2 = findCoordinates(char2, keyTable);

  var encryptedPair = "";

  if (coords1.row === coords2.row) {
    // Same row: shift to the right, circularly
    encryptedPair += keyTable[coords1.row][(coords1.col + 1) % 5];
    encryptedPair += keyTable[coords2.row][(coords2.col + 1) % 5];
  } else if (coords1.col === coords2.col) {
    // Same column: shift down, circularly
    encryptedPair += keyTable[(coords1.row + 1) % 5][coords1.col];
    encryptedPair += keyTable[(coords2.row + 1) % 5][coords2.col];
  } else {
    // Different row and column: form a rectangle and take opposite corners
    encryptedPair += keyTable[coords1.row][coords2.col];
    encryptedPair += keyTable[coords2.row][coords1.col];
  }

  return encryptedPair;
}

function findCoordinates(char, keyTable) {
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (keyTable[row][col] === char) {
        return { row: row, col: col };
      }
    }
  }
  return null; // Character not found in the key table
}


function decryptPlayfairPair(pair, keyTable) {
  var char1 = pair.charAt(0);
  var char2 = pair.charAt(1);

  var coords1 = findCoordinates(char1, keyTable);
  var coords2 = findCoordinates(char2, keyTable);

  var decryptedPair = "";

  if (coords1.row === coords2.row) {
    // Same row: shift to the left, circularly
    decryptedPair += keyTable[coords1.row][(coords1.col + 4) % 5];
    decryptedPair += keyTable[coords2.row][(coords2.col + 4) % 5];
  } else if (coords1.col === coords2.col) {
    // Same column: shift up, circularly
    decryptedPair += keyTable[(coords1.row + 4) % 5][coords1.col];
    decryptedPair += keyTable[(coords2.row + 4) % 5][coords2.col];
  } else {
    // Different row and column: form a rectangle and take opposite corners
    decryptedPair += keyTable[coords1.row][coords2.col];
    decryptedPair += keyTable[coords2.row][coords1.col];
  }

  return decryptedPair;
}




    