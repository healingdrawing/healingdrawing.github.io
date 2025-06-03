/** this is original function. Will format all groups */
function full_data_no_sorting(all_split){
  let filtered = "";
  let number = 1;
  let text_number = 1; // to visually separate, more than one sentence sequence.
  let text_section = true; // to separate text using new line
  let word_section = true; // to separate word + text using hr
  for (let i=0;i<all_split.length;i++){
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
  return filtered;
}

//todo implement clickable words with popup modal info and coloring
function only_specified_word_groups(all_split){
  let filtered = "";
  for (let i=0;i<all_split.length;i++){    
    
    const item = all_split[i]; // ["key","value","word_type"]
    
    let word_split = item[1].split("\n");
    if (word_split.length === 2){ // svenska found and translation found
      let sv_split = word_split[0].split("|").map((raw) => raw.trim());
      let en_split = word_split[1].split("|").map((raw) => raw.trim());
      if (sv_split.length !== en_split.length  || sv_split.length === 0) {
        console.error("empty sv/en batch found", sv_split, en_split);
        continue;
      }
      let [sv,en] = [word_split[0],word_split[1]];
      // filtered += `<div class="word" onclick="show_one_word_modal('${sv}','${en}')">`; //todo inject styling for word_type
      filtered += `<div class="word" onclick="show_one_word_modal('${safe_string(sv)}','${safe_string(en)}')">`;
      
      filtered += item[0];
      
      filtered += '</div>';
    } else {
      console.log("parse fail. Broken word record", word_split)
    }
    
  }
  return filtered;
}

 //todo nightmare to allow html also sent as part of incoming string. Maybe reconsider later because it fucks up the clicking and square breaks styling.
function safe_string(str){
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '\\n');
}

/** value is string, sv\nen */
function format_word_modal(sv,en){
  return `<div class="sv">${sv}</div><div class="en">${en}</div>`;
}

const one_word_modal = document.getElementById("one-word-modal");

function show_one_word_modal(sv, en){
  one_word_modal.innerHTML = format_word_modal(sv,en);
  one_word_modal.style.display = 'block';
  document.body.classList.add('modal-open'); // Prevent scroll
}

function hide_one_word_modal(){
  one_word_modal.innerHTML = "";
  one_word_modal.style.display = 'none';
  document.body.classList.remove('modal-open'); //Default scrolling
}