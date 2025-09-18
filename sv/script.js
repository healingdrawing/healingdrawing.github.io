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

/** mode is string */
function parse_all(mode = "show all"){
  
  let filtered = "";
  // parse
  let all_split = content.innerHTML.trim().split("\n\n");
  
  // here data must be fully prepared, sorted + filtered
  if (mode === "show all"){
    filtered += full_data_no_sorting(all_split);
  }
  else {
    
    /* it is heavily refactored, depends on mode. */
    let refactored_all_split = sort_words(all_split, mode);
    /* separation for table mode. Raw injection. Not borred to refactor properly. */
    if(mode.includes(" table ")){
      filtered += only_specified_word_groups_table_styled(refactored_all_split, mode)
    }else{
      filtered += only_specified_word_groups(refactored_all_split);
    }
  }
  
  document.getElementById("filtered").innerHTML = filtered;
}

parse_all();
