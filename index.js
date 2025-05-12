const readline = require('readline');
const add = require('./tools/add');
const subtract = require('./tools/subtract');
const mult = require('./tools/mult');
const div = require('./tools/div');
const pow = require('./tools/pow');
const sqrt = require('./tools/sqrt');

// Mode 1: CLI Input (e.g., node index.js 10 ^ 2 or node index.js √ 16)
if (process.argv.length === 5 || process.argv.length === 4) {
    if (process.argv[3] === '√') {
        const number = parseFloat(process.argv[2]);
        console.log(`Result: ${sqrt(number)}`);
    } else {
        const num1 = parseFloat(process.argv[2]);
        const operator = process.argv[3];
        const num2 = parseFloat(process.argv[4]);
        calculate(num1, operator, num2);
    }
} 
// Mode 2: Interactive Mode
else {
    startInteractiveMode();
}

function calculate(num1, operator, num2) {
    let result;
    try {
        switch (operator) {
            case '+': result = add(num1, num2); break;
            case '-': result = subtract(num1, num2); break;
            case '*': result = mult(num1, num2); break;
            case '/': result = div(num1, num2); break;
            case '^': result = pow(num1, num2); break;
            default: throw new Error('Invalid operator! Use +, -, *, /, ^, or √.');
        }
        console.log(`Result: ${result}`);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function startInteractiveMode() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('🚀 OptyCalc | Operators: +, -, *, /, ^ (power), √ (sqrt) | Type "exit" to quit.');

    const askQuestion = () => {
        rl.question('Enter first number (or √ for sqrt): ', (input1) => {
            if (input1.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            // Handle square root
            if (input1 === '√') {
                rl.question('Enter number: ', (number) => {
                    try {
                        console.log(`Result: ${sqrt(parseFloat(number))}`);
                    } catch (error) {
                        console.error('❌ Error:', error.message);
                    }
                    askQuestion();
                });
                return;
            }

            rl.question('Enter operator (+, -, *, /, ^, √): ', (operator) => {
                if (operator.toLowerCase() === 'exit') {
                    rl.close();
                    return;
                }

                // Handle power/√
                if (operator === '√') {
                    try {
                        console.log(`Result: ${sqrt(parseFloat(input1))}`);
                    } catch (error) {
                        console.error('❌ Error:', error.message);
                    }
                    askQuestion();
                    return;
                }

                rl.question('Enter second number: ', (input2) => {
                    if (input2.toLowerCase() === 'exit') {
                        rl.close();
                        return;
                    }
                    calculate(parseFloat(input1), operator, parseFloat(input2));
                    askQuestion();
                });
            });
        });
    };

    askQuestion();
}