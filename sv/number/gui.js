function gui(key){
  if (['1','2','3','4','5','6','7','8','9','0'].includes(key)) gui_digit(key);
  else gui_command(key);
}

/** add digit/key into place of corret in input or at the end(if input had no focus when div with button functionality pressed) */
function gui_digit(key){
  const input = document.getElementById('number');
  let value = input.value;
  let start = input.selectionStart; // Get caret index

  // patch to force replace zero, when gui div with button functionality pressed
  if (start === 0 && value === '0'){ start = 1; input.selectionStart = 1; }

  input.focus();
  
  // Insert key at caret position, if value length < 18 (999 999 999 999 999 999), so there is still at least one free slot for input
  if (value.length < 18) 
    value = value.slice(0, start) + key + value.slice(input.selectionEnd);
    
  input.value = value;

  // Set caret after new added digit
  input.selectionStart = input.selectionEnd = document.activeElement === input ? start + (value.length < 18 ? 1 : 0) : value.length;

  // Fire synthetic input event, to manage input value common way
  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);
}

/** execute command to manipulate caret or input value */
function gui_command(key){
  switch (key) {
    case '<':
      gui_move_caret_left();
      break;
    case '<<>>':
      gui_jump_caret_start_end();
      break;
    case '>':
      gui_move_caret_right();
      break;
    case 'x|':
      gui_delete_left_from_caret();
      break;
    case 'x':
      gui_delete_all();
      break;
    case '|x':
      gui_delete_right_from_caret();
      break;
    default:
      break;
  }
}

function gui_delete_left_from_caret(){ gui_delete('left'); }
function gui_delete_right_from_caret(){ gui_delete('right'); }
function gui_delete_all(){ gui_delete('all'); }
/** delete from input value
 * - one symbol left 
 * - one symbol right
 * - all
 * - selected
 * 
 * with keep caret place */
function gui_delete(key){
  const input = document.getElementById('number');
  let value = input.value;
  let start = input.selectionStart; // Get caret index
  let end = input.selectionEnd;
  if (start === end){
    if (key === 'left' && start > 0) value = value.slice(0, start - 1) + value.slice(end);
    else if (key === 'right') value = value.slice(0, start) + value.slice(end + 1);
    else if (key === 'all') value = '';    
  } else { // remove only selected
    value = value.slice(0, start) + value.slice(end);
  }
  input.value = value;
  input.focus();
  input.selectionStart = input.selectionEnd = document.activeElement === input ? key === 'left' && start === end && start > 0 ? start -1 : start : value.length;
  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);
}

function gui_move_caret_left(){
  const input = document.getElementById('number');
  input.focus();
  input.selectionStart = input.selectionEnd = document.activeElement === input ? input.selectionStart > 0 ? input.selectionStart - 1 : 0 : input.value.length;
}
function gui_move_caret_right(){
  const input = document.getElementById('number');
  input.focus();
  input.selectionStart = input.selectionEnd = document.activeElement === input ? input.selectionStart + 1 : input.value.length;
}
function gui_jump_caret_start_end(){
  const input = document.getElementById('number');
  input.focus();
  input.selectionStart = input.selectionEnd = document.activeElement === input ? input.selectionStart === input.value.length ? 0 : input.value.length : input.value.length;
}

function show_main(){
  // jump up to sv
  window.location.href = "../index.html";
}

function show_contacts(){
  // global contacts page
  window.location.href = "../../contacts.html";
}

function show_wiki(){
  // open not a nicest article
  window.location.href = "https://en.wikipedia.org/wiki/Long_and_short_scales";
}

function show_help(){
  const text =
  "Convert long scale big numbers to Swedish text form.\n" +
  "Sweden(2025) uses long scale big numbers notation.\n\n" +
  
  "GUI:\n" +
  "☒| - delete left, ☒ - delete all, |☒ - delete right\n" +
  "⇦| - caret left, home/end caret, |⇨ - caret right\n\n" +
  
  "🌐 - https://en.wikipedia.org/wiki/Long_and_short_scales\n" +
  "🇸🇪 - show main page of Svenska - English notes\n" +
  "📧 - show contacts\n" +
  "\u2754 - help section\n\n" +
  
  "Tools used: linux, vscode, grok, duck.ai.\n" +
  "License: https://healingdrawing.github.io/info/license/fpl.html";
  alert(text);
}

//extra x4 top buttons
function gui_info(text){
  switch (text) {
    case 'main':
      show_main();
      break;
    case 'contacts':
      show_contacts();
      break;
    case 'wiki':
      show_wiki();
      break;
    case 'help':
      show_help();
      break;
    default:
      break;
  }
}
