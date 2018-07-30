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
}