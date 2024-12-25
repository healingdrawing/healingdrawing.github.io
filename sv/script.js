const menu = document.getElementById("menu");
const content = document.getElementById("content");

function show_hide_menu() { menu.classList.toggle('hidden'); }
show_hide_menu(); //hide menu on load

function hide_raw_content(){ content.classList.add('hidden'); }
hide_raw_content();

/**The "it" is binded to div, otherwise "this" operates with "document.window" */
function show_translation(it) {
  it.style.color = (it.style.color!= 'whitesmoke')? 'whitesmoke':'black';
}

function parse_all(){
  // parse
  var all_split = content.innerHTML.split("\n\n");
  var filtered = "";
  for (i=0;i<all_split.length;i++){
    if (all_split[i].startsWith("[t] ")){
      filtered += '<div class="text">' + all_split[i].replace("[t] ","") + '</div>';
    }else{
      var word_split = all_split[i].split("\n");
      if (word_split.length === 2){
        filtered += '<div class="word"><div class="sv">'
        + word_split[0]
        + '</div><div class="ru" onclick="show_translation(this)">'
        + word_split[1]
        + '</div></div>';        
      } else {
        console.log("broken word record", word_split)
      }
      
    }
  }
  document.getElementById("filtered").innerHTML = filtered;
}

parse_all();