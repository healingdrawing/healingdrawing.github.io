var linear_start = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> \
<svg \
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
     id="defs2"> \
    <linearGradient \
       id="linearGradient885"> ';

var linear_end = ' </linearGradient> \
    <linearGradient \
       xlink:href="#linearGradient885" \
       id="linearGradient887" \
       x1="0" \
       y1="120" \
       x2="240" \
       y2="120" \
       gradientUnits="userSpaceOnUse" /> \
  </defs> \
  <metadata \
     id="metadata5"> \
    <rdf:RDF> \
      <cc:Work \
         rdf:about=""> \
        <dc:format>image/svg+xml</dc:format> \
        <dc:type \
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> \
        <dc:title></dc:title> \
      </cc:Work> \
    </rdf:RDF> \
  </metadata> \
  <rect \
     style="opacity:1;fill:url(#linearGradient887);fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:4; stroke-dasharray:none;stroke-opacity:1" \
     id="rect879" \
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

function generate_svg_preview(s){
    var stoppoints = "";
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
    document.getElementById("viewbox").innerHTML = linear_start+stoppoints+linear_end;
}