function gui(key){
  if (['1','2','3','4','5','6','7','8','9','0'].includes(key)) gui_digit(key);
  else gui_command(key);
}

/** add digit/key into place of corret in input or at the end(if input had no focus when div with button functionality pressed) */
function gui_digit(key){
  console.log('gui_digit');
  // get the input caret index
  // get the input value
  // modify value, if the length of the value is less than 18, add the key to the coret place, or at the end if there was no focus for input
  // set the new input value
  // set the focus to input
  // coret must be after next after new added digit, or at the last place if no digit added
  // execute input validation, fire "synthetic 'input' event"
  const input = document.getElementById('number'); // Adjust ID as needed
  let value = input.value; // Get input value
  let start = input.selectionStart; // Get caret index
  console.log("sel start = "+start);

  // patch to force remove leading zero
  if (start === 0 && value === '0'){ start = 1; input.selectionStart = 1; }

  // Set focus to input
  input.focus();
  
  // Insert key at caret position, if value length < 18 (999 999 999 999 999 999)
  if (value.length < 18) 
    value = value.slice(0, start) + key + value.slice(input.selectionEnd);
    
  // Set new input value
  input.value = value;

  // Set caret after new digit, or at end if no digit added
  input.selectionStart = input.selectionEnd = document.activeElement === input ? start + (value.length < 18 ? 1 : 0) : value.length;

  // Fire synthetic input event
  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);
}

/** execute command to manipulate corret or input value */
function gui_command(key){
  console.log('gui_command');
  switch (key) {
    case '<':
      break;
    case '<<>>':
      break;
    case '>':
      break;
    case '-':
      break;
    case 'x':
      break;
    default:
      break;
  }
}