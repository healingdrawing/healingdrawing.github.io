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
  let without_format_description = all_split.slice(4);
  // keep only single words, so remove items started from [t]
  let filtered = without_format_description.filter(line => !line.startsWith("[t] "));
  
  // filter incoming string[] by mode
  if (mode === "att abc") filtered = filtered.filter(line => line_is_att(line));
  else if (mode === "att cba") filtered = filtered.filter(line => line_is_att(line));
  else if (mode === "en/ett abc") filtered = filtered.filter(line => line_is_en_ett(line));
  else if (mode === "en/ett cba") filtered = filtered.filter(line => line_is_en_ett(line));
  else if (mode === "en abc") filtered = filtered.filter(line => line_is_en(line));
  else if (mode === "en cba") filtered = filtered.filter(line => line_is_en(line));
  else if (mode === "ett abc") filtered = filtered.filter(line => line_is_ett(line));
  else if (mode === "ett cba") filtered = filtered.filter(line => line_is_ett(line));
  else if (mode === "another abc") filtered = filtered.filter(line => line_is_another(line));
  else if (mode === "another cba") filtered = filtered.filter(line => line_is_another(line));
  
  let refactored = refactor_incoming(filtered);
  /** structure was changed here
   * string[] became array of arrays [["key","value","word_type"], ["key","value","word_type"], ...]
  */
  let sorted = sort_by_keys_using_zero_index(refactored);
  if (mode.endsWith(" cba")) sorted.reverse();
  
  return sorted;
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

/** this function convert incoming string[] to pairs of key, value. Where each key is string, value is string, that is data for show in modal popup, after key click.
 * For every item of incoming, next happens:
 * 
 * incoming item:
 * en bil | bilen | bilar | bilarna
 * a car | the car | cars | the cars
 * 
 * generated result for item:
 * keys: bil, bilen, bilar, bilarna.
 * each key will have full incoming item data as value, to show in popup
 * 
 * "type" is for future use. At least att/en/ett/another to stylize html
 */
function refactor_incoming(all_split){
  let result = []; // [["key","value","word_type"], ["key","value","word_type"], ...]
  for (let i=0;i<all_split.length;i++){
    const value = all_split[i];
    const keys = value.split("\n")[0].split("|");
    let word_type = "another";
    if (line_is_en(keys[0])) word_type = "en";
    else if (line_is_ett(keys[0])) word_type = "ett";
    else if (line_is_att(keys[0])) word_type = "att";
    if (word_type !== "another") keys[0] = keys[0].split(" ")[1].trim(); // remove prefix
    
    keys.forEach((str, index) => {
      keys[index] = str.trim();
    });//trim after, to not break line_is_x functionality
    
    for (let j=0;j<keys.length;j++){
      result.push([keys[j], value, word_type]);
    }
  }
  console.log("result after refactor_incoming", result); //todo remove
  return result;
}

/** sorting by item's zero index value.
 * Items are in [["key","value","word_type"], ["key","value","word_type"], ...]
 * */
function sort_by_keys_using_zero_index(arr) {
  return arr.sort((a, b) => {
    return a[0].toLowerCase().localeCompare(b[0]); //ignore case, to keep some bit the original order in source
  });
}
