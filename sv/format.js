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
      if (word_split.length > 1){ // svenska found and translations found
        let sv_split = word_split[0].split("|").map((raw) => raw.trim());
        let en_split = word_split[1].split("|").map((raw) => raw.trim());
        if (sv_split.length !== en_split.length  || sv_split.length === 0) {
          console.error("empty sv/en batch found", sv_split, en_split);
          continue;
        }
        
        /* todo raw injection of spanish */
        const es_split = (word_split.length > 2)?word_split[2].split("|").map((raw) => raw.trim()):undefined;
        
        filtered += '<div class="word">'
        filtered += '<div class="container" onclick="show_hide_translation(this)">'
        
        for (let i = 0; i < sv_split.length; i++){
          filtered += '<div class="sv">'
          + sv_split[i]
          + '</div><div class="en back">'
          + en_split[i]
          + ((es_split !== undefined)? ' | ' + es_split[i]:'')
          + '</div>'
        }
        
        filtered += '</div>' // container
        
        if (number > 2){ //todo ugly patch, to skip voicing of the rules(section 1)
          filtered += '<div class="extra hidden" onclick="sv_speak(this)">'
            + "sv" + '</div>' // this div should be absolute+above. Later implement voicing på svenska
          }
        filtered += '</div>'
        
      } else {
        console.error("parse fail. Broken word record", word_split)
      }
      
    }
  }
  return filtered;
}

/** table prefix*/
var att_table_prefix = `<table><thead><tr>
            <th>infinitiv</th>
            <th>imperativ!</th>
            <th>presens</th>
            <th>preteritum</th>
            <th>supinum</th>
        </tr> </thead> <tbody>`;
var att_table_td_title = [
  "infinitiv",
  "imperativ!",
  "presens",
  "preteritum",
  "supinum"
];
        
var table_suffix = `</tbody></table>`;

/** to hardcode only indices */
var word_filtered_raw_content = [];

function only_specified_word_groups_table_styled(all_split, mode){
  let abc_letter = ""; // to place separator between new words group started from one letter
  word_filtered_raw_content = [];
  let filtered = "";
  
  /* manage table case */
  if (mode.includes("att table ")) filtered += att_table_prefix;
  
  for (let i=0;i<all_split.length;i++){
    const item = all_split[i]; // ["key","value","word_type"]
    
    let word_split = item[1].split("\n");
    if (word_split.length > 1){ // svenska found and translations found
      /* check the separator needed if first swedish word letter was changed */
      let sw = word_split[0];
      if (sw){ // not empty string
        /* cut potential prefix "att /en /ett " */
        let text = (
          ["att", "en", "ett"].includes(sw.split(" ",1)[0]) //todo can be tricky
        )? sw.split(' ').slice(1).join(' ') : sw;
        
        if (text[0] !== abc_letter){
          abc_letter = text[0];
          /* add separator */
          /* manage table case separately */
          if (mode.includes(" table ")){
            filtered += '<tr><td colspan="999"><div class="separator"><div class="line"></div><div class="marker">'
            + abc_letter
            + '</div><div class="line"></div></div></td></tr>';
          } else {
            filtered += '<div class="separator"><div class="line"></div><div class="marker">'
            + abc_letter
            + '</div><div class="line"></div></div>';
          }
        }
      }
      
      let sv_split = word_split[0].split("|").map((raw) => raw.trim());
      let en_split = word_split[1].split("|").map((raw) => raw.trim());
      if (sv_split.length !== en_split.length  || sv_split.length === 0) {
        console.error("empty sv/en batch found", sv_split, en_split);
        continue;
      }
      
      /* todo raw injection of spanish */
      const es_split = (word_split.length > 2)?word_split[2].split("|").map((raw) => raw.trim()):undefined;
      
      word_filtered_raw_content.push([sv_split, en_split, es_split]);
      
      /* todo raw separation for table mode. Row click shows one word modal card */
      if (mode.includes(" table ")){
        // console.log(sv_split) //warning logs all filtered words
        filtered += `<tr onclick="show_one_word_modal('${i}')">`;
        for (const [i, word] of sv_split.entries()){
          let td='<td>';
          if (mode.startsWith("att ") && sv_split.length === att_table_td_title.length) td = `<td title="${att_table_td_title[i]}">`;
          
          filtered += td + word + '</td>';
        }
        filtered += '</tr>';
      }else{ /* all other modes. The single word is clickable */
        filtered += `<div class="word ${item[2]}-ord" onclick="show_one_word_modal('${i}')">`;
        filtered += '<div class="onewordcontainer">' + item[0] + '</div>';
        filtered += '</div>';
      }
    } else {
      console.error("parse fail. Broken word record", word_split)
    }
  }
  return filtered;
}

function only_specified_word_groups(refactored_all_split){
  let abc_letter = ""; // to place separator between new words group started from one letter
  word_filtered_raw_content = [];
  let filtered = "";
  
  for (let i=0;i<refactored_all_split.length;i++){
    const item = refactored_all_split[i]; // ["key","value","word_type"]
    
    let word_split = item[1].split("\n");
    if (word_split.length > 1){ // svenska found and translations found
      /* check the separator needed if first swedish word letter was changed */
      let sw = word_split[0];
      if (sw){ // not empty string
        /* cut potential prefix "att /en /ett " */
        let text = (
          ["att", "en", "ett"].includes(sw.split(" ",1)[0]) //todo can be tricky
        )? sw.split(' ').slice(1).join(' ') : sw;
        
        if (text[0] !== abc_letter){
          abc_letter = text[0];
          /* add separator */
          filtered += '<div class="separator"><div class="line"></div><div class="marker">'
          + abc_letter
          + '</div><div class="line"></div></div>';
        }
      }
      
      let sv_split = word_split[0].split("|").map((raw) => raw.trim());
      let en_split = word_split[1].split("|").map((raw) => raw.trim());
      if (sv_split.length !== en_split.length  || sv_split.length === 0) {
        console.error("empty sv/en batch found", sv_split, en_split);
        continue;
      }
      
      /* todo raw injection of spanish */
      const es_split = (word_split.length > 2)?word_split[2].split("|").map((raw) => raw.trim()):undefined;
      
      word_filtered_raw_content.push([sv_split, en_split, es_split]);
      filtered += `<div class="word ${item[2]}-ord" onclick="show_one_word_modal('${i}')">`;
      filtered += '<div class="onewordcontainer">' + item[0] + '</div>';
      filtered += '</div>';
    } else {
      console.error("parse fail. Broken word record", word_split)
    }
  }
  return filtered;
}

function format_word_modal(sv,en, es){
  /** word card html */
  let card = "";
  let sv_split = sv;
  let en_split = en;
  
  /* todo raw injection of spanish */
  const es_split = es;
  
  card += '<div class="word">'
  card += '<div class="container">'
  
  for (let i = 0; i < sv_split.length; i++){
    card += '<div class="sv">'
    + sv_split[i]
    + '</div><div class="en">'
    + en_split[i]
    + ((es_split !== undefined)? ' | ' + es_split[i]:'')
    + '</div>'
  }
  
  card += '</div>' // container
  card += '<div class="extra" onclick="event.stopPropagation(); sv_speak(this)">'
    + "sv" + '</div>' // this div should be absolute+above. Later implement voicing på svenska
  card += '</div>'
  
  return card;
}

const one_word_modal = document.getElementById("one-word-modal");
const one_word_modal_content = document.getElementById("one-word-modal-content");

function show_one_word_modal(word_filtered_raw_content_index){
  let [sv,en, es] = word_filtered_raw_content[word_filtered_raw_content_index];
  one_word_modal_content.innerHTML = format_word_modal(sv,en, es);
  one_word_modal.style.display = 'block';
  document.body.classList.add('modal-open'); // Prevent scroll
}

function hide_one_word_modal(){
  one_word_modal_content.innerHTML = "";
  one_word_modal.style.display = 'none';
  document.body.classList.remove('modal-open'); //Default scrolling
}