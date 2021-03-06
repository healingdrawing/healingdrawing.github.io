function get_date_time(){
    var d = new Date() ;
    var ds = d.getFullYear().toString();
    ds +="_" + (d.getMonth()+1).toString();
    ds +="_" + d.getDate().toString();
    ds +="__" + d.getHours().toString();
    ds +="_" + d.getMinutes().toString();
    ds +="_" + d.getSeconds().toString();
    return ds;
}

function exportSVG(){
    var a = document.getElementById('SVGexport');
	var text = gradient_start + stoppoints + gradient_end + preview_type_counter() + rect_box;
    var type = "image/svg+xml";
    var name = "gradient-"+get_date_time()+".svg";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
    a.click();
    showme("SVG exported to " + name);
}

function ggr_segment_generator(gs, last_point){
    // original 8 symbols by float number but i try not cut result first
    var base = 255;
    var segment = "";
    var of_s = gs["offset_start"] / 100;
    if( !last_point ) { var of_e = gs["offset_end"] / 100; } else { var of_e = 1; } // gimp loader fail sometimes when 100/100 = 0.999...9
    var of_m = of_s + (of_e - of_s) / 2;
    var red_s = gs["red_start"] / base;
    var green_s = gs["green_start"] / base;
    var blue_s = gs["blue_start"] / base;
    var alpha_s = gs["alpha_start"] / base;
    var red_e = gs["red_end"] / base;
    var green_e = gs["green_end"] / base;
    var blue_e = gs["blue_end"] / base;
    var alpha_e = gs["alpha_end"] / base;
    var box = [of_s,of_m,of_e,red_s,green_s,blue_s,alpha_s,red_e,green_e,blue_e,alpha_e,0,0,0];
    for (var i=0;i<box.length;i++){
        var x = box[i];
        if (!(x<1)){x=1;} //was crush sometimes when 100/100 = 1.000000...2 and GIMP gradient loader fail
        segment += x.toString() + " ";
    }
    segment += "0"; //last parameter without space before
    return segment;
}
function ggr_generator(){
    var ggr = "GIMP Gradient from healingdrawing.github.io";
    ggr += "\nName: "+ get_date_time();
    var gs_num = gradient_steps.length;
    ggr += "\n" + gs_num.toString();
    var segments = "";
    for (var i=0;i<gs_num;i++){
        if( i < gs_num - 1 ) { segments += "\n" + ggr_segment_generator(gradient_steps[i], false); }
        else{ segments += "\n" + ggr_segment_generator(gradient_steps[i], true); }
    }segments += "\n" // start empty line
    ggr += segments;
    return ggr;
}
function exportGGR(){
    var a = document.getElementById('GGRexport');
	var text = ggr_generator();
    var type = "text/plain";
    var name = "gradient-"+get_date_time()+".ggr";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
    a.click();
    showme("GGR exported to " + name);
}

function exportGUI(){
    var a = document.getElementById('GGRexport');
    var d = get_gui_values_as_object();
    var text = JSON.stringify(d);
    var type = "application/json";
    var name = "gui-gradient-"+get_date_time()+".json";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
    a.click();
    showme("GUI exported to " + name);
}

function exportSEED(){
    var a = document.getElementById('SEEDexport');
    var d = get_gui_values_as_object();
    var text = JSON.stringify(gradient_steps);
    var type = "application/json";
    var name = "seed-gradient-"+get_date_time()+".json";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
    a.click();
    showme("SEED exported to " + name);
}