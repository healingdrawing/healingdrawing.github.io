let is_number_speaking = false;

function sv_speak_number(pointer) {
  if (is_number_speaking){
    console.info("Not so fast");
    return;
  } /* important for free tier */
  is_number_speaking = true;
  
  const container = pointer.nextElementSibling;
  const sv_word_forms = Array.from(container.querySelectorAll('div'))
    .map(div => div.textContent.trim());
  const what_speak = sv_word_forms.join(" . ");
  responsiveVoice.speak(what_speak, "Swedish Female", {
    onend: () => {
      is_number_speaking = false;
      console.info("Ready to speak again");
    }
  });
}
