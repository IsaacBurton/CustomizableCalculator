import * as math from 'mathjs';
import { useState, useRef, useEffect } from 'react';
import { FunctionButton } from './FunctionButton';

const FUNCTION_MAP = {
  addition: '+',
  subtraction: '-',
  multiplication: '*',
  division: '/',
  exponentiation: '^',
  sqrt: 'sqrt(',
  cbrt: 'cbrt(',
  log10: 'log10(',
  ln: 'ln(',
  sin: 'sin(',
  cos: 'cos(',
  tan: 'tan(',
  arcsin: 'asin(',
  arccos: 'acos(',
  arctan: 'atan(',
  factorial: '!',
};

const ALLOWED_KEYS = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.', '(', ')'];

export function Calculator({ functions }) {
  const [expression, setExpression] = useState('');
  const expressionRef = useRef();

  let allowedFunctions = Object.keys(functions)
    .filter((name) => functions[name])
    .map((name) => FUNCTION_MAP[name] || name);
  
    
  function insertAtCursor(text) {
      const input = expressionRef.current;
      if (!input) return setExpression((prev) => prev + text);
    
      const { selectionStart: start, selectionEnd: end } = input;
      const updated = expression.slice(0, start) + text + expression.slice(end);
      setExpression(updated);
    
      setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + text.length, start + text.length);
      }, 0);
  };

  function computeExpression() {
      try {
          const result = math.evaluate(expression);
          setExpression(result.toString());
      } catch (error) {
          console.error('Error evaluating expression:', error);
      }
  };

  function handleControlKeys(key) {
      const input = expressionRef.current;
      if (!input) return;
      const { selectionStart: start, selectionEnd: end } = input;

      if (key === 'Backspace') {
          if (expression === 'Infinity' || expression === 'NaN') {
              setExpression('');
              return;
          }
          const updated = expression.slice(0, start - 1) + expression.slice(end);
          setExpression(updated);
          setTimeout(() => {
              input.focus();
              input.setSelectionRange(start - 1, start - 1);
          }, 0);
      } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
          const offset = key === 'ArrowLeft' ? -1 : 1;
          setTimeout(() => {
              input.focus();
              input.setSelectionRange(start + offset, start + offset);
          }, 0);
      }
  };

  function handleKeyDown(e) {
      const tag = e.target.tagName.toLowerCase();
      if (tag === "textarea") {
        return;
      }
      
      e.preventDefault();
    
      if (ALLOWED_KEYS.includes(e.key) || allowedFunctions.includes(e.key)) {
          insertAtCursor(e.key);
      } else if (e.key === 'Enter') {
          computeExpression();
      } else {
          handleControlKeys(e.key);
      }
  };
    
  useEffect(() => {
    allowedFunctions = Object.keys(functions)
      .filter((name) => functions[name])
      .map((name) => FUNCTION_MAP[name] || name);
  }, [functions]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);


  return (
    <div>
      <h2>Calculator</h2>
      <div className="calculator">
        <div className="expression">
          <input
            ref={expressionRef}
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter expression"
            className="expression-input"
          />
          <span className="expression-buttons">
            <button onClick={computeExpression}>compute</button>
            <button onClick={() => handleControlKeys('Backspace')}>delete</button>
            <button onClick={() => setExpression('')}>clear</button>
          </span>
        </div>

        <div className="calculator-buttons">
          <div className="always-allowed">
            <div className="row-1">
                {ALLOWED_KEYS.slice(0, 3).map((key) => (
                <FunctionButton key={key} functionName={key} onClick={() => insertAtCursor(key)} />
                ))}
            </div>
            <div className="row-2">
                {ALLOWED_KEYS.slice(3, 6).map((key) => (
                <FunctionButton key={key} functionName={key} onClick={() => insertAtCursor(key)} />
                ))}
            </div>
            <div className="row-3">
                {ALLOWED_KEYS.slice(6, 9).map((key) => (
                <FunctionButton key={key} functionName={key} onClick={() => insertAtCursor(key)} />
                ))}
            </div>
            <div className="row-4">
                {ALLOWED_KEYS.slice(9, 13).map((key) => (
                <FunctionButton key={key} functionName={key} onClick={() => insertAtCursor(key)} />
                ))}
            </div>
          </div>

          <div className="allowed-functions">
            {allowedFunctions.map((functionName) => (
              <FunctionButton key={functionName} functionName={functionName} onClick={() => insertAtCursor(functionName)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
