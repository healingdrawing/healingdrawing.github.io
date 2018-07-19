showme("preparing Rocket_RandomCreator.js");

function rocket_random_base(n,full=false){
	var sn = n.toString();
	var ids = ["base_length_"+sn,"base_radius_"+sn,"base_curvature%_"+sn];
	var min = 100;
	var max = 200;
	var b_l = random_int(min,max);
	var b_r = random_int(min,b_l/5);
	var b_c = random_int(0,100);
	var vals = [b_l,b_r,b_c];
	// console.log("vals",vals,"ids",ids);
	for (var i=0;i<ids.length;i++){ id_value(ids[i],vals[i]); }
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_tail(n,full=false){
	var sn = n.toString();
	var ids = [
		"tail_radius_","tail_start_offset_","tail_start_length_","tail_end_offset_","tail_end_length_",
		"tail_start_width_","tail_end_width_","tail_number_",
		"ring_radius_","ring_length_","ring_width_","ring_offset_"
	];
	for (var i = 0; i< ids.length;i++){ ids[i]+=sn; }
	var min = 100;
	var max = 200;
	var tr = random_int(min,max);
	var rr = random_int(min,tr);
	var tsl = random_int(tr/4,tr/2);
	var tso = random_int(0,tr / 2);
	var teo = random_int(0,tso);
	var tel = random_int(tr/4,tsl);
	var rl = random_int(tr/4,tel);
	var tsw = random_int(4,max / 10);
	var tew = random_int(4,max / 10);
	var rw = random_int(Math.min(tew,tsw),Math.max(tew,tsw));
	var dof = (tso-teo)/2;
	var ro = random_int(-dof,dof);
	var tn = random_int(1,11);
	var vals = [tr,tso,tsl,teo,tel,tsw,tew,tn,rr,rl,rw,ro];
	// console.log("vals",vals,"ids",ids);
	for (var i=0;i<ids.length;i++){ id_value(ids[i],vals[i]); }
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_botl(n,full=false){
	var sn = n.toString();
	var ids = ["bottle_length_","bottle_radius_","bottle_offset_","ring_width_","tail_end_length_","tail_end_width_"];
	for (var i = 0; i< ids.length;i++){ ids[i]+=sn; }
	
	var rw = parseFloat(document.getElementById(ids[3]).value);
	var tel = parseFloat(document.getElementById(ids[4]).value);
	var tew = parseFloat(document.getElementById(ids[5]).value);
	
	var b_l = random_int(tel,tel*3);
	var dbo = (b_l / 2 - tel / 2);
	
	var b_o = random_int(-dbo,dbo);
	
	var b_r = random_int(Math.min(tew,rw) / 2,Math.max(tew,rw) * 3);
	
	var vals = [b_l,b_r,b_o];
	// console.log("vals",vals,"ids",ids);
	for (var i=0;i<3;i++){ id_value(ids[i],vals[i]); }
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_full(){
	for (var i = 1;i<6;i++){
		rocket_random_base(i,true);
		rocket_random_tail(i,true);
		rocket_random_botl(i,true);
	}Rocket_Creator();
}

showme("Rocket_RandomCreator.js ready");