
function write_values(d){
    for (var i=0;i<ids_number.length;i++){
        document.getElementById(ids_number[i]).value = d[ids_number[i]];
    }
}

var ids_number = [
    "red_min","red_max","red",
    "green_min","green_max","green",
    "blue_min","blue_max","blue",
    "alpha_start_min","alpha_start_max","alpha_start",
    "alpha_end_min","alpha_end_max","alpha_end",
    
    "steps_min","steps_max","steps",
    "step_size_min","step_size_max","step_size",
    "hole_size_min","hole_size_max","hole_size",
    "radius_min","radius_max","radius"
    
    
]

var ids_checkbox = [
    "monochrome","smooth",
    
    "red_lock_minmax","red_lock_value",
    "green_lock_minmax","green_lock_value",
    "blue_lock_minmax","blue_lock_value",
    "alpha_start_lock_minmax","alpha_start_lock_value",
    "alpha_end_lock_minmax","alpha_end_lock_value",
    
    "steps_lock_minmax","steps_lock_value",
    "step_size_lock_minmax","step_size_lock_value",
    "hole_size_lock_minmax","hole_size_lock_value",
    "radius_lock_minmax","radius_lock_value"
]

function read_input_number_values(){
    var rez = [];
    for (var i = 0;i<ids_number.length;i++){
        var value = parseFloat( document.getElementById(ids_number[i]).value ) || 0;
        rez.push(value);
    }return rez;
}

function read_input_checkbox_values(){
    var rez = [];
    for (var i = 0;i<ids_checkbox.length;i++){
        var value = document.getElementById(ids_checkbox[i]).checked;
        rez.push(value);
    }return rez;
}

function read_values(){
    var input_numbers = read_input_number_values();
    var input_checkboxes = read_input_checkbox_values();
    return [input_numbers,input_checkboxes];
}

function get_gui_values_as_object(){
    var vals = read_values(); // -> [[...],[...]]
    var ids = [ids_number,ids_checkbox];
    var d={};
    for (var i=0;i<ids.length;i++){
        for (var ii=0;ii<ids[i].length;ii++){
            d[ids[i][ii]] = vals[i][ii];
        }
    }
    return d;
}