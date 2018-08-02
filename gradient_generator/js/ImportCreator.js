
var gui_input = document.getElementById('GUIimport');
function importGUI(){ gui_input.click(); }
var handleGUIFileSelect = function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) { 
        write_data_to_gui(reader.result);
    };
    reader.readAsText(files[0]);
    // console.log(reader.result);
}
gui_input.addEventListener('change', handleGUIFileSelect, false);
gui_input.value = "";

function write_data_to_gui(text){
    console.log(text);
    var d = JSON.parse(text);
    for (var i=0;i<ids_number.length;i++){ document.getElementById(ids_number[i]).value = d[ids_number[i]]; }
    for (var i=0;i<ids_checkbox.length;i++){
        if (d[ids_checkbox[i]]){ document.getElementById(ids_checkbox[i]).value = true; }
        else{ document.getElementById(ids_checkbox[i]).value = false; }
    }
    document.getElementById("info").value = "GUI loaded from *.json";
}


var seed_input = document.getElementById('SEEDimport');
function importSEED(){ seed_input.click(); }
var handleSEEDFileSelect = function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) { 
        gradient_steps = JSON.parse(reader.result);
        generate_svg_preview(gradient_steps);
    };
    reader.readAsText(files[0]);
    // console.log(reader.result);
}
seed_input.addEventListener('change', handleSEEDFileSelect, false);
seed_input.value = "";
