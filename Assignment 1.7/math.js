//basic math
function add(a,b) {
    return a + b;
};

function subtract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function divide(a,b) {
    return a / b;
};

//advanced math
function sqrt(a) {
    return Math.sqrt(a);
};

function max(a,b) {
    return Math.max(a,b);
};

module.exports = {add, subtract, multiply, divide, sqrt, max};