// manipulate/validate input
const input = document.getElementById("number");
const colored_number = document.getElementById("colored_number");
const colored_number_2 = document.getElementById("colored_number_2");
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

  colored_number.innerHTML = `
    <p>${result.digital}</p>
  `;
  colored_number_2.innerHTML = `
    <p>${result.digital}</p>
  `;
  output.innerHTML = `
    <p onclick='sv_speak_number(this)'><strong>Cardinal:</strong> ${result.cardinal}</p>
    <p onclick='sv_speak_number(this)'><strong>Ordinal:</strong> ${result.ordinal}</p>
  `;
});

// initial execution, to manage default value
const inputEvent = new Event("input", { bubbles: true });
input.dispatchEvent(inputEvent);