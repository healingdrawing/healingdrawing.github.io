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
  let t = it.querySelector('.ru') // translation div
  if (t.classList.contains("face")) {
    t.classList.remove("face");
    t.classList.add("back");
  } else {
    t.classList.remove("back")
    t.classList.add("face")
  }
}

var show_all = false; // show all translations
function show_hide_translations(){
  show_all = !show_all;
  let divs = document.querySelectorAll('.ru');
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
  let divs = document.querySelectorAll('.ru');
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
  let divs = document.querySelectorAll('.enettatt');
  divs.forEach(div => {
    div.classList.toggle('hidden');
  });
}

function parse_all(){
  let number = 1;
  let text_section = true; // to separate text using new line
  let word_section = true; // to separate word + text using hr
  // parse
  var all_split = content.innerHTML.split("\n\n");
  var filtered = "";
  for (i=0;i<all_split.length;i++){
    if (all_split[i].startsWith("[t] ")){ // text/phrase found
      
      // check for long text
      let [sentences, translations] = all_split[i].split("[t] ")[1].split("\n");
      sentences = sentences.split(".");
      translations = translations.split(".");
      
      if (translations.length !== sentences.length) {
        console.error("incorrect sentences/translations batch found", sentences, translations);
        continue;
      }
      
      if (sentences.length > 1){
        word_section = true
        text_section = false;
        filtered += '<div class="separator"><div class="line"></div><div class="marker">📖</div><div class="line"></div></div>';
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
        + '<div class="ru back">' + tra + '</div></div>';
      }
      
      if (sentences.length > 1) filtered += '<div class="separator"><div class="line"></div><div class="marker">💆🏻</div><div class="line"></div></div>';
    }else{ //word found
      
      if (word_section) {
        text_section = true;
        word_section = false;
        filtered += '<div class="separator"><div class="line"></div><div class="number">'
        + number++ 
        + '</div><div class="line"></div></div>';
      }
      
      let word_split = all_split[i].split("\n");
      if (word_split.length === 2){ // svenska found and translation found
        let sv_split = word_split[0].split("|").map((raw) => raw.trim())
        if (sv_split.length === 2){ // en ett att forms found
          filtered += '<div class="word" onclick="show_hide_translation(this)">'
          + '<div class="enettatt hidden">'
          + sv_split[0] + '</div>'
          + '<div class="sv" title="'
          + sv_split[0] + '">'
          + sv_split[1]
          + '</div><div class="ru back">'
          + word_split[1]
          + '</div></div>'
        } else { // no en ett att forms found
          filtered += '<div class="word" onclick="show_hide_translation(this)">'
          + '<div class="sv">'
          + word_split[0]
          + '</div><div class="ru back">'
          + word_split[1]
          + '</div></div>';
        }
        
      } else {
        console.log("parse fail. Broken word record", word_split)
      }
      
    }
  }
  document.getElementById("filtered").innerHTML = filtered;
}

parse_all();