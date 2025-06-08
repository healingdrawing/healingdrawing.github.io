let is_number_speaking = false;

function sv_speak_number(pointer) {
  if (is_number_speaking){
    console.info("Not so fast");
    return;
  } /* important for free tier */
  is_number_speaking = true;

  const sv_word_forms = Array.from(pointer.querySelectorAll('div'))
    .map(div => div.textContent.trim());
  const what_speak = sv_word_forms.join(" . ");
  console.log(what_speak);
  responsiveVoice.speak("skjorta", "Swedish Female", {
    onend: () => {
      is_number_speaking = false;
      console.info("Ready to speak again");
    }
  });
}
