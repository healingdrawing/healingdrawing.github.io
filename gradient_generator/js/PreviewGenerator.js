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
   viewBox="0 0 238 238" \
   height="238" \
   width="238"> \
  <defs \
     id="defs_LG"> \
    <linearGradient \
       id="LG"> ';

var gradient_end = '\n </linearGradient> ';
var linear_size = ' <linearGradient \
       xlink:href="#LG" \
       id="linearGradient" \
       x1="0" \
       y1="119" \
       x2="238" \
       y2="119" \
       gradientUnits="userSpaceOnUse" /> '
var radial_size = ' <radialGradient \
       xlink:href="#LG" \
       id="linearGradient" \
       r="119" \
       fy="119" \
       fx="119" \
       cy="119" \
       cx="119" \
       gradientUnits="userSpaceOnUse" /> '
var rect_box = ' </defs> \
  <rect \
     style="opacity:1;fill:url(#linearGradient);fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:4; stroke-dasharray:none;stroke-opacity:1" \
     id="rect4" \
     width="238" \
     height="238" \
     x="0" \
     y="0" /> \
</svg>';

function stop_color_counter(r,g,b){
    var r255=Math.round( r ).toString();
    var g255=Math.round( g ).toString();
    var b255=Math.round( b ).toString();
    return 'rgb('+r255+','+g255+','+b255+')';
}

function stop_opacity_counter(a){return (a/255).toString();}

function offset_counter(o){return o.toString();}

function svg_stop_counter(r,g,b,a,o,ind){
    var stc = stop_color_counter(r,g,b);
    var opa = stop_opacity_counter(a);
    var ofs = offset_counter(o);
    var stoppoint = ' <stop offset="' + ofs + '%" style=" stop-color:' + stc + '; stop-opacity:' + opa + ';" id="stop'+ind+'" /> ';
    
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
    showme("preview type switched");
}

function rgb_limiter(rgb){
    var rez = rgb;
    if (rez >= 255){ rez = 255; } else if(rez < 0){ rez = 0; }
    return rez;
}
function offset_limiter(offset,ind=-1){
    var rez = offset;
    if (rez > 100){ rez = 100; } else if(rez < 0){ rez = 0; }
    return rez;
}
function alpha_limiter(alpha,ind=-1){
    var rez = alpha;
    if (rez >= 255){ rez = 255; } else if(rez < 0){ rez = 0; }
    return rez;
}

function generate_svg_preview(s){
    stoppoints = "";
    for (var i=0;i<s.length;i++){
        var r_start = rgb_limiter( s[i]["red_start"] );
        var g_start = rgb_limiter( s[i]["green_start"] );
        var b_start = rgb_limiter( s[i]["blue_start"] );
        var a_start = alpha_limiter( s[i]["alpha_start"], i );
        var o_start = offset_limiter( s[i]["offset_start"], i );
        
        var ind_start = i.toString();
        var stpp = svg_stop_counter(r_start,g_start,b_start,a_start,o_start,ind_start);
        stoppoints +=stpp;
        
        var r_end = rgb_limiter( s[i]["red_end"] );
        var g_end = rgb_limiter( s[i]["green_end"] );
        var b_end = rgb_limiter( s[i]["blue_end"] );
        var a_end = alpha_limiter( s[i]["alpha_end"], i );
        var o_end = offset_limiter( s[i]["offset_end"], i );
        var ind_end = '_'+i.toString();
        var stpp = svg_stop_counter(r_end,g_end,b_end,a_end,o_end,ind_end);
        stoppoints +=stpp;
        
    }
    document.getElementById("viewbox").innerHTML = gradient_start + stoppoints + gradient_end + preview_type_counter() + rect_box;
}