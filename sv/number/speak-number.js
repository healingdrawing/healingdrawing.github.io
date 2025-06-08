let is_speaking = false;

function sv_speak_number(pointer) {
  if (is_speaking){
    console.info("Not so fast");
    return;
  } /* important for free tier */
  is_speaking = true;

  const sv_word_forms = Array.from(pointer.querySelectorAll('div'))
    .map(div => div.textContent.trim());
  const what_speak = sv_word_forms.join(" . ");

  responsiveVoice.speak(what_speak, "Swedish Female", {
    onend: () => {
      is_speaking = false;
      console.info("Ready to speak again");
    }
  });
}
