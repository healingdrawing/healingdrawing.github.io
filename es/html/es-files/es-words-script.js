const menu = document.getElementById("menu");
const content = document.getElementById("content");
const abc_es_to_eng = document.getElementById("abc-es-to-eng");
const abc_eng_to_es = document.getElementById("abc-eng-to-es");


function word_div(text, first=false){
  return `<div${(first)?" class='first'":" class='other'"}>${text}</div>`
}

/* now the spanish to english, abc spanish sorted, only first item in line */
function show_abc_es_to_eng(){
  menu.classList.toggle('hidden'); //hide menu
  let lines_list = content.innerHTML.trim().split("\n");
  console.log(lines_list)
  
  /* clearly split to words_lists, and get only first item, then split again to separate english [][] */
  let words_list = []
  for (line of lines_list){
    if (line.startsWith("<!--")) continue
    let word_list = line.split("|") //split es | en
    word_list = [word_list[0].trim(),word_list[1].trim()]
    words_list.push(word_list)
  }
  
  const prefixes = ['el', 'la', 'los', 'las', 'el/la', 'los/las', 'el/la/los/las'] //las f.e. in case of "las gafas"
  const precut = (s) => {
    s = cut(s)
    const ss = s.split(' ')
    if (ss.length > 1 && prefixes.includes(ss[0].toLowerCase())){
      return ss.slice(1).join(' ').trim()
    } else return ss[0]
  };

  /* sort abc by spanish, keep first */
  let head = words_list[0]
  let tail = words_list.slice(1)
  tail.sort((a, b) => precut(a[0]).localeCompare(precut(b[0])));
  words_list = [head]
  words_list.push(...tail)

  words_list = nofocus(words_list)
  
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

  abc_es_to_eng.innerHTML += abc_inf_to_eng_html
}

/* now the english to spanish, abc english sorted, only first item in line */
function show_abc_eng_to_es(toggle = true){
  if(toggle) menu.classList.toggle('hidden'); //hide menu
  let lines_list = content.innerHTML.trim().split("\n");
  console.log(lines_list)
  
  /* clearly split to words_lists, and get only first item, then split again to separate english [][] */
  let words_list = []
  for (line of lines_list){
    if (line.startsWith("<!--")) continue
    let word_list = line.split("|") //split es | en
    word_list = [word_list[1].trim(),word_list[0].trim()] //en es
    words_list.push(word_list)
  }
  
  /* sort abc by english, keep first */
  let head = words_list[0]
  let tail = words_list.slice(1)
  tail.sort((a, b) => cut(a[0]).localeCompare(cut(b[0])));
  words_list = [head]
  words_list.push(...tail)
  
  words_list = nofocus(words_list)
  
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

  abc_eng_to_es.innerHTML += abc_eng_to_inf_html
}

function show_abc_es_to_eng_then_eng_to_es(){
  show_abc_es_to_eng()
  abc_eng_to_es.innerHTML += '<br>'
  show_abc_eng_to_es(false)
}

/** ignore_optional_explanation_prefixes */
function cut(s){
  // hardcoded check the focus "{string}"
  if (s.includes("{")
    && s.includes("}")
  && s.indexOf("{")+1 < s.indexOf("}")
  ){
    console.log("focus detected")
    var focus = s.trim().split("{").slice(1).join("{").split("}")
    focus = focus.slice(0,focus.length-1).join("}")
    console.log("focus", focus)
    return focus
  }

  var cores = s.trim();
  if (cores.startsWith("(")){
    cores = cores.split(")")
    if (cores.length > 1) cores = cores.slice(1).join(")")
    return cut(cores)
  } else if(cores.startsWith("[")){
    cores = cores.split("]")
    if (cores.length > 1) cores = cores.slice(1).join("]")
    return cut(cores)
  } else{
  return cores}
}

// remove focus {} visually
function cutfocus(s){
  if (s.includes("{")){
    s = s.split("{").join("")
    return cutfocus(s)
  } else if (s.includes("}")){
    s = s.split("}").join("")
    return cutfocus(s)
  } else return s
}

/** wrapper to remove focus {} */
function nofocus(words_list){
  return words_list.map((wl) =>{
    return [cutfocus(wl[0]),cutfocus(wl[1])]
  })
}