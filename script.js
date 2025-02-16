document.getElementById('length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value;
  });
  
  document.getElementById('generate').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;
    const excludeSimilar = document.getElementById('exclude-similar').checked;
  
    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial, excludeSimilar);
    document.getElementById('password-output').value = password;
  
    const strength = calculateStrength(password);
    document.getElementById('strength').textContent = `Strength: ${strength} bits`;
  
    addToHistory(password);
  });
  
  document.getElementById('copy').addEventListener('click', function() {
    const passwordOutput = document.getElementById('password-output');
    passwordOutput.select();
    document.execCommand('copy');
    alert("Password copied to clipboard!");
  });
  
  document.getElementById('generate-passphrase').addEventListener('click', function() {
    const passphrase = generatePassphrase();
    document.getElementById('passphrase-output').textContent = passphrase;
  });
  
  function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial, excludeSimilar) {
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecial) characters += '!@#$%^&*()_+[]{}|;:,.<>?/';
    if (excludeSimilar) characters = characters.replace(/[O0Il]/g, '');
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return password;
  }
  
  function calculateStrength(password) {
    const charsetLength = password.match(/[a-z]/i) ? 26 : 0
      + password.match(/[A-Z]/) ? 26 : 0
      + password.match(/[0-9]/) ? 10 : 0
      + password.match(/[^a-zA-Z0-9]/) ? 32 : 0;
    
    return Math.log2(Math.pow(charsetLength, password.length));
  }
  
  function generatePassphrase() {
    const words = ['Correct', 'Horse', 'Battery', 'Staple', 'Sky', 'Blue', 'Computer', 'Bicycle', 'Mountain', 'Sun'];
    let passphrase = '';
    for (let i = 0; i < 4; i++) {
      passphrase += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return passphrase.trim();
  }
  
  function addToHistory(password) {
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('li');
    historyItem.textContent = password;
    historyItem.addEventListener('click', function() {
      document.getElementById('password-output').value = password;
    });
    historyList.appendChild(historyItem);
  }
  