showme("preparing GuiCreator.js");
function ok_gui_creator(){
    var box = document.getElementById('div_ok');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var b_ok = document.createElement('button');
    var b_png = document.createElement('button');
    var b_save = document.createElement('button');
    var b_load = document.createElement('button');
    //need set onclick attributes later
        
    b_ok.className = "b50px";
    b_ok.textContent = "ok";
    // b_ok.title = "calculate model";
    b_ok.tabIndex = 1;
    b_ok.onclick = function() {wheel_creator();};
    
    b_png.className = "b50px";
    b_png.textContent = "png";
    b_png.onclick = function() { PNGexport(); }
    
    b_save.className = "b50px";
    b_save.textContent = "save";
    b_save.onclick = function() { save_data_to_txt(); }
    
    b_load.className = "b50px";
    b_load.textContent = "load";
    b_load.onclick = function() { load_data_from_txt(); }
    
    td1.appendChild(b_ok);
    td2.appendChild(b_png);
    td3.appendChild(b_save);
    td4.appendChild(b_load);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    box.appendChild(table);
}

function td_hr(colspan = 1){
    var td = document.createElement('td');
    td.colSpan = colspan;
    td.appendChild(document.createElement('hr'));
    return td;
}
function td_text(text, color = "",colspan = 1){
    var td = document.createElement('td');
    var style = "";
    if (color == ""){ style = "vertical-align:middle;"; }
    else{style = "vertical-align:middle;color:"+color+";";}
    td.setAttribute("style",style);
    td.innerHTML = text;
    td.colSpan = colspan;
    return td;
}
function text_tag(text,color){
    var t = document.createElement('text');
    t.innerHTML = text;
    t.setAttribute("style", "vertical-align:middle;color:"+color+";");
    return t;
}
function cbox_tag(id,checked = false, title = ""){
    var cbox = document.createElement('input');
    cbox.type = "checkbox";
    cbox.id = id;
    cbox.title = title;
    cbox.defaultChecked = checked;
    return cbox;
}
function td_text_multicolor(texts = [], colors = []){
    var td = document.createElement("td");
    if (texts.length == colors.length){
        for (i=0;i<texts.length;i++){
            td.appendChild(text_tag(texts[i],colors[i]));
        }
    }
    return td;
}
function td_cbox_text_multicolor_colspan(id, checked = false, texts = [], colors = [], colspan = 1, title = ""){
    var td = document.createElement("td");
    td.colSpan = colspan;
    td.appendChild(cbox_tag(id, checked, title));
    if (texts.length == colors.length){
        for (i=0;i<texts.length;i++){
            td.appendChild(text_tag(texts[i],colors[i]));
        }
    }
    return td;
}

function td_input(id, title = ""){
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.id = id;
    if(title != ""){input.title = title;}
    td.appendChild(input);
    return td;
}

var size_ids=[];
function size_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("&nbsp;","",4));
    tbody.appendChild(tr);
    for (i=0;i<5;i++){//x3tr box 
        var tr = document.createElement('tr');
        var tr_input_name = [
            ["base_length","base_radius","base_curvature","tail_radius"],
            ["tail_start_offset","tail_start_length","tail_end_offset","tail_end_length"],
            ["bottle_length","bottle_radius","bottle_offset","ring_radius"]
        ];
        for (ii=0;ii<tr_input_name.length;ii++){//tr
            var input_name = tr_input_name[ii];
            var tr = document.createElement('tr');
            for (iii=0;iii<input_name.length;iii++){//td
                var id=input_name[iii]+"_"+(i+1).toString();
                size_ids.push(id);
                tr.appendChild(td_input(id,id));
            }
            tbody.appendChild(tr);
        }
        if (i<4){
            var tr = document.createElement('tr');
            tr.appendChild(td_hr(4));
            tbody.appendChild(tr);
        }
    }
    return tbody;
}
function size_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(size_gui_tbody());
    var box = document.getElementById("tab_c1");
    box.appendChild(table);
}

function td_cbox(cboxid, checked = false, title = ""){
    var td = document.createElement('td');
    var cbox = document.createElement('input');
    cbox.id = cboxid;
    cbox.type = "checkbox";
    cbox.defaultChecked = checked;
    if (title != ""){cbox.title = title;}
    td.appendChild(cbox);
    return td;
}
function td_radio(id, name, value, checked = false){
    var td = document.createElement('td');
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.className = "guiradio";
    radio.name = name;
    radio.id = id;
    radio.defaultChecked = checked;
    radio.value = value;
    td.appendChild(radio);
    return td;
}
function td_color(id, co = "#000000",title = ""){
    var td = document.createElement('td');
    var color = document.createElement('input');
    color.type = "color";
    color.className = "guicolor";
    color.id = id;
    color.value = co;
    color.title = title;
    td.appendChild(color);
    return td;
}
function balert(x){
    alert(x);//need two
}
function td_button(text, callback, title = "",bclass="b50px"){
    var td = document.createElement('td');
    var btn = "<button class=\""+bclass+"\" title=\""+title+"\" onclick=\""+callback+"\">"+text+"</button>";
    td.innerHTML = btn;
    return td;
}

var look_ids=[];
function look_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("&nbsp;","",4));
    tbody.appendChild(tr);
    for (i=0;i<5;i++){//x3tr box 
        var tr = document.createElement('tr');
        var tr_input_name = [
            ["color_base","color_tail","color_bottle","ring_length"],
            ["alpha_base","alpha_tail","alpha_bottle","ring_width"],
            ["tail_start_width","tail_end_width","tail_angle","ring_offset"]
        ];
        for (ii=0;ii<tr_input_name.length;ii++){//tr
            var input_name = tr_input_name[ii];
            
            var tr = document.createElement('tr');
            for (iii=0;iii<input_name.length;iii++){//td
                var id=input_name[iii]+"_"+(i+1).toString();
                look_ids.push(id);
                if (ii==0 && iii<3){
                    tr.appendChild(td_color(id,undefined,id));
                }else{
                    tr.appendChild(td_input(id,id));
                }
            }
            tbody.appendChild(tr);
        }
        if(i<4){
            var tr = document.createElement('tr');
            tr.appendChild(td_hr(4));
            tbody.appendChild(tr);
        }
    }
    
    return tbody;
}
function look_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(look_gui_tbody());
    var box = document.getElementById("tab_c2");
    box.appendChild(table);
    var img = document.createElement('img');
    img.src = "img/look200260.svg";
    box.appendChild(img);
}

function td_cbox_text_colspan(cboxid, text, checked = false, colspan = 1, align = "left",title=""){
    var td = document.createElement('td');
    td.colSpan = colspan;
    td.setAttribute('style','text-align :'+align+';');
    var cbox = document.createElement('input');
    cbox.id = cboxid;
    cbox.type = "checkbox";
    cbox.checked = checked;
    cbox.title = title;
    var text = document.createTextNode(text);
    td.appendChild(cbox);
    td.appendChild(text);
    return td;
}
function lamp_gui_tbody(){
    var tbody = document.createElement('tbody');
    
    var tr = document.createElement('tr');
    tr.appendChild(td_text("&nbsp;","",4));
    tbody.appendChild(tr);
    
    var tr1 = document.createElement('tr');
    tr1.appendChild(td_cbox_text_colspan("wireframe","wireframe",false,2,"left","need model recalculation"));
    tr1.appendChild(td_cbox_text_multicolor_colspan("axes",true,["x","y","z"," axes"],["red","green","blue",""],2,"need model recalculation"));
    
    var tr2 = document.createElement('tr');
    tr2.appendChild(td_hr(4));
    
    var tr3 = document.createElement('tr');
    tr3.appendChild(td_cbox_text_colspan("cbox_ambient","ambient",true,2));
    tr3.appendChild(td_input("intensity_ambient","intensity"));
    tr3.appendChild(td_color("color_ambient","#ffffff","color"));
    
    var tr4 = document.createElement('tr');
    tr4.appendChild(td_input("x_ambient","x direction"));
    tr4.appendChild(td_input("y_ambient","y direction"));
    tr4.appendChild(td_input("z_ambient","z direction"));
    tr4.appendChild(td_color("color_ground_ambient","#ffffff","ground color"));
    
    var tr5 = document.createElement('tr');
    tr5.appendChild(td_hr(4));
    
    var tr6 = document.createElement('tr');
    tr6.appendChild(td_cbox_text_colspan("cbox_directional","directional",false,2));
    tr6.appendChild(td_input("intensity_directional","intensity"));
    tr6.appendChild(td_color("color_directional","#ffffff"));
    
    var tr7 = document.createElement('tr');
    tr7.appendChild(td_input("x_directional","x"));
    tr7.appendChild(td_input("y_directional","y"));
    tr7.appendChild(td_input("z_directional","z"));
    tr7.appendChild(td_text("vector"));
    
    
    
    var tr9 = document.createElement('tr');
    tr9.appendChild(td_hr(4));
    
    var tr10 = document.createElement('tr');
    tr10.appendChild(td_cbox_text_colspan("cbox_point","point",false,2));
    tr10.appendChild(td_input("intensity_point","intensity"));
    tr10.appendChild(td_color("color_point","#ffffff"));
    
    var tr11 = document.createElement('tr');
    tr11.appendChild(td_input("x_point","x"));
    tr11.appendChild(td_input("y_point","y"));
    tr11.appendChild(td_input("z_point","z"));
    tr11.appendChild(td_text_multicolor(["x","y","z"],["red","green","blue"]));
    
    var tr14 = document.createElement('tr');
    tr14.appendChild(td_hr(4));
    
    var tr15 = document.createElement('tr');
    tr15.appendChild(td_text("background color","",4));
    
    var tr16 = document.createElement('tr');
    tr16.appendChild(td_cbox_text_colspan("transperent","render transperent",true,3));
    tr16.appendChild(td_color("color_background","#ffffff"));
    
    var tr17 = document.createElement('tr');
    tr17.appendChild(td_hr(4));
    
    var tr18 = document.createElement('tr');
    tr18.appendChild(td_button("get","get_camera_data_from_screen()",""));
    tr18.appendChild(td_text("screen camera view","",3));
    
    var tr19 = document.createElement('tr');
    tr19.appendChild(td_text("camera view","",2));
    tr19.appendChild(td_cbox_text_colspan("perspective_view","perspective",true,2,"center"));
    
    var tr20 = document.createElement('tr');
    tr20.appendChild(td_button("ok","refresh_lamp()","refresh scene\nbackground\nand lights"));
    tr20.appendChild(td_input("distance_view","distance"));
    tr20.appendChild(td_input("y_view","y angle degrees"));
    tr20.appendChild(td_input("z_view","z angle degrees"));
    
    
    // tr17.appendChild(td_input("length_track","track length"));
    
    // var tr18 = document.createElement('tr');
    // tr18.appendChild(td_cbox_text_colspan("cbox_track","draw track",false,2));
    // tr18.appendChild(td_color("color_track","#808080"));
    // tr18.appendChild(td_input("length_track","track length"));
    
    
    
    var tbox = [tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr9,tr10,tr11,tr14,tr15,tr16,tr17,tr18,tr19,tr20];
    for (i=0;i<tbox.length;i++) {tbody.appendChild(tbox[i]);}
    return tbody;
}
function lamp_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(lamp_gui_tbody());
    var box = document.getElementById("tab_c3");
    box.appendChild(table);
}

function id_value(id,value){
    document.getElementById(id).value=value;
}

var ids = [];
function start_data_writer(){
    var lamp_ids = [
        "intensity_ambient",
        "x_ambient","y_ambient","z_ambient",
        "intensity_directional",
        "x_directional","y_directional","z_directional",
        
        "intensity_point",
        "x_point","y_point","z_point",
        "distance_view","y_view","z_view" //tr18
    ];
    
    for (i=0;i<size_ids.length;i++){ ids.push(size_ids[i]); }
    for (i=0;i<look_ids.length;i++){ ids.push(look_ids[i]); }
    for (i=0;i<lamp_ids.length;i++){ ids.push(lamp_ids[i]); }
    
    var values = [];
    var size_values = [
        100,50,0,100, 20,40,10,20, 40,10,0,100,
        100,50,0,100, 20,40,10,20, 40,10,0,100,
        100,50,0,100, 20,40,10,20, 40,10,0,100,
        100,50,0,100, 20,40,10,20, 40,10,0,100,
        100,50,0,100, 20,40,10,20, 40,10,0,100
    ];
    var look_values = [
        "#FF8800","#2AC164","#1EA2E3",20, 1,1,1,10, 20,10,0,0,
        "#FF8800","#2AC164","#1EA2E3",20, 1,1,1,10, 20,10,0,0,
        "#FF8800","#2AC164","#1EA2E3",20, 1,1,1,10, 20,10,0,0,
        "#FF8800","#2AC164","#1EA2E3",20, 1,1,1,10, 20,10,0,0,
        "#FF8800","#2AC164","#1EA2E3",20, 1,1,1,10, 20,10,0,0
    ];
    var lamp_values = [
        
        1,
        1,1,1,
        1,
        500,500,500,
        
        0.3,
        500,500,500,
        800,45,45//tr18 lamp
    ];
    
    for (i=0;i<size_values.length;i++){ values.push(size_values[i]); }
    for (i=0;i<look_values.length;i++){ values.push(look_values[i]); }
    for (i=0;i<lamp_values.length;i++){ values.push(lamp_values[i]); }
    
    for (i=0;i<ids.length;i++){id_value(ids[i],values[i])}
}

function save_data_to_txt(){
    
    var output = "rocket creator gui data from " + Date() + " https://healingdrawing.github.io/\n";
    for (i=0;i<ids.length;i++){ output += ids[i]+" "+document.getElementById(ids[i]).value+"\n"; }
    var a = document.getElementById('GUIexport');
	
	var type = "text/plain";
	var name = "exported_rocket.txt";
	var file = new Blob([output], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}


var import_input = document.getElementById('GUIimport');
function load_data_from_txt(){ import_input.click(); }
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
scene.onDisposeObservable.add(function(){ import_input.removeEventListener('change', handleFileSelect); }) //looks like no need in my case, but added as part of example

function write_data_to_gui(text){
    console.log(text);
    text = text.split("\n");
    var oneline;
    for (i=1;i<text.length;i++){
        if (text[i]){
            oneline = text[i].split(" ");
            document.getElementById(oneline[0]).value = oneline[1];
        }
    }
    document.getElementById("info").value = "GUI loaded from " + text[0];
}

ok_gui_creator();
size_gui_creator();
look_gui_creator();
lamp_gui_creator();
start_data_writer();
showme("GuiCreator.js ready");