const menu = document.getElementById("menu");
const content = document.getElementById("content");
const mutations = document.getElementById("mutations");
const abc_inf_to_eng = document.getElementById("abc-inf-to-eng");
const abc_eng_to_inf = document.getElementById("abc-eng-to-inf");


function show_mutations(){
  menu.classList.toggle('hidden'); //hide menu
  let lines_list = content.innerHTML.trim().split("\n");
  console.log(lines_list)
  
  /* clearly split to words_lists [][] */
  let words_list = []
  for (line of lines_list){
    if (line.startsWith("<!--")) continue
    let word_list = line.split(" | ")
    words_list.push(word_list)
  }
  
  /* sort abc by spanish, keep first */
  let head = words_list[0]
  let tail = words_list.slice(1)
  tail.sort((a, b) => a[0].localeCompare(b[0]));
  words_list = [head]
  words_list.push(...tail)
  
  console.log(words_list)


  /*
    now split every word to infinitive with translation, formatted opposite colors uses style .word, and all other mutations/conjugations with default style
  */
  let mutations_html = ""
  for (one of words_list){
    mutations_html += word_div(one[0], true)
    
    for (other of one.slice(1)){
      mutations_html += word_div(other)
    }
  }

  mutations.innerHTML += mutations_html
}

function word_div(text, first=false){
  return `<div${(first)?" class='first'":" class='other'"}>${text}</div>`
}

/* now the spanish to english, abc spanish sorted, only first item in line */
function show_abc_inf_to_eng(){
  menu.classList.toggle('hidden'); //hide menu
  let lines_list = content.innerHTML.trim().split("\n");
  console.log(lines_list)
  
  /* clearly split to words_lists, and get only first item, then split again to separate english [][] */
  let words_list = []
  for (line of lines_list){
    if (line.startsWith("<!--")) continue
    let word_list = line.split(" | ")[0] //get first
    word_list = word_list.split("(") //split es( en )
    word_list = [word_list[0].trim(),word_list[1].split(")")[0].trim()]
    words_list.push(word_list)
  }
  
  /* sort abc by spanish, keep first */
  let head = words_list[0]
  let tail = words_list.slice(1)
  tail.sort((a, b) => a[0].localeCompare(b[0]));
  words_list = [head]
  words_list.push(...tail)
  
  console.log(words_list)


  /*
    now split every word to infinitive with translation, formatted opposite colors uses style .word, and all other mutations/conjugations with default style
  */
  let abc_inf_to_eng_html = ""
  for (one of words_list){
    abc_inf_to_eng_html += word_div(one[0], true)
    
    for (other of one.slice(1)){
      abc_inf_to_eng_html += word_div(other)
    }
  }

  abc_inf_to_eng.innerHTML += abc_inf_to_eng_html
}

/* now the english to spanish, abc english sorted, only first item in line */
function show_abc_eng_to_inf(toggle = true){
  if(toggle) menu.classList.toggle('hidden'); //hide menu
  let lines_list = content.innerHTML.trim().split("\n");
  console.log(lines_list)
  
  /* clearly split to words_lists, and get only first item, then split again to separate english [][] */
  let words_list = []
  for (line of lines_list){
    if (line.startsWith("<!--")) continue
    let word_list = line.split(" | ")[0] //get first
    word_list = word_list.split("(") //split es( en )
    word_list = [word_list[1].split(")")[0].trim(),word_list[0].trim()] //en es
    words_list.push(word_list)
  }
  
  /* sort abc by english, keep first */
  let head = words_list[0]
  let tail = words_list.slice(1)
  tail.sort((a, b) => a[0].localeCompare(b[0]));
  words_list = [head]
  words_list.push(...tail)
  
  console.log(words_list)


  /*
    now split every word to infinitive with translation, formatted opposite colors uses style .word, and all other mutations/conjugations with default style
  */
  let abc_eng_to_inf_html = ""
  for (one of words_list){
    abc_eng_to_inf_html += word_div(one[0], true)
    
    for (other of one.slice(1)){
      abc_eng_to_inf_html += word_div(other)
    }
  }

  abc_eng_to_inf.innerHTML += abc_eng_to_inf_html
}

function show_mutations_then_abc_eng_to_inf(){
  show_mutations()
  abc_eng_to_inf.innerHTML += '<br>'
  show_abc_eng_to_inf(false)
}
