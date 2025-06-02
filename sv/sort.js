const words_modal = document.getElementById("words-modal");

function show_words_menu(){
  words_modal.style.display = 'block';
  document.body.classList.add('modal-open'); // Prevent scroll
}

function hide_words_menu(){
  words_modal.style.display = 'none';
  document.body.classList.remove('modal-open'); //Default scrolling
}

/** all_split is string[], mode is string */
function sort_words(all_split, mode){
  if (mode === "show all") return all_split; // no needs to change content
  // cut first x4 items from string[], since they are rules/descriptions, not a content itself
  all_split = all_split.slice(4);
  // keep only single words, so remove items started from [t]
  all_split = all_split.filter(line => !line.startsWith("[t] "));
  
  switch (mode){
    case "words abc": return sort_words_abc(all_split);
    case "words cba": return sort_words_cba(all_split);
    case "att abc": return sort_words_abc(all_split.filter(line => line_is_att(line)));
    case "att cba": return sort_words_cba(all_split.filter(line => line_is_att(line)));
    case "en/ett abc": return sort_words_abc(all_split.filter(line => line_is_en_ett(line)));
    case "en/ett cba": return sort_words_cba(all_split.filter(line => line_is_en_ett(line)));
    case "en abc": return sort_words_abc(all_split.filter(line => line_is_en(line)));
    case "en cba": return sort_words_cba(all_split.filter(line => line_is_en(line)));
    case "ett abc": return sort_words_abc(all_split.filter(line => line_is_ett(line)));
    case "ett cba": return sort_words_cba(all_split.filter(line => line_is_ett(line)));
    case "another abc": return sort_words_abc(all_split.filter(line => line_is_another(line)));
    case "another cba": return sort_words_cba(all_split.filter(line => line_is_another(line)));
    // todo consider en/ett filtering separetely, or when/if together en + ett then think about ignore en ett
    
  }
}

function line_is_en(line){
  return line.startsWith("en ") && line.split("|")[0].split(" ").length === 3;
}

function line_is_ett(line){
  return line.startsWith("ett ") && line.split("|")[0].split(" ").length === 3;
}

function line_is_en_ett(line){
  return line_is_en(line) || line_is_ett(line);
}

function line_is_att(line){
  return line.startsWith("att ") && line.split("|")[0].split(" ").length === 3;
}

function line_is_another(line){
  return !line_is_att(line) && !line_is_en_ett(line);
}

/** sort all single words alphabetically, include words started from att , en , ett, another like colors and so */
function sort_words_abc(all_split){ return all_split.sort(); }
function sort_words_cba(all_split){ return all_split.sort().reverse(); }
// todo ok, this two above alive but still need consider also the en/ett/att ignoring before sorting. Also capitalization can mess the order