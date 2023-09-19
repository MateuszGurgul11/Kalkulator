"use strict";

var runningTotal = 0;
var buffer = "0";
var previousOperator;
var ekran = document.querySelector('.ekran');

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  ekran.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;

    case '=':
      if (previousOperator === null) {
        return;
      }

      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal = 0;
      runningTotal = 0;
      break;

    case '←':
      if (buffer.lenght === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.lenght - 1);
      }

      break;

    case '+':
    case '-':
    case 'x':
    case '÷':
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return;
  }

  var intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === 'x') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}
/*function init()
{
    document.querySelector('.kalk-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();*/


function init() {
  var kalkButtons = document.querySelector('.kalk-buttons');
  if (!kalkButtons) return;
  kalkButtons.addEventListener('click', function (event) {
    buttonClick(event.target.innerText);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});