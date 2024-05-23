

function scale_font_size() {

  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  let s1, s2, s3;

  if (vh > vw) {
    s1 = '3vh';
    s2 = '4vh';
    s3 = '6vh';
  } else {
    s1 = '1.5vw';
    s2 = '2vw';
    s3 = '3vw';
  }

  document.querySelectorAll('.s1').forEach(x => {x.style.fontSize = s1;});
  document.querySelectorAll('.s2').forEach(x => {x.style.fontSize = s2;});
  document.querySelectorAll('.s3').forEach(x => {x.style.fontSize = s3;});
}

// Adjust font size on page load and window resize
scale_font_size();
window.addEventListener('resize', scale_font_size);

// Function to remove resize event listener and stop resizing
function stop_resizing() {
  
  document.querySelectorAll('.s1').forEach(x => {x.style.fontSize = '12px';});
  document.querySelectorAll('.s2').forEach(x => {x.style.fontSize = '16px';});
  document.querySelectorAll('.s3').forEach(x => {x.style.fontSize = '24px';});
  
  window.removeEventListener('resize', scale_font_size);
  document.getElementById('stop_resizing_button').remove();
}

// Add event listener to the button to stop resizing
document.getElementById('stop_resizing_button').addEventListener('click', stop_resizing);

document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with class "c"
  var elements = document.querySelectorAll('.c,.x,.o');
  
  // Function to calculate indentation
  function calculateIndentation(element) {
    var lines = element.textContent.split('\n').slice(1, -1);
    var indents = lines.map(line => line.match(/^\s*/)[0].length);
    return Math.min(...indents);
  }
  
  // Iterate over each element
  elements.forEach(function(element) {
    // Calculate the minimum indentation
    var minIndent = calculateIndentation(element);
    
    // Modify the text content by removing the minimum indentation
    // var modifiedText = element.textContent.split('\n').slice(1, -1).join('<br>\n').replace(new RegExp(`^\\s{${minIndent}}`, 'gm'), '');
    var modifiedText = element.textContent
    .replaceAll(" > ","&#65125;")
    .replaceAll(" < ","&#65124;")
    // now we can display jsx, but can not copypaste code without fix replacements.
    .split('\n').slice(1, -1).map(text => `<div class="cx">${text}</div>`).join('').replace(new RegExp(`<div class="cx">\\s{${minIndent}}`, 'gm'), '<div class="cx">');
    
    // Update the element's text content with the modified text
    element.innerHTML = modifiedText;
  });
});