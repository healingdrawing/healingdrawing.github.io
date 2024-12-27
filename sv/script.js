const menu = document.getElementById("menu");
const content = document.getElementById("content");

function show_hide_menu() { menu.classList.toggle('hidden'); }
show_hide_menu(); //hide menu on load

function hide_raw_content(){ content.classList.add('hidden'); }
hide_raw_content();

/**The "it" is binded to div, otherwise "this" operates with "document.window" */
function show_hide_translation(it) {
  if (it.children.length < 2) console.error("Translation not found.", it.children);
  let t = it.children[1] // translation div
  if (t.classList.contains("face")) {
    t.classList.remove("face");
    t.classList.add("back");
  } else {
    t.classList.remove("back")
    t.classList.add("face")
  }
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
      
      if (text_section) {
        word_section = true
        text_section = false;
        filtered += '<br>';
      }
      
      let text_split = all_split[i].split("\n")
      if (text_split.length === 2) {
        filtered += '<div class="text" onclick="show_hide_translation(this)">'
        + '<div class="sv">' + text_split[0].replace("[t] ","") + '</div>'
        + '<div class="ru back">' + text_split[1] + '</div></div>';
      }
    }else{ //word found
      
      if (word_section) {
        text_section = true;
        word_section = false;
        filtered += '<div class="separator"><hr>'+ number++ +"<hr></div>";
      }
      
      let word_split = all_split[i].split("\n");
      if (word_split.length === 2){ // svenska found and translation found
        let sv_split = word_split[0].split("|")
        if (sv_split.length === 2){ // indefinite and definite forms found
          filtered += '<div class="word" onclick="show_hide_translation(this)">'
          + '<div class="sv" title="'
          + sv_split[0] + '">'
          + sv_split[1]
          + '</div>|<div class="ru back">'
          + word_split[1]
          + '</div></div>'
        } else { // no indefinite form provided
          filtered += '<div class="word" onclick="show_hide_translation(this)">'
          + '<div class="sv">'
          + word_split[0]
          + '</div>|<div class="ru back">'
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