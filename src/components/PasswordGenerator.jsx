import { useState, useDebugValue } from 'react';

const PasswordGenerator = () => {
  const useStateLabel = (initialValue, label) => {
    const [value, setValue] = useState(initialValue);
    useDebugValue(`${label}:${value}`);
    return [value, setValue];
  };

  const [len, setLen] = useStateLabel(20, 'Longitud');
  const [uppercase, setUppercase] = useStateLabel(true, 'Uppercase');
  const [lowercase, setLowercase] = useStateLabel(true, 'Lowercase');
  const [numbers, setNumbers] = useStateLabel(true, 'Numbers');
  const [symbols, setSymbols] = useStateLabel(true, 'Symbols');
  const [result, setResult] = useStateLabel('', 'Result');

  const randomFunc = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  const handleGenerate = () => {
    console.log('generating passwoord ... ');
    let generatedPassword = '';
    const typesCount = lowercase + uppercase + numbers + symbols;
    const typesArr = [
      { lowercase },
      { uppercase },
      { numbers },
      { symbols },
    ].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
      setResult('No types selected');
      return;
    }

    for (let i = 0; i < len; i++) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
    console.log(generatedPassword);
    const finalPassword = generatedPassword.slice(0, len);
    console.log(finalPassword);

    setResult(finalPassword);
  };

  const handleClipboard = () => {
    const password = result;
    if (!password) {
      return;
    }
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <span id="result">{result}</span>
        <button className="btn" id="clipboard" onClick={handleClipboard}>
          <i className="far fa-clipboard"></i>
        </button>
      </div>
      <div className="settings">
        <div className="setting">
          <label htmlFor="len">Password Length</label>
          <input
            type="number"
            name="len"
            id="length"
            min="6"
            max="20"
            value={len}
            onChange={e => setLen(parseInt(e.target.value))}
          />
        </div>
        <div className="setting">
          <label htmlFor="uppercase">Include uppercase letters</label>
          <input
            type="checkbox"
            id="uppercase"
            name="uppercase"
            value={uppercase}
            checked={uppercase}
            onChange={e => setUppercase(e.currentTarget.checked)}
          />
        </div>
        <div className="setting">
          <label htmlFor="lowercase">Include lowercase letters</label>
          <input
            type="checkbox"
            id="lowercase"
            name="lowercase"
            value={uppercase}
            checked={lowercase}
            onChange={e => setLowercase(e.currentTarget.checked)}
          />
        </div>
        <div className="setting">
          <label htmlFor="numbers">Include numbers</label>
          <input
            type="checkbox"
            id="numbers"
            name="numbers"
            value={numbers}
            checked={numbers}
            onChange={e => setNumbers(e.currentTarget.checked)}
          />
        </div>
        <div className="setting">
          <label htmlFor="symbols">Include symbols</label>
          <input
            type="checkbox"
            id="symbols"
            name="symbols"
            value={symbols}
            checked={symbols}
            onChange={e => setSymbols(e.currentTarget.checked)}
          />
        </div>
      </div>

      <button className="btn btn-large" id="generate" onClick={handleGenerate}>
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
