showme("preparing Rocket_RandomCreator.js");

function rocket_random_base(n,full=false,hide_base){
	var sn = n.toString();
	if(hide_base){document.getElementById("base_radius_"+sn).value = 0;}else{
		var ids = ["base_length_"+sn,"base_radius_"+sn,"base_curvature%_"+sn];
		var min = 100;
		var max = 200;
		var b_l = random_int(min,max);
		var b_r = random_int(min,b_l/5);
		var b_c = random_int(0,100);
		var vals = [b_l,b_r,b_c];
		// console.log("vals",vals,"ids",ids);
		for (var i=0;i<ids.length;i++){ id_value(ids[i],vals[i]); }
	}
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_tail(n,full=false,hide_tail,hide_ring){
	var sn = n.toString();
	var min = 100;
	var max = 200;
	
	var ids = [
		"tail_radius_","tail_start_offset_","tail_start_length_","tail_end_offset_","tail_end_length_",
		"tail_start_width_","tail_end_width_","tail_number_"
	];
	for (var i = 0; i< ids.length;i++){ ids[i]+=sn; }
	var vals=[];
	for (var i = 0; i< ids.length;i++){ vals.push( parseFloat( document.getElementById(ids[i]).value ) ); }
	var tr; var tso; var tsl; var teo; var tel; var tsw; var tew; var tn;
	if(hide_tail){
		tr = 0;
		tso = vals[1];
		tsl = vals[2];
		teo = vals[3];
		tel = vals[4];
		tsw = vals[5];
		tew = vals[6];
		tn = vals[7];
	}else{
		tr = random_int(min,max);
		tsl = random_int(tr/4,tr/2);
		tso = random_int(0,tr / 2);
		teo = random_int(0,tso);
		tel = random_int(tr/4,tsl);
		tsw = random_int(4,max / 10);
		tew = random_int(4,max / 10);
		tn = random_int(1,11);
	}
	vals = [tr,tso,tsl,teo,tel,tsw,tew,tn];
	for (var i=0;i<ids.length;i++){ id_value(ids[i],vals[i]); }
	
	//ring syntax
	var ids = [ "ring_radius_","ring_length_","ring_width_","ring_offset_" ];
	for (var i = 0; i< ids.length;i++){ ids[i]+=sn; }
	var vals = [];
	// console.log(ids,tr,tso,tsl,teo,tel,tsw,tew,tn);
	for (var i = 0; i< ids.length;i++){ vals.push( parseFloat( document.getElementById(ids[i]).value ) ); }
	if (hide_ring){
		var rr = 0;
		var rl = vals[1];
		var rw = vals[2];
		var ro = vals[3];
	}else{
		if (hide_tail){
			var rr = random_int(min,max);
			var rl = random_int(min,rr);
		}else{
			var rr = random_int(min,tr);
			var rl = random_int(tr/4,tel);
		}
		var rw = random_int(Math.min(tew,tsw),Math.max(tew,tsw));
		var dof = (tso-teo)/2;
		var ro = random_int(-dof,dof);
	}
	
	var vals = [rr,rl,rw,ro];
	// console.log("vals",vals,"ids",ids);
	for (var i=0;i<ids.length;i++){ id_value(ids[i],vals[i]); }
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_botl(n,full=false,hide_botl){
	var sn = n.toString();
	if(hide_botl){document.getElementById("bottle_radius_"+sn).value = 0;}else{
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
	}
	if (n>0 && !full){ Rocket_Creator(); } //if 0 then full random call later
}

function rocket_random_section(n){
	var hide_base = document.getElementById("hide_base").checked;
	var hide_tail = document.getElementById("hide_tail").checked;
	var hide_ring = document.getElementById("hide_ring").checked;
	var hide_botl = document.getElementById("hide_botl").checked;
	rocket_random_base(n,true,hide_base);
	rocket_random_tail(n,true,hide_tail,hide_ring);
	rocket_random_botl(n,true,hide_botl);
	Rocket_Creator();
}

function rocket_random_full(){
	for (var i = 1;i<6;i++){
		var hide_base = document.getElementById("hide_base").checked;
		var hide_tail = document.getElementById("hide_tail").checked;
		var hide_ring = document.getElementById("hide_ring").checked;
		var hide_botl = document.getElementById("hide_botl").checked;
		rocket_random_base(i,true,hide_base);
		rocket_random_tail(i,true,hide_tail,hide_ring);
		rocket_random_botl(i,true,hide_botl);
	}Rocket_Creator();
}

showme("Rocket_RandomCreator.js ready");