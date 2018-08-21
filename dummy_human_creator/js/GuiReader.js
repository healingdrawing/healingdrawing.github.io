showme("preparing GuiReader.js");




function gui_data_reader(id){
	var rez;
	var text = document.getElementById(id).value;
	if( !(id.endsWith("_co")) ){ rez = parseFloat(text); } //number case
	else{ rez = text; } //color case
	return rez;
}
function gui_reader(){
	var d = {}; //will object with keys as dict
	var ids = [];
	for (var i=0;i<size_ids.length;i++){ ids.push( size_ids[i] ); }
	for (var i=0;i<r_pose_ids.length;i++){ ids.push( r_pose_ids[i] ); }
	for (var i=0;i<l_pose_ids.length;i++){ ids.push( l_pose_ids[i] ); }
	for (var i=0;i<ids.length;i++){ d[ids[i]] = gui_data_reader(ids[i]); }
	
	return d;
}
showme("GuiReader.js ready");
showme("ready");