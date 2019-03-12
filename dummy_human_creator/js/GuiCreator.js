showme("preparing GuiCreator.js");
//head gui section
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
    b_ok.onclick = function() {Dummy_Creator();};
    
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

//tab gui section
function td_hr(colspan = 1){
    var td = document.createElement('td');
    td.colSpan = colspan;
    td.appendChild(document.createElement('hr'));
    return td;
}
function tr_hr(colspan = 1){
    var tr = document.createElement('tr');
    tr.appendChild(td_hr(colspan));
    return tr;
}
function td_text(text, color = "", colspan = 1, title=""){
    var td = document.createElement('td');
    var style = "";
    if (color == ""){ style = "vertical-align:middle;"; }
    else{style = "vertical-align:middle;color:"+color+";";}
    td.setAttribute("style",style);
    td.innerHTML = text;
    td.colSpan = colspan;
    td.title = title;
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
        for (var i=0;i<texts.length;i++){
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
        for (var i=0;i<texts.length;i++){
            td.appendChild(text_tag(texts[i],colors[i]));
        }
    }
    return td;
}
function td_input(id, title = "",readonly = false){
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.id = id;
    input.readOnly = readonly;
    if(title != ""){input.title = title;}
    td.appendChild(input);
    return td;
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
function td_button(text, callback, title = "",bclass="b50px",colspan = 1){
    var td = document.createElement('td');
    td.colSpan = colspan;
    var btn = "<button class=\""+bclass+"\" title=\""+title+"\" onclick=\""+callback+"\">"+text+"</button>";
    td.innerHTML = btn;
    return td;
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
function td_number(id, colspan = 1, title = "",min="",max="",step="",classname=""){
    var td = document.createElement('td');
    td.colSpan = colspan;
    var input = document.createElement('input');
    input.id = id;
    input.type = "number";
    if(classname != ""){input.className = classname;}
    if(title != ""){input.title = title;}
    if(min != ""){input.min = min;}
    if(max != ""){input.max = max;}
    if(step != ""){input.step = step;}
    td.appendChild(input);
    return td;
}
function td_atext(id,href,text,colspan=1,target="_blank",title=""){
    var td = document.createElement('td');
    td.colSpan = colspan;
    var a = document.createElement('a');
    a.id = id;
    a.href = href;
    a.text = text;
    a.target = target;
    a.title = title;
    td.appendChild(a);
    return td;
}

function base_angle_section_creator(){
    var tr = document.createElement('tr');
    tr.appendChild(td_text("base angle","",1,"degrees"));
    tr.appendChild(td_number("base_angle",1,"base_angle dummy horizontal angle","-180","180","30","b100px"));
    return tr;
}
function size_description_section_creator(){
    var tr_big = document.createElement('tr');
    var text = [["long&#8691;","fat&#8691;"],["long&#8681;","fat&#8681;"]];
    for (var i=0;i<2;i++){
        var td_big = document.createElement('td');
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        var tr = document.createElement('tr');
        var td = td_text(text[i][0]); tr.appendChild(td);
        var td = td_text(text[i][1]); tr.appendChild(td);
        tbody.appendChild(tr); table.appendChild(tbody);
        td_big.appendChild(table); tr_big.appendChild(td_big);
    }
    return tr_big;
}
/**head+ section return td(table inside td) */
function size_head_plus_section_creator(){
    var td_big = document.createElement('td');
    //h + base
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("head&#8597;"));
    tr.appendChild(td_text("head&oplus;"));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    var n = "head_height";
    var td = td_number(n,1,n);
    tr.appendChild(td);
    var n = "head_axis";
    var title = "head_axis displacement from center between back(-1) and face(1)"
    var td = td_number(n,1,title,"-1","1","0.5");
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    td_big.appendChild(table);
    return td_big;
}
function size_shoulders_section_creator(){
    var td_big = document.createElement('td');
    
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("shoulders","",2));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    var n = "shoulders_bend";
    var title = "shoulders_bend from back(-1) to face(1)";
    var td = td_number(n,1,title,"-1","1","0.5");
    tr.appendChild(td);
    var n = "shoulders_width";
    var td = td_number(n,1,n);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    
    td_big.appendChild(table);
    return td_big;
}
function size_body_section_creator(){
    var td_big = document.createElement('td');
    
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("<br>body","",2));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    var n = "body_length";
    var title = "body_length - 8...17 vertebra from neck to down";
    var td = td_number(n,1,title,"8","17","1");
    tr.appendChild(td);
    var n = "body_width";
    var title = "body_width - front direction chest size";
    var td = td_number(n,1,title);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    
    td_big.appendChild(table);
    return td_big;
}
function size_foot_section_creator(){
    var td_big = document.createElement('td');
    
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("<br>foot","",2));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    var n = "foot_length";
    var title = "foot_length";
    var td = td_number(n,1,title,"0");
    tr.appendChild(td);
    var n = "foot_width";
    var title = "foot_width - up direction foot size(side foot width = shin_width)";
    var td = td_number(n,1,title);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    
    td_big.appendChild(table);
    return td_big;
}
function size_standart_element_table_creator(name,nobr = false){
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    if(!nobr){ tr.appendChild(td_text("<br>"+name,"",2)); }
    else{ tr.appendChild(td_text(name,"",2)); }
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    var n = name+"_length";
    var td = td_number(n,1,n);
    tr.appendChild(td);
    var n = name +"_width";
    var td = td_number(n,1,n);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    return table;
}
var size_ids=[
    "head_length","head_width","head_height","head_axis",
    "neck_length", "neck_width",
    "arm_length", "arm_width",
    "palm_length", "palm_width",
    "hip_length", "hip_width",
    "shin_length", "shin_width",
    "back_length", "back_width",
    "ass_length", "ass_width",
    
    "shoulders_bend","shoulders_width",
    "body_length", "body_width",
    "foot_length", "foot_width"
];
function size_gui_tbody(){
    var tbody = document.createElement('tbody');
    tbody.appendChild(base_angle_section_creator());//base angle
    tbody.appendChild(size_description_section_creator());// text and arrows
    //create other block ... standart structure elements
    var tnames = ["head","neck","arm","palm","hip","shin","back","ass"];
    for (var i = 0;i<tnames.length;i++){
        if(!(i%2)){ tr= document.createElement('tr'); }
        if(i<2){var nobr = true;}else{var nobr = false;}
        var td = document.createElement('td');
        td.appendChild(size_standart_element_table_creator(tnames[i],nobr));
        tr.appendChild(td);
        if(i%2){ tbody.appendChild(tr); }
    }
    
    //none standart elements
    tbody.appendChild(tr_hr(2)); //separetor
    var tr = document.createElement('tr');
    //create head+ block + L W L W header later
    tr.appendChild(size_head_plus_section_creator());
    //create shoulders block, need unique title for shoulders displacement
    tr.appendChild(size_shoulders_section_creator());
    tbody.appendChild(tr);
    //body
    var tr = document.createElement('tr');
    tr.appendChild(size_body_section_creator());
    //foot
    tr.appendChild(size_foot_section_creator());
    tbody.appendChild(tr);
    //save load separated buttons
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement("tr");
    var td = td_button("save size","save_size()","","b100px",);
    tr.appendChild(td);
    var td = td_button("load size","load_size()","","b100px",);
    tr.appendChild(td); tbody.appendChild(tr);
    
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement("tr");
    var td = td_button("save pose","save_pose()","","b100px",);
    tr.appendChild(td);
    var td = td_button("load pose","load_pose()","","b100px",);
    tr.appendChild(td); tbody.appendChild(tr);
    
    return tbody;
}
function size_gui_creator(){
    var table = document.createElement('table');
    table.style.width = "260px";
    table.appendChild(size_gui_tbody());
    var box = document.getElementById("tab_c1");
    box.appendChild(table);
}

var r_pose_ids=[
    "r_shoulder_fa","r_shoulder_sa","r_shoulder_ta","r_shoulder_co",
    "r_elbow_fa","r_elbow_ta","r_elbow_co",
    "r_palm_sa","r_palm_co",
    "r_hip_fa","r_hip_sa","r_hip_ta","r_hip_co",
    "r_shin_fa","r_shin_co",
    "r_foot_fa","r_foot_co",
    "back_fa","back_sa","back_ta","back_co",
    "head_co"
];
var l_pose_ids=[
    "l_shoulder_fa","l_shoulder_sa","l_shoulder_ta","l_shoulder_co",
    "l_elbow_fa","l_elbow_ta","l_elbow_co",
    "l_palm_sa","l_palm_co",
    "l_hip_fa","l_hip_sa","l_hip_ta","l_hip_co",
    "l_shin_fa","l_shin_co",
    "l_foot_fa","l_foot_co",
    "neck_fa","neck_sa","neck_ta","neck_co",
    "body_co"
];
function r_pose_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("right side pose","",4));
    tbody.appendChild(tr);
    //description
    var tr = document.createElement('tr');
    tr.appendChild(td_text("fa&#8681;","",1,"front angle"));
    tr.appendChild(td_text("sa&#8681;","",1,"side angle"));
    tr.appendChild(td_text("ta&#8681;","",1,"twist angle"));
    tr.appendChild(td_text("co&#8681;","",1,"color"));
    tbody.appendChild(tr);
    
    //shoulder
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("shoulder","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("r_shoulder_fa",1,"r_shoulder_fa","-90","180","10"));
    tr.appendChild(td_number("r_shoulder_sa",1,"r_shoulder_sa","-90","90","10"));
    tr.appendChild(td_number("r_shoulder_ta",1,"r_shoulder_ta","-90","90","10"));
    tr.appendChild(td_color("r_shoulder_co","#fe0000"));
    tbody.appendChild(tr);
    
    //elbow
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("elbow","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("r_elbow_fa",1,"r_elbow_fa","-180","180","10"));
    tr.appendChild(td_text("elbow"));
    tr.appendChild(td_number("r_elbow_ta",1,"r_elbow_ta","-90","90","10"));
    tr.appendChild(td_color("r_elbow_co","#febf00"));
    tbody.appendChild(tr);
    
    //palm
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("palm","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_text("palm"));
    tr.appendChild(td_number("r_palm_sa",1,"r_palm_sa","-90","90","10"));
    tr.appendChild(td_text(""));
    tr.appendChild(td_color("r_palm_co","#7efe00"));
    tbody.appendChild(tr);
    
    //hip
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("hip","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("r_hip_fa",1,"r_hip_fa","-135","135","15"));
    tr.appendChild(td_number("r_hip_sa",1,"r_hip_sa","-45","90","10"));
    tr.appendChild(td_number("r_hip_ta",1,"r_hip_ta","-45","45","15"));
    tr.appendChild(td_color("r_hip_co","#00fe42"));
    tbody.appendChild(tr);
    
    //shin
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("shin","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("r_shin_fa",1,"r_shin_fa","-135","135","15"));
    tr.appendChild(td_text("shin","",2));
    // tr.appendChild(td_text(""));
    tr.appendChild(td_color("r_shin_co","#00fbfe"));
    tbody.appendChild(tr);
    
    //foot
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("foot","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("r_foot_fa",1,"r_foot_fa","-90","90","10"));
    tr.appendChild(td_text("foot","",2));
    // tr.appendChild(td_text(""));
    tr.appendChild(td_color("r_foot_co","#003cfe"));
    tbody.appendChild(tr);
    
    //back
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("back","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("back_fa",1,"back_fa","-180","180","10"));
    tr.appendChild(td_number("back_sa",1,"back_sa","-90","90","10"));
    tr.appendChild(td_number("back_ta",1,"back_ta from right(-90) to left(90)","-90","90","10"));
    tr.appendChild(td_color("back_co","#8300fe"));
    tbody.appendChild(tr);
    
    //head color
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("head color","",3));
    tr.appendChild(td_color("head_co","#fe00b9"));
    tbody.appendChild(tr);
    
    //named pose
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_button("named pose","load_named_pose()","load named pose","b100px",2));
    tr.appendChild(td_number("pose_number",2,"pose_number","0","","1","b100px"));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_atext("named_pose_help","named_pose_help.html","named pose help",4));
    tbody.appendChild(tr);
    
    return tbody;
}
function l_pose_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.appendChild(td_text("left side pose","",4));
    tbody.appendChild(tr);
    //description
    var tr = document.createElement('tr');
    tr.appendChild(td_text("fa&#8681;","",1,"front angle"));
    tr.appendChild(td_text("sa&#8681;","",1,"side angle"));
    tr.appendChild(td_text("ta&#8681;","",1,"twist angle"));
    tr.appendChild(td_text("co&#8681;","",1,"color"));
    tbody.appendChild(tr);
    
    //shoulder
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("shoulder","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("l_shoulder_fa",1,"l_shoulder_fa","-90","180","10"));
    tr.appendChild(td_number("l_shoulder_sa",1,"l_shoulder_sa","-90","90","10"));
    tr.appendChild(td_number("l_shoulder_ta",1,"l_shoulder_ta","-90","90","10"));
    tr.appendChild(td_color("l_shoulder_co","#fe6000"));
    tbody.appendChild(tr);
    
    //elbow
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("elbow","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("l_elbow_fa",1,"l_elbow_fa","-180","180","10"));
    tr.appendChild(td_text("elbow"));
    tr.appendChild(td_number("l_elbow_ta",1,"l_elbow_ta","-90","90","10"));
    tr.appendChild(td_color("l_elbow_co","#ddfe00"));
    tbody.appendChild(tr);
    
    //palm
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("palm","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_text("palm"));
    tr.appendChild(td_number("l_palm_sa",1,"l_palm_sa","-90","90","10"));
    tr.appendChild(td_text(""));
    tr.appendChild(td_color("l_palm_co","#1efe00"));
    tbody.appendChild(tr);
    
    //hip
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("hip","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("l_hip_fa",1,"l_hip_fa","-135","135","15"));
    tr.appendChild(td_number("l_hip_sa",1,"l_hip_sa","-45","90","10"));
    tr.appendChild(td_number("l_hip_ta",1,"l_hip_ta","-45","45","15"));
    tr.appendChild(td_color("l_hip_co","#00fea1"));
    tbody.appendChild(tr);
    
    //shin
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("shin","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("l_shin_fa",1,"l_shin_fa","-135","135","15"));
    tr.appendChild(td_text("shin","",2));
    // tr.appendChild(td_text(""));
    tr.appendChild(td_color("l_shin_co","#009bfe"));
    tbody.appendChild(tr);
    
    //foot
    tbody.appendChild(tr_hr(4));
    // var tr = document.createElement('tr');
    // tr.appendChild(td_text("foot","",4));
    // tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("l_foot_fa",1,"l_foot_fa","-90","90","10"));
    tr.appendChild(td_text("foot","",2));
    // tr.appendChild(td_text(""));
    tr.appendChild(td_color("l_foot_co","#2400fe"));
    tbody.appendChild(tr);
    
    //neck
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("neck","",4));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_number("neck_fa",1,"neck_fa","-90","90","10"));
    tr.appendChild(td_number("neck_sa",1,"neck_sa","-90","90","10"));
    tr.appendChild(td_number("neck_ta",1,"neck_ta from right(-90) to left(90)","-90","90","10"));
    tr.appendChild(td_color("neck_co","#e300fe"));
    tbody.appendChild(tr);
    
    //body color
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_text("body color","",3));
    tr.appendChild(td_color("body_co","#fe005a"));
    tbody.appendChild(tr);
    
    //named size
    tbody.appendChild(tr_hr(4));
    var tr = document.createElement('tr');
    tr.appendChild(td_button("named size","load_named_size()","load named size","b100px",2));
    tr.appendChild(td_number("size_number",2,"size_number","0","","1","b100px"));
    tbody.appendChild(tr);
    
    var tr = document.createElement('tr');
    tr.appendChild(td_atext("named_size_help","named_size_help.html","named size help",4));
    tbody.appendChild(tr);
    
    return tbody;
}
function pose_gui_creator(){
    var table = document.createElement('table');
    table.style.width = "260px";
    table.appendChild(r_pose_gui_tbody());
    var box = document.getElementById("tab_c2");
    box.appendChild(table);
    
    var table = document.createElement('table');
    table.style.width = "260px";
    table.appendChild(l_pose_gui_tbody());
    var box = document.getElementById("tab_c3");
    box.appendChild(table);
    
}


function lamp_gui_tbody(){
    var tbody = document.createElement('tbody');
    
    
    var tr0 = document.createElement('tr');
    tr0.appendChild(td_text("export resolution","",2,"PNG export box side size px"));
    tr0.appendChild(td_number("export_resolution",2,"px","200","","200","b100px"));
    tbody.appendChild(tr0);
    
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
    tr6.appendChild(td_cbox_text_colspan("cbox_directional","directional",false,2,"left","from (0,0,0) to (x,y,z)"));
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
    
    var tr15 = document.createElement('tr');//used bottom to separate buttons
    tr15.appendChild(td_hr(4));
    
    var tr16 = document.createElement('tr');
    tr16.appendChild(td_cbox_text_colspan("transperent","png no background",true,3));
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
    
    var tr21 = document.createElement('tr');
    tr21.appendChild(td_hr(4));
    
    var tr22 = document.createElement('tr');
    tr22.appendChild(td_button("R&#8680;L","copy_pose_right_to_left()","copy right side pose to left","b50px"));
    tr22.appendChild(td_button("&#11012;","copy_pose_switch_side()","switch side pose","b50px"));
    tr22.appendChild(td_button("L&#8680;R","copy_pose_left_to_right()","copy left side pose to right","b50px"));
    tr22.appendChild(td_button("eset","copy_pose_reset()","reset pose","b50px"));
    
    var tr23 = document.createElement('tr');
    tr23.appendChild(td_button("run","run_step()","run steps frame by frame","b50px"));
    tr23.appendChild(td_button("walk","walk_step()","walk steps frame by frame","b50px"));
    tr23.appendChild(td_button("jump","jump_step()","jump steps frame by frame","b50px"));
    tr23.appendChild(td_input("view_step","step number",true));
    
    // tr17.appendChild(td_input("length_track","track length"));
    
    // var tr18 = document.createElement('tr');
    // tr18.appendChild(td_cbox_text_colspan("cbox_track","draw track",false,2));
    // tr18.appendChild(td_color("color_track","#808080"));
    // tr18.appendChild(td_input("length_track","track length"));
    
    
    
    var tbox = [tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr9,tr10,tr11,tr14,tr16,tr17,tr18,tr19,tr20,tr21,tr22,tr15,tr23];
    for (i=0;i<tbox.length;i++) {tbody.appendChild(tbox[i]);}
    return tbody;
}
function lamp_gui_creator(){
    var table = document.createElement('table');
    table.style.width = "260px";
    table.appendChild(lamp_gui_tbody());
    var box = document.getElementById("tab_c4");
    box.appendChild(table);
}

function id_value(id,value){
    document.getElementById(id).value=value;
}

var ids = [];
function start_data_writer(){
    var lamp_ids = [
        "export_resolution",
        "intensity_ambient","color_ambient",
        "x_ambient","y_ambient","z_ambient","color_ground_ambient",
        
        "intensity_directional","color_directional",
        "x_directional","y_directional","z_directional",
        
        "intensity_point","color_point",
        "x_point","y_point","z_point",
        "color_background",
        "distance_view","y_view","z_view"
    ];
    
    ids.push("base_angle")
    for (var i=0;i<size_ids.length;i++){ ids.push(size_ids[i]); }
    for (var i=0;i<r_pose_ids.length;i++){ ids.push(r_pose_ids[i]); }
    for (var i=0;i<l_pose_ids.length;i++){ ids.push(l_pose_ids[i]); }
    for (var i=0;i<lamp_ids.length;i++){ ids.push(lamp_ids[i]); }
    
    var values = [];
    var size_values = [
        0,//base angle
        4,3,4,-0.5,//head
        4,2, //neck
        12,2, //arm
        4,2, //palm
        9,4, //hip
        9,3, //shin
        9,10, //back
        0.8,4, //ass
        
        -1,10, //shoulders
        12,3, //body
        5,3 //foot
        
    ];
    var r_pose_values = [
        0,0,0,"#fe0000", //shoulder
        0,0,"#febf00", //elbow
        0,"#7efe00", //palm
        0,0,0,"#00fe42", //hip
        0,"#00fbfe", //shin
        0,"#003cfe", //foot
        0,0,0,"#8300fe", //back
        "#fe00b9" //head
    ];
    var l_pose_values = [
        0,0,0,"#fe6000", //shoulder
        0,0,"#ddfe00", //elbow
        0,"#1efe00", //palm
        0,0,0,"#00fea1", //hip
        0,"#009bfe", //shin
        0,"#2400fe", //foot
        0,0,0,"#e300fe", //neck
        "#fe005a" //body
    ];
    var lamp_values = [
        800,
        
        1,"#FFFFFF",
        1,1,1,"#000000",
        
        1,"#FFFFFF",
        500,500,500,
        
        0.3,"#FFFFFF",
        500,500,500,
        "#FFFFFF",
        100,45,45//tr18 lamp
    ];
    
    for (var i=0;i<size_values.length;i++){ values.push(size_values[i]); }
    for (var i=0;i<r_pose_values.length;i++){ values.push(r_pose_values[i]); }
    for (var i=0;i<l_pose_values.length;i++){ values.push(l_pose_values[i]); }
    for (var i=0;i<lamp_values.length;i++){ values.push(lamp_values[i]); }
    
    for (var i=0;i<ids.length;i++){id_value(ids[i],values[i])}
}

//full data save load
function save_data_to_txt(){
    var date = Date();
    var output = "dummy human creator gui data from " + date + " https://healingdrawing.github.io/\n";
    for (var i=0;i<ids.length;i++){ output += ids[i]+" "+document.getElementById(ids[i]).value+"\n"; }
    var a = document.getElementById('GUIexport');
	
	var type = "text/plain";
	var name = "exported_dummy_human_"+date+".txt";
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
    for (var i=1;i<text.length;i++){
        if (text[i]){
            oneline = text[i].split(" ");
            document.getElementById(oneline[0]).value = oneline[1];
        }
    }
    delay_refresh();
    document.getElementById("info").value = "GUI loaded from " + text[0];
}

//size data save load
function save_size(){
    var date = Date();
    var output = "dummy human creator size data from " + date + " https://healingdrawing.github.io/\n";
    for (var i=0;i<size_ids.length;i++){ output += size_ids[i]+" "+document.getElementById(size_ids[i]).value+"\n"; }
    var a = document.getElementById('SIZEexport');
	
	var type = "text/plain";
	var name = "exported_dummy_human_size_"+date+".txt";
	var file = new Blob([output], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}

var import_input_size = document.getElementById('SIZEimport');
function load_size(){ import_input_size.click(); }
var handleFileSelect_size = function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) { 
        write_size_to_gui(reader.result);
    };
    reader.readAsText(files[0]);
    // console.log(reader.result);
}
import_input_size.addEventListener('change', handleFileSelect_size, false);
import_input_size.value = "";
scene.onDisposeObservable.add(function(){ import_input_size.removeEventListener('change', handleFileSelect_size); }) //looks like no need in my case, but added as part of example

function write_size_to_gui(text){
    console.log(text);
    text = text.split("\n");
    var oneline;
    for (var i=1;i<text.length;i++){
        if (text[i]){
            oneline = text[i].split(" ");
            document.getElementById(oneline[0]).value = oneline[1];
        }
    }
    delay_refresh();
    document.getElementById("info").value = "SIZE loaded from " + text[0];
}

//pose data save load
var pose_ids = [];
pose_ids.push("base_angle")
for (var i=0;i<r_pose_ids.length;i++){ pose_ids.push(r_pose_ids[i]); }
for (var i=0;i<l_pose_ids.length;i++){ pose_ids.push(l_pose_ids[i]); }

function save_pose(){
    var date = Date();
    var output = "dummy human creator pose data from " + date + " https://healingdrawing.github.io/\n";
    for (var i=0;i<pose_ids.length;i++){ output += pose_ids[i]+" "+document.getElementById(pose_ids[i]).value+"\n"; }
    var a = document.getElementById('POSEexport');
	
	var type = "text/plain";
	var name = "exported_dummy_human_pose_"+date+".txt";
	var file = new Blob([output], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}

var import_input_pose = document.getElementById('POSEimport');
function load_pose(){ import_input_pose.click(); }
var handleFileSelect_pose = function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function(e) { 
        write_pose_to_gui(reader.result);
    };
    reader.readAsText(files[0]);
    // console.log(reader.result);
}
import_input_pose.addEventListener('change', handleFileSelect_pose, false);
import_input_pose.value = "";
scene.onDisposeObservable.add(function(){ import_input_pose.removeEventListener('change', handleFileSelect_pose); }) //looks like no need in my case, but added as part of example

function write_pose_to_gui(text){
    console.log(text);
    text = text.split("\n");
    var oneline;
    for (var i=1;i<text.length;i++){
        if (text[i]){
            oneline = text[i].split(" ");
            document.getElementById(oneline[0]).value = oneline[1];
        }
    }
    delay_refresh();
    document.getElementById("info").value = "POSE loaded from " + text[0];
}


var r_pose_nocolors_ids=[
    "r_shoulder_fa","r_shoulder_sa","r_shoulder_ta",
    "r_elbow_fa","r_elbow_ta",
    "r_palm_sa",
    "r_hip_fa","r_hip_sa","r_hip_ta",
    "r_shin_fa",
    "r_foot_fa"
];
var l_pose_nocolors_ids=[
    "l_shoulder_fa","l_shoulder_sa","l_shoulder_ta",
    "l_elbow_fa","l_elbow_ta",
    "l_palm_sa",
    "l_hip_fa","l_hip_sa","l_hip_ta",
    "l_shin_fa",
    "l_foot_fa"
];
function copy_pose_switch_side(){
    var l_val=[];
    var r_val=[];
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        l_val.push(document.getElementById(l_pose_nocolors_ids[i]).value);
        r_val.push(document.getElementById(r_pose_nocolors_ids[i]).value);
    }//read data complete
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        document.getElementById(l_pose_nocolors_ids[i]).value = r_val[i];
        document.getElementById(r_pose_nocolors_ids[i]).value = l_val[i];
    }//pose switched
    delay_refresh();
    showme("switch side pose complete");
}

function copy_pose_left_to_right(){
    var l_val=[];
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        l_val.push(document.getElementById(l_pose_nocolors_ids[i]).value);
    }//read data complete
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        document.getElementById(r_pose_nocolors_ids[i]).value = l_val[i];
    }//pose switched
    delay_refresh();
    showme("copy left side pose to right complete");
}

function copy_pose_right_to_left(){
    var r_val=[];
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        r_val.push(document.getElementById(r_pose_nocolors_ids[i]).value);
    }//read data complete
    for (var i=0;i<r_pose_nocolors_ids.length;i++){
        document.getElementById(l_pose_nocolors_ids[i]).value = r_val[i];
    }//pose switched
    delay_refresh();
    showme("copy right side pose to left complete");
}

var r_pose_reset_ids=[
    "r_shoulder_fa","r_shoulder_sa","r_shoulder_ta",
    "r_elbow_fa","r_elbow_ta",
    "r_palm_sa",
    "r_hip_fa","r_hip_sa","r_hip_ta",
    "r_shin_fa",
    "r_foot_fa",
    "back_fa","back_sa","back_ta"
];
var l_pose_reset_ids=[
    "l_shoulder_fa","l_shoulder_sa","l_shoulder_ta",
    "l_elbow_fa","l_elbow_ta",
    "l_palm_sa",
    "l_hip_fa","l_hip_sa","l_hip_ta",
    "l_shin_fa",
    "l_foot_fa",
    "neck_fa","neck_sa","neck_ta"
];
var r_pose_reset_values = [
    0,0,0,
    0,0,
    0,
    0,0,0,
    0,
    0,
    0,0,0
];
var l_pose_reset_values = [
    0,0,0,
    0,0,
    0,
    0,0,0,
    0,
    0,
    0,0,0
];
function copy_pose_reset(){
    for (var i=0;i<r_pose_reset_ids.length;i++){
        document.getElementById(r_pose_reset_ids[i]).value = r_pose_reset_values[i];
        document.getElementById(l_pose_reset_ids[i]).value = l_pose_reset_values[i];
    }
    delay_refresh();
    showme('reset pose complete');
}

ok_gui_creator();
size_gui_creator();
pose_gui_creator();
lamp_gui_creator();
start_data_writer();
showme("GuiCreator.js ready");