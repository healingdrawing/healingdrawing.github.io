const menu_button = document.getElementById("menu_button");
const menu = document.getElementById("menu");
menu.classList.toggle('hidden'); //hide menu on load
const content = document.getElementById("content");

function show_hide_menu() {
  menu_button.classList.toggle('hidden');
  menu.classList.toggle('hidden');
}


function hide_raw_content(){ content.classList.add('hidden'); }
hide_raw_content();

/**The "it" is binded to div, otherwise "this" operates with "document.window" */
function show_hide_translation(it) {
  if (it.children.length < 2) console.error("Translation not found.", it.children);
  let divs = it.querySelectorAll('.en');
  divs.forEach(div => {
    if (div.classList.contains("back")) {
      div.classList.remove("back");
      div.classList.add("face");
    } else {
      div.classList.remove("face");
      div.classList.add("back");
    }
  });
}

var show_all = false; // show all translations
function show_hide_translations(){
  show_all = !show_all;
  let divs = document.querySelectorAll('.en');
  divs.forEach(div => {
    if (show_all){
      div.classList.remove("back");
      div.classList.add("face");
    } else {
      div.classList.remove("face");
      div.classList.add("back");
    }
  });
}

function switch_translations(){
  let divs = document.querySelectorAll('.en');
  divs.forEach(div => {
    if (div.classList.contains('back')) {
      div.classList.remove('back');
      div.classList.add('face');
    } else {
      div.classList.remove('face');
      div.classList.add('back');
    }
  });
}

function show_hide_extra(){
  let divs = document.querySelectorAll('.extra');
  divs.forEach(div => {
    div.classList.toggle('hidden');
  });
}

function swedish_numbers(){
  // go to another page /numbers
  window.location.href = "./number/";
}

function parse_all(){
  let number = 1;
  let text_number = 1; // to visually separate, more than one sentence sequence.
  let text_section = true; // to separate text using new line
  let word_section = true; // to separate word + text using hr
  // parse
  var all_split = content.innerHTML.trim().split("\n\n");
  
  var filtered = "";
  for (i=0;i<all_split.length;i++){
    if (all_split[i].startsWith("[t] ")){ // text/phrase found
      
      // check for long text
      let [sentences, translations] = all_split[i].split("[t] ")[1].split("\n");
      sentences = sentences.split("  ");
      translations = translations.split("  ");
      
      if (translations.length !== sentences.length) {
        console.error("incorrect sentences/translations batch found", sentences, translations);
        continue;
      }
      
      if (sentences.length > 1){
        word_section = true
        text_section = false;
        filtered += '<div class="separator"><div class="line"></div><div class="marker">'
        + '📖 '
        + text_number++
        + '</div><div class="line"></div></div>';
      }
      else if (text_section) {
        word_section = true
        text_section = false;
        filtered += '<br>'; // case of new line after words
      }
      
      for (let i=0;i< sentences.length;i++){
        let sen = sentences[i].trim();
        let tra = translations[i].trim();
        if (sen === "" || tra === "") {
          console.error("empty sentence/translation pair found", sentences, translations);
          continue;
        }
        filtered += '<div class="text" onclick="show_hide_translation(this)">'
        + '<div class="sv">' + sen + '</div>'
        + '<div class="en back">' + tra + '</div></div>';
      }
      
      // if (sentences.length > 1) filtered += '<div class="separator"><div class="line"></div><div class="marker">💆🏻</div><div class="line"></div></div>';
    }else{ //word found
      
      if (word_section) {
        text_section = true;
        word_section = false;
        filtered += '<div class="separator"><div class="line"></div><div class="number">section '
        + number++ 
        + '</div><div class="line"></div></div>';
      }
      
      let word_split = all_split[i].split("\n");
      if (word_split.length === 2){ // svenska found and translation found
        let sv_split = word_split[0].split("|").map((raw) => raw.trim());
        let en_split = word_split[1].split("|").map((raw) => raw.trim());
        if (sv_split.length !== en_split.length  || sv_split.length === 0) {
          console.error("empty sv/en batch found", sv_split, en_split);
          continue;
        }
        
        filtered += '<div class="word">'
        filtered += '<div class="container" onclick="show_hide_translation(this)">'
        
        for (let i = 0; i < sv_split.length; i++){
          filtered += ''
          + '<div class="sv">'
          + sv_split[i]
          + '</div><div class="en back">'
          + en_split[i]
          + '</div>'
        }
        
        filtered += '</div>' // container
        filtered += '<div class="extra hidden">'
          + "sv" + '</div>' // this div should be absolute+above. Later implement voicing på svenska
        filtered += '</div>'
      } else {
        console.log("parse fail. Broken word record", word_split)
      }
      
    }
  }
  document.getElementById("filtered").innerHTML = filtered;
}

parse_all();