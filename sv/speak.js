let is_speaking = false;

function sv_speak(pointer) {
  if (is_speaking){
    console.info("Not so fast");
    return;
  } /* important for free tier */
  is_speaking = true;

  const container = pointer.previousElementSibling;
  const sv_word_forms = Array.from(container.querySelectorAll('.sv'))
    .map(div => div.childNodes[0].textContent.trim());
  const what_speak = sv_word_forms.join(" . ");

  responsiveVoice.speak(what_speak, "Swedish Female", {
    onend: () => {
      is_speaking = false;
      console.info("Ready to speak again");
    }
  });
}
