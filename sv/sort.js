const sort_modal = document.getElementById("sort-modal");

function show_sort_menu(){
  sort_modal.style.display = 'block';
  document.body.classList.add('modal-open'); // Prevent scroll
}

function hide_sort_menu(){
  sort_modal.style.display = 'none';
  document.body.classList.remove('modal-open'); //Default scrolling
}

/** all_split is string[], mode is string */
function sort_words(all_split, mode){
  if (mode === "original") return all_split; // no needs to change content
  // cut first x4 items from string[], since they are rules/descriptions, not a content itself
  all_split = all_split.slice(4);
  // keep only single words, so remove items started from [t]
  all_split = all_split.filter(line => !line.startsWith("[t] "));
  
  switch (mode){
    case "words abc": return sort_words_abc(all_split);
    case "words cba": return sort_words_cba(all_split);
    case "att abc": return sort_words_abc(all_split.filter(line => line.startsWith("att ")));
    case "att cba": return sort_words_cba(all_split.filter(line => line.startsWith("att ")));
    // todo consider en/ett filtering separetely, or when/if together en + ett then think about ignore en ett
    
  }
}

/** sort all single words alphabetically, include words started from att , en , ett, another like colors and so */
function sort_words_abc(all_split){ return all_split.sort(); }
function sort_words_cba(all_split){ return all_split.sort().reverse(); }
// todo ok, this two above alive but still need consider also the en/ett/att ignoring before sorting. Also capitalization can mess the order