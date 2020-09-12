// ** = unused code

// *global variables

// using let over const b/c going to be reassigning & changing values of these as coding
// **let heldValue = null;
// **let heldOperation = null;
// **let nextValue = null;
// same as above & more efficient can compare different variables to the same value
let heldValue,
  heldOperation,
  nextValue = null;

// *helper functions

// updates next value to held value
// the function is taking in two inputs l & v, l is a string
function showValue(location, value) {
  // are both value and type equal?
  if (value === null) {
    //select all elements with location
    // set and return content
    $(location).text(""); //set text to empty string
  } else {
    // value property of the DOM input element gets value of text input field
    // if not null the location text will be the value
    // wrapping value in Number so forcing string of nextValue to now be a number (get rid of leading zero)
    $(location).text(Number(value));
  }
}

function updateDisplay() {
  // variable being applied to class getting specific value
  // call showValue .... held-value will take in string
  showValue(".held-value", heldValue);
  showValue(".next-value", nextValue);
}

// functionality: user clicks 9, but once user clicks x then need to be able to set heldValue ... so set value (in this case multiplication) and then transfer the 9 to heldValue so don't lose it or reset to 0 ... need to pass that value off to a value that will hold it (heldValue) then when click again on 5 that 5 should now be new nextValue and then can return: heldValue which was 9, heldOperation which is now multiplation, and nextValue which is 5
// calculator is storing an operation which is heldOperation as the current operator
// when setHeldOperation called it will act on the two values stored in heldValue and nextValue, which then updates heldValue
function setHeldOperation(operation) {
  // checking for null (same as undefined)
  // if heldOperation does not equal null then need to run heldOperation and store the result in heldValue
  if (heldOperation !== null) {
    heldValue = heldOperation(heldValue, nextValue);
    // if returns null, fall back to normal setting
  } else if (nextValue !== null) {
    // if heldValue does not equal null then store current nextValue and heldValue so now heldValue is equal to nextValue
    heldValue = nextValue;
  }
  // this will always happen every time function invoked
  nextValue = null;
  // heldOperation equal to operation passed in initially
  heldOperation = operation;
}

// Example of this functionality:
// user inputs 5 + 12 - 6
// calc stored 5 in heldValue, then calls setHeldOperation (addition), which will skip to the bottom b/c heldOperation is null
// "addition" is in the variable heldOperation
// "12" is entered and stored at nextValue
// "-" is entered and setHeldOperation (subtraction) is now invoked which matches first condition in the "if" stmt
// heldValue now equals addition (5,12)
// heldOperation updated end to swap "addition" for "subtraction"
// heldValue is 17 and does the subtraction on the 6

//clear values
function clearAll() {
  heldValue = null;
  heldOperation = null;
  nextValue = null;
}
//resets nextValue to null not all three
function clearEntry() {
  nextValue = null;
}

// *main functions

function add(x, y) {
  // using number x & y because currently x & y will be strings and you need to force it again to be a number (i.e. if you were doing 1 + 3 it would equal 13 instead of 4)
  return Number(x) + Number(y);
}
function subtract(x, y) {
  return Number(x) - Number(y);
}
function multiply(x, y) {
  return Number(x) * Number(y);
}
function divide(x, y) {
  return Number(x) / Number(y);
}

// *click handlers

// jQuery hook function for .click hooks into browser events
// puts numbers into the calculator
// fires the element's click event ... this event then bubbles up to elements higher in the document tree (or event chain) and fires their click events
// query string then takes in callback function
$(".digits button").click(function () {
  // === same as double but does not do type comparison if types differ "false" returned
  // not sure how many digits may be coming so loop...check if value exists and get next
  // if no further input done, if further input add
  if (nextValue === null) {
    // if strictly equal to null going to replace it with a string of 0...so setting next value to 0 (not number 0!) ... when button clicked it is being set to 0
    nextValue = 0;
  }
  // get the immediately following sibling of each element in the set of matched elements ... the selector retrieves the next sibling only if it matches that selector
  // will hold the element originally requested ... will attach all the jQuery prototype methods again, but will not have to search the DOM again
  nextValue = nextValue + $(this).text(); // set the text
  // **$(".next-value").text(nextValue); ... don't need b/c .next-value is now location and nextValue is the value so can pass in .next-value to showValue and pass in whatever the number is (nextValue) as the value
  // **showValue(".next-value", nextValue); ... don't need now being handled with updateDisplay

  updateDisplay();
});

$(".add").click(function () {
  // call function pass in "add" click handler
  setHeldOperation(add);
  $(".next-operation").text("+"); // set text equal to plus sign
  updateDisplay();
});

$(".subtract").click(function () {
  setHeldOperation(subtract);
  $(".next-operation").text("-");
  updateDisplay();
});

$(".multiply").click(function () {
  setHeldOperation(multiply);
  $(".next-operation").text("*");
  updateDisplay();
});

$(".divide").click(function () {
  setHeldOperation(divide);
  $(".next-operation").text("/");
  updateDisplay();
});

$(".equals").click(function () {
  // calling setHeldOperation with null
  setHeldOperation(null);
  // clearing the text on .next-operation pass in empty string to clear
  $(".next-operation").text("");
  updateDisplay();
});

$(".clear-all").click(function () {
  nextValue = null;
  heldValue = null;
  heldOperation = null;
  $(".next-operation").text("");
  updateDisplay();
});

$(".clear-entry").click(function () {
  nextValue = null;
  updateDisplay();
});

// fixed NaN error when starting
clearAll(), updateDisplay();
