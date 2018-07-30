var preview_type = 1; //0 radial  1 linear
var stoppoints = "";

var gradient_start = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> \
\n<!-- created uses healingdrawing.github.io --> \
\n<svg \
   xmlns:dc="http://purl.org/dc/elements/1.1/" \
   xmlns:cc="http://creativecommons.org/ns#" \
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" \
   xmlns:svg="http://www.w3.org/2000/svg" \
   xmlns="http://www.w3.org/2000/svg" \
   xmlns:xlink="http://www.w3.org/1999/xlink" \
   id="svg8" \
   version="1.1" \
   viewBox="0 0 240 240" \
   height="240" \
   width="240"> \
  <defs \
     id="defs_LG"> \
    <linearGradient \
       id="LG"> ';

var gradient_end = '\n </linearGradient> ';
var linear_size = ' <linearGradient \
       xlink:href="#LG" \
       id="linearGradient" \
       x1="0" \
       y1="120" \
       x2="240" \
       y2="120" \
       gradientUnits="userSpaceOnUse" /> '
var radial_size = ' <radialGradient \
       xlink:href="#LG" \
       id="linearGradient" \
       r="120" \
       fy="120" \
       fx="120" \
       cy="120" \
       cx="120" \
       gradientUnits="userSpaceOnUse" /> '
var rect_box = ' </defs> \
  <rect \
     style="opacity:1;fill:url(#linearGradient);fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:4; stroke-dasharray:none;stroke-opacity:1" \
     id="rect4" \
     width="240" \
     height="240" \
     x="0" \
     y="0" /> \
</svg>';

function stop_color_counter(r,g,b){
    var r255=Math.round( r / 100 * 255 ).toString();
    var g255=Math.round( g / 100 * 255 ).toString();
    var b255=Math.round( b / 100 * 255 ).toString();
    return 'rgb('+r255+','+g255+','+b255+')';
}

function stop_opacity_counter(a){return (a/100).toString();}

function offset_counter(o){return (o*100).toString();}

function svg_stop_counter(r,g,b,a,o,ind){
    var stc = stop_color_counter(r,g,b);
    var opa = stop_opacity_counter(a);
    var ofs = offset_counter(o);
    var stoppoint = ' <stop offset="' + ofs + '%" style=" stop-color:' + stc + '; stop-opacity:' + opa + ';" /> ';
    
    // var stoppoint =' <stop style="stop-color:'+stc+';stop-opacity:'+opa+';" offset="'+ofs+'" id="stop'+ind+'" />';
    return stoppoint;
}

function preview_type_counter(){
    var rez;
    if (preview_type == 0){rez=radial_size;}
    if (preview_type == 1){rez=linear_size;}
    return rez;
}

function preview_type_switcher(){
    if (preview_type == 0){ preview_type = 1; }
    else if (preview_type == 1){ preview_type = 0; }
    //need add redraw on place code
    document.getElementById("viewbox").innerHTML = gradient_start + stoppoints + gradient_end + preview_type_counter() + rect_box;
}

function generate_svg_preview(s){
    stoppoints = "";
    for (var i=0;i<s.length;i++){
        var r_start = s[i]["red_start"];
        var g_start = s[i]["green_start"];
        var b_start = s[i]["blue_start"];
        var a_start = s[i]["alpha_start"];
        var o_start = s[i]["offset_start"];
        var ind_start = i.toString();
        var stpp = svg_stop_counter(r_start,g_start,b_start,a_start,o_start,ind_start);
        stoppoints +=stpp;
        
        var r_end = s[i]["red_end"];
        var g_end = s[i]["green_end"];
        var b_end = s[i]["blue_end"];
        var a_end = s[i]["alpha_end"];
        var o_end = s[i]["offset_end"];
        var ind_end = '_'+i.toString();
        var stpp = svg_stop_counter(r_end,g_end,b_end,a_end,o_end,ind_end);
        stoppoints +=stpp;
        
    }
    document.getElementById("viewbox").innerHTML = gradient_start + stoppoints + gradient_end + preview_type_counter() + rect_box;
}