showme("preparing GuiReader.js");


function max_length(d){
	var rez = 0;
	for (i=1;i<6;i++){
		rez += d[i][0];
	}
	return rez;
}
function max_radius(d){
	var base_r = [];
	var tail_r = [];
	var ring_r = [];
	for (i=1;i<6;i++){
		base_r.push( d[i][1] * 2 );
		tail_r.push( (d[i][3]+d[i][9]) * 2 ); //*2 because mirror around
		ring_r.push( d[i][11]*2 + d[i][19] ); //ring_r *2 + ring_width
		
	}
	var rez = Math.max(
		geo.maxabs(base_r),geo.maxabs(tail_r),geo.maxabs(ring_r)
	);
	return rez;
}
function scale_counter(d){
	var scale = geo.maxabs([max_length(d),max_radius(d)]);
	scale = maxsize / scale;
	return scale;
}
function rescale_numbers(d,s){
	var sind = [0,1,3,4,5,6,7,8,9,10,11,15,19,20,21,23];
	for (i=1;i<6;i++){
		for (ii=0;ii<sind.length;ii++){ d[i][sind[ii]] *= s; }
	}
	return d;
}

//new code
function gui_data_reader(){
	var d = [[],[],[],[],[],[]];
	//ids section 1...5 splitter
	var section_ids = [[],[],[],[],[],[]]; //0 lamp tab sizes ... 1-5 sections sizes
	for (i=0;i<ids.length;i++){
		var id = ids[i];
		if ( id.endsWith("_1") ){ section_ids[1].push(id); }
		else if ( id.endsWith("_2") ){ section_ids[2].push(id); }
		else if ( id.endsWith("_3") ){ section_ids[3].push(id); }
		else if ( id.endsWith("_4") ){ section_ids[4].push(id); }
		else if ( id.endsWith("_5") ){ section_ids[5].push(id); }
		else { section_ids[0].push(id); }
	}
	//value reader depend of input type
	for (i=0;i<section_ids.length;i++){
		var section_id_list = section_ids[i]; //get the section
		for (ii=0;ii<section_id_list.length;ii++){
			var id = section_id_list[ii]; //get the id of section
			if ( id.startsWith("color") ) { d[i].push( document.getElementById(id).value ); }
			else{ d[i].push( parseFloat(document.getElementById(id).value) ); }
		}
	}
	// console.log(JSON.stringify(section_ids));
	// console.log(JSON.stringify(d));
	return d;
}
function gui_reader(){
	var d = gui_data_reader();
	
	var scale = scale_counter(d);
	var d = rescale_numbers(d,scale);
	// sizes collected and rescaled
	// console.log("scale = "+scale);
	// console.log(JSON.stringify(d));
	return d;
}
showme("GuiReader.js ready");
showme("ready");