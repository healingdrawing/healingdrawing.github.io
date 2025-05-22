// manipulate/validate input
const input = document.getElementById("numbername");
const output = document.getElementById("output");

function clean_user_input(value) {
  value = value.replace(/[^0-9]/g, ''); //keep only digits
  value = value.replace(/^0+/, ''); //remove leading zeros
  if (value === '') value = '0'; //keep at least zero as default value
  return value;
}

// Listen for all input changes (typing, pasting, etc.)
input.addEventListener("input", function(event) {
  this.value = clean_user_input(this.value);
  const result = toSwedishNumberText(this.value);
  output.innerHTML = `
    <p><strong>Input:</strong> ${result.digital}</p>
    <p><strong>Cardinal:</strong> ${result.cardinal}</p>
    <p><strong>Ordinal:</strong> ${result.ordinal}</p>
  `;
});

// initial execution, to manage default value
const inputEvent = new Event("input", { bubbles: true });
input.dispatchEvent(inputEvent);