// DOM elements
const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numberEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Generate event listen
generateEl.addEventListener('click', ()=> {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower,hasNumber, hasSymbol,length);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', ()=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
        
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password copied to clipboard!');
})

// Generate password function
function generatePassword(upper, lower,  number,  symbol, length) {
    // 1.Init  pw var
    // Filter out unchecked types
    // Loop over length and call generator f for each type
    // Add final pw to the pw var and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    //console.log('typesCount', typesCount);

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item=>Object.values(item)[0]);
    //console.log('typesArr', typesArr);

    if(typesCount === 0) {
        return '';
    }

    for(let i =0; i<length; i+=typesCount) {
        typesArr.forEach(type=> {
            const funcName = Object.keys(type)[0];
            //console.log('funcName', funcName);
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97)
} 

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65)
} 

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
} 

function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}'
    return symbols[Math.floor(Math.random() * symbols.length)]
}