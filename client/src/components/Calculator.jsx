import * as math from 'mathjs';
import { useState } from 'react';

export function Calculator() {
    const [expression, setExpression] = useState('');


    return (
        <div>
            <h2>Calculator</h2>
            <div className="calculator">
                <div className="expression">
                    { expression }
                </div>
                <div className="calculator-buttons">
                    <div className="always-allowed">
                        <button onClick={() => setExpression(expression + '1')}>1</button>
                        <button onClick={() => setExpression(expression + '2')}>2</button>
                        <button onClick={() => setExpression(expression + '3')}>3</button>
                        <button onClick={() => setExpression(expression + '4')}>4</button>
                        <button onClick={() => setExpression(expression + '5')}>5</button>
                        <button onClick={() => setExpression(expression + '6')}>6</button>
                        <button onClick={() => setExpression(expression + '7')}>7</button>
                        <button onClick={() => setExpression(expression + '8')}>8</button>
                        <button onClick={() => setExpression(expression + '9')}>9</button>
                        <button onClick={() => setExpression(expression + '0')}>0</button>
                    </div>
                    <button onClick={() => setExpression(expression + '+')}>+</button>
                    <button onClick={() => setExpression(expression + '-')}>-</button>
                    <button onClick={() => setExpression(expression + '*')}>*</button>
                    <button onClick={() => setExpression('')}>C</button>
                    <button onClick={() => {
                        try {
                            const result = math.evaluate(expression);
                            setExpression(result.toString());
                        } catch (error) {
                            console.error('Error evaluating expression:', error);
                        }
                    }}> = </button>
                    <button onClick={() => setExpression(expression + '/')}>/</button>
                </div>
            </div>
        </div>
    )
}