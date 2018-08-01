
var import_input = document.getElementById('GUIimport');
function importGUI(){ import_input.click(); }
var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) { 
        write_data_to_gui(reader.result);
    };
    reader.readAsText(files[0]);
    // console.log(reader.result);
}
import_input.addEventListener('change', handleFileSelect, false);
import_input.value = "";

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
