showme("preparing Dummy_Creator.js");

var fresh = true;
var dummy = {}; //dict like object of meshes
var dummy_mat = {}; //dict like object of materials

var mat_ids=[
	"r_shoulder_", "r_elbow_", "r_palm_", "r_hip_", "r_shin_", "r_foot_", "back_", "head_",
	"l_shoulder_", "l_elbow_", "l_palm_", "l_hip_", "l_shin_", "l_foot_", "neck_", "body_"
];

function one_mat_maker(hull,hexcolorstring,matname){
	var mat = new BABYLON.StandardMaterial(matname, scene);
	mat.alpha = 1;
	mat.diffuseColor = new BABYLON.Color3.FromHexString(hexcolorstring);
	mat.emissiveColor = new BABYLON.Color3.Black();
	mat.backFaceCulling = false;
	mat.wireframe = hull;
	return mat;
}
function mat_maker(){
	var hull = document.getElementById("wireframe").checked;
	
	for (var i=0;i<mat_ids.length;i++){
		var id = mat_ids[i];
		console.log(id);
		var hexcolorstring = document.getElementById(mat_ids[i]+"co").value;
		var matname = mat_ids[i]+"mat";
		dummy_mat[matname] = one_mat_maker(hull,hexcolorstring,matname);
	}
}

/**create relative bone which is directed along relative oz axis in result
 * - sdot - [x,y,z] , bone start dot
 * - axes - [ox,oy,oz] , relative/rotated coordinate system of bone
 * - fa - front angle . Equivalent of rotation around ox
 * - sa - side angle . Equivalent of rotation around oy
 * - ta - twist angle . Equivalent of rotation around oz
 * - long - bone length
 * - radians - incoming angles in radians
 * - return [[ox,oy,oz],[bone_start,bone_end]] = [ [[x,y,z],[x,y,z],[x,y,z]], [[x,y,z],[x,y,z]] ], which is [bone axes, bone dots]
 */
function relative_bone_creator(sdot, axes, fa, sa, ta, long, radians = false){
	var bone;
	var bone_axes = rotoxyz(axes,[fa,sa,ta],radians); //bone axes rotated
	var edot = geo.dotXDoffset(sdot,bone_axes[2],long); //second dot
	bone = [sdot,edot];
	return [bone_axes,bone];
}
function bones_creator(d, c, vx, vy, vz){
	//left side angles _sa _ta used with negative values for mirroring. Left angle _fa not changed.
	//trying to use CW as positive direction
	var bones = {};
	//ass
	var base_axes = rotox([vx,vy,vz],d["base_angle"]);
	var axes = rotoy(base_axes,90);//now ox for ass length if CW around oy work done
	var bone = [geo.dotXDoffset(c,axes[2],-d["ass_width"]/2),geo.dotXDoffset(c,axes[2],d["ass_width"]/2)];
	bones["ass"]=[axes,bone];
	
	//r_hip - end ass bone
	var bone = relative_bone_creator(bones["ass"][1][1],base_axes,d["r_hip_fa"]+90,d["r_hip_sa"],d["r_hip_ta"],d["hip_length"]);
	bones["r_hip"] = bone;
	//l_hip - start ass bone
	var bone = relative_bone_creator(bones["ass"][1][0],base_axes,d["l_hip_fa"]+90,-d["l_hip_sa"],-d["l_hip_ta"],d["hip_length"]);
	bones["l_hip"] = bone;
	
	//r_shin
	var bone = relative_bone_creator(bones["r_hip"][1][1],bones["r_hip"][0],d["r_shin_fa"],0,0,d["shin_length"]);
	bones["r_shin"] = bone;
	//l_shin
	var bone = relative_bone_creator(bones["l_hip"][1][1],bones["l_hip"][0],d["l_shin_fa"],0,0,d["shin_length"]);
	bones["l_shin"] = bone;
	
	//r_foot
	var axes = bones["r_shin"][0];
	var sdot = geo.dotXDoffset(bones["r_shin"][1][1],axes[2],d["foot_width"]);
	sdot = geo.dotXDoffset(sdot, axes[1],-d["shin_width"]/3);
	var bone = relative_bone_creator(sdot,axes,d["r_foot_fa"]-90,0,0,d["foot_length"]);
	bones["r_foot"] = bone;
	//l_foot
	var axes = bones["l_shin"][0];
	var sdot = geo.dotXDoffset(bones["l_shin"][1][1],axes[2],d["foot_width"]);
	sdot = geo.dotXDoffset(sdot, axes[1],-d["shin_width"]/3);
	var bone = relative_bone_creator(sdot,axes,d["l_foot_fa"]-90,0,0,d["foot_length"]);
	bones["l_foot"] = bone;
	
	//back 17
	var axes = rotox(base_axes,-90);
	var dl = d["back_length"]/17;
	var dfa = d["back_fa"]/17;
	var dsa = d["back_sa"]/17;
	var dta = d["back_ta"]/17;
	var sdot = c; //start dot
	for (var i=0;i<17;i++){
		var bone = relative_bone_creator(sdot,axes,dfa,dsa,dta,dl);
		bones["back_"+i.toString()] = bone;
		axes = bone[0];
		sdot = bone[1][1];
	}
	
	//neck 6
	var dl = d["neck_length"]/6;
	var dfa = d["neck_fa"]/6;
	var dsa = d["neck_sa"]/6;
	var dta = d["neck_ta"]/6;
	for (var i=0;i<6;i++){
		var bone = relative_bone_creator(sdot,axes,dfa,dsa,dta,dl);
		bones["neck_"+i.toString()] = bone;
		axes = bone[0];
		sdot = bone[1][1];
	}
	
	//r_shoulders
	var dang = geo.degrees(Math.asin(d["arm_width"]/d["shoulders_width"])) * d["shoulders_bend"];
	var axes = rotoy(bones["neck_0"][0],90);
	var bone = relative_bone_creator(bones["neck_0"][1][0],axes,dang,0,0,d["shoulders_width"]/2);
	bones["r_shoulders"] = bone;
	//l_shoulders
	var axes = rotoy(bones["neck_0"][0],-90);
	var bone = relative_bone_creator(bones["neck_0"][1][0],axes,dang,0,0,d["shoulders_width"]/2);
	bones["l_shoulders"] = bone;
	
	//r_shoulder
	var axes = rotox(bones["neck_0"][0],180);
	var bone = relative_bone_creator(bones["r_shoulders"][1][1],axes,d["r_shoulder_fa"],d["r_shoulder_sa"],d["r_shoulder_ta"],d["arm_length"]/2);
	bones["r_shoulder"] = bone;
	//l_shoulder
	var bone = relative_bone_creator(bones["l_shoulders"][1][1],axes,d["l_shoulder_fa"],-d["l_shoulder_sa"],-d["l_shoulder_ta"],d["arm_length"]/2);
	bones["l_shoulder"] = bone;
	
	//r_elbow
	var bone = relative_bone_creator(bones["r_shoulder"][1][1],bones["r_shoulder"][0],d["r_elbow_fa"],0,d["r_elbow_ta"],d["arm_length"]/2);
	bones["r_elbow"] = bone;
	//l_elbow
	var bone = relative_bone_creator(bones["l_shoulder"][1][1],bones["l_shoulder"][0],d["l_elbow_fa"],0,-d["l_elbow_ta"],d["arm_length"]/2);
	bones["l_elbow"] = bone;
	
	//r_palm
	var bone = relative_bone_creator(bones["r_elbow"][1][1],bones["r_elbow"][0],0,d["r_palm_sa"],0,d["palm_length"]);
	bones["r_palm"] = bone;
	//l_palm
	var bone = relative_bone_creator(bones["l_elbow"][1][1],bones["l_elbow"][0],0,-d["l_palm_sa"],0,d["palm_length"]);
	bones["l_palm"] = bone;
	
	return bones;
}

/**for ass length. create half balon like mountin from down to top along z axis (axes[2]) */
function ass_balon_creator(bone,dis,material=null,id = "any"){
	var axes = bone[0]; // [ox,oy,oz]. Bone along oz,side along ox
	var sdot = bone[1][0]; // start dot
	sdot = geo.dotXDoffset(sdot,axes[0],dis);
	var slever = sdot;
	var edot = bone[1][1]; // end dot
	var elever = geo.dotXDoffset(edot,axes[0],dis);
	var arc = [sdot,slever,elever,edot];
	var aarc = arc4_rotated_karkas_maker(arc,edot,axes[2],16); //rotated arc skeleton
	var abezpoints = bez_array_getPoints_maker(aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	return balon;
}
function foot_balon_creator(bone,dis,disup,material=null, id = "any"){
	var axes = bone[0];
	var sdot = bone[1][0];
	var edot = bone[1][1];
	var slever_minus = geo.dotXDoffset(sdot,axes[0],-dis);
	var slever_plus = geo.dotXDoffset(sdot,axes[0],dis);
	var slever_up = geo.dotXDoffset(sdot,axes[1],disup);
	
	var elever_minus = geo.dotXDoffset(edot,axes[0],-dis);
	var elever_plus = geo.dotXDoffset(edot,axes[0],dis);
	var elever_up = geo.dotXDoffset(edot,axes[1],disup);
	
	var arc1 = [sdot,slever_plus,elever_plus,edot];
	var arc2 = [sdot,slever_up,elever_up,edot];
	var arc3 = [sdot,slever_minus,elever_minus,edot];
	var aarc = [arc1,arc3,arc2,arc1];
	var abezpoints = bez_array_getPoints_maker(aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	return balon;
}

/**create ribbon rotated skeleton and then cut half data (in foot case) NOT tested NOT used */
function half_balon_creator(bone,dis,material=null,id = "any"){
	var axes = bone[0]; // [ox,oy,oz]. Bone along oz,side along ox
	var sdot = bone[1][0]; // start dot
	var edot = bone[1][1]; // end dot
	var slever = geo.dotXDoffset(sdot,axes[0],dis);
	var elever = geo.dotXDoffset(edot,axes[0],dis);
	var arc = [sdot,slever,elever,edot];
	var fullaarc = arc4_rotated_karkas_maker(arc,sdot,axes[2],16); //rotated arc skeleton
	var aarc = [];
	for (var i=0;i<9;i++){ aarc.push(fullaarc[i]); }
	aarc.push(fullaarc[fullaarc.length-1]);
	var abezpoints = bez_array_getPoints_maker(aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	// balon.material = material; //color should be counted before
	return balon;
}
function one_balon_creator(bone,dis,material=null,id = "any"){
	var axes = bone[0]; // [ox,oy,oz]. Bone along oz,side along ox
	var sdot = bone[1][0]; // start dot
	var edot = bone[1][1]; // end dot
	var slever = geo.dotXDoffset(sdot,axes[0],dis);
	var elever = geo.dotXDoffset(edot,axes[0],dis);
	var arc = [sdot,slever,elever,edot];
	//HandmadeChecker.js
	if (id=="r_shoulder"){
		console.log(id);
		console.log("axes = ",axes);
		var aarc = handmade_arc4_rotated_karkas_maker(arc,sdot,axes[2],16); //rotated arc skeleton
	}else{
		var aarc = arc4_rotated_karkas_maker(arc,sdot,axes[2],16); //rotated arc skeleton
	}
	
	var abezpoints = bez_array_getPoints_maker(aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	if (id=="r_elbow"){
		// console.log("id=",id,"abezpoints=",JSON.stringify(abezpoints));
		
		console.log("axes = ",axes);
		console.log("sdot = ",sdot);
		console.log("edot = ",edot);
		console.log("dis = ",dis);
		console.log("slever = ",slever);
		console.log("elever = ",elever);
		console.log("r_shoulder base arc = ",arc);
		console.log("r_shoulder aarc skeleton = ",aarc);//[...[null,null,null]]
		console.log("id=",id,"abezpoints=",abezpoints);//fail... second curve in sckeleton from bezier all NaN
	}
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	return balon;
}

/**vertebra - bones["back_N"] */
function two_ribs_center_dot3D( vertebra ){
	var rez;
	var sdot = vertebra[1][0];
	var edot = vertebra[1][1];
	var axis = vertebra[0][2]; // oz relative
	var dis = geo.vecXDnorm(geo.vecXD(sdot,edot)) / 2;
	rez = geo.dotXDoffset(sdot,axis,dis);
	return rez;
}
function two_ribs_side_size(
	back_width, // side width of body
	one_vertebra_length,
	max_number, // full body vertabra's number
	rib_number, // number of vertebra of body, from neck to down
){
	var rez;
	var long = one_vertebra_length * max_number;
	var scale = back_width / long; //multiplexer for rez from circle
	var r = long / 2; //radius of circle for calculate side size
	var x = r - one_vertebra_length * (rib_number-0.5); //distance from center to rib position
	var ang = Math.acos( x / r );
	rez = r * Math.sin(ang) * scale;
	return rez;
}
/**just recalling two_ribs_side_size with back_width = body_width * 2 */
function two_ribs_front_size(
	body_width, // front direction chest size
	one_vertebra_length,
	max_number, // full body vertabra's number
	rib_number, // number of vertebra of body, from neck to down
){
	var rez;
	var back_width = body_width * 2;
	rez = two_ribs_side_size(back_width,one_vertebra_length,max_number,rib_number);
	return rez;
}
/**
 * 
 * - bone - bones["back_N"] = [axes,[sdot,edot]]
 */
function two_ribs_balon_creator(
	bone,
	back_width,
	one_vertebra_length,
	max_number,
	rib_number,
	body_width,
	rib_width,
	material,
	id = "any"
){
	var vertebra = bone;
	var sdot = two_ribs_center_dot3D(vertebra);
	var side_size = two_ribs_side_size(back_width,one_vertebra_length,max_number,rib_number);
	var front_size = two_ribs_front_size(body_width,one_vertebra_length,max_number,rib_number);
	var axes = rotox(bone[0],90);
	var edot = geo.dotXDoffset(sdot,axes[2],front_size);
	//right ox+
	//right rib mesh
	var slever = geo.dotXDoffset(sdot,axes[0],side_size);
	var elever = geo.dotXDoffset(edot,axes[0],side_size);
	var arc_r1 = [sdot,slever,elever,edot];
	slever = geo.dotXDoffset(slever,axes[1],rib_width);
	elever = geo.dotXDoffset(elever,axes[1],rib_width);
	var arc_r2 = [sdot,slever,elever,edot];
	slever = geo.dotXDoffset(slever,axes[0],-rib_width);
	elever = geo.dotXDoffset(elever,axes[0],-rib_width);
	var arc_r3 = [sdot,slever,elever,edot];
	var r_aarc = [arc_r1,arc_r2,arc_r3,arc_r1];
	
	var r_id = "r_"+id;
	clear_rib_ids.push(r_id);
	var abezpoints = bez_array_getPoints_maker(r_aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(r_id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	dummy[r_id] = balon;
	
	//left rib mesh
	var slever = geo.dotXDoffset(sdot,axes[0],-side_size);
	var elever = geo.dotXDoffset(edot,axes[0],-side_size);
	var arc_l1 = [sdot,slever,elever,edot];
	slever = geo.dotXDoffset(slever,axes[1],rib_width);
	elever = geo.dotXDoffset(elever,axes[1],rib_width);
	var arc_l2 = [sdot,slever,elever,edot];
	slever = geo.dotXDoffset(slever,axes[0],rib_width);
	elever = geo.dotXDoffset(elever,axes[0],rib_width);
	var arc_l3 = [sdot,slever,elever,edot];
	var l_aarc = [arc_l1,arc_l2,arc_l3,arc_l1];
	
	var l_id = "l_"+id;
	clear_rib_ids.push(l_id);
	var abezpoints = bez_array_getPoints_maker(l_aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(l_id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	dummy[l_id] = balon;
	
}
function ribs_balon_creator(d,bones,material=null){
	var back_width = d["back_width"];
	var one_vertebra_length = geo.vecXDnorm(geo.vecXD(bones["back_0"][1][0],bones["back_0"][1][1]));
	var max_number = d["body_length"];
	var body_width = d["body_width"];//front direction
	var rib_width = one_vertebra_length / 2;
	
	clear_rib_ids = [];//reset before refresh
	for (var i=0;i<max_number;i++){
		var n = 16-i;
		var id = "back_"+(n).toString();
		var bone = bones[id];
		var rib_number = i;
		two_ribs_balon_creator(
			bone,
			back_width,
			one_vertebra_length,
			max_number,
			rib_number,
			body_width,
			rib_width,
			material,
			id
		);
	}
}
function head_balon_creator(d,bones,material = null){
	var bone = bones["neck_5"];
	var cdot = bone[1][1];
	var axes = rotox(bone[0],90);
	var head_length = d["head_length"];
	var head_width = d["head_width"];
	var head_axis = d["head_axis"];
	var head_height = d["head_height"];
	cdot = geo.dotXDoffset(cdot, axes[2], -head_length/2 * head_axis);
	console.log(axes);
	//length oz, height oy, width ox
	//length height profile elipse
	var va = axes[2]; //oz
	var vb = axes[1]; //oy
	var van = geo.vecXDback(va);
	var vbn = geo.vecXDback(vb);
	var vec3Dsemiaxes = [va,vb,van,vbn];
	var a = head_length/2;
	var b = head_height/2;
	var semiaxes = [a,b,a,b];
	
	var mass = 16; //how much dots have elipse perimeter( and bezier curve later)
	var angle_proportions = [];
	for (var i=0;i<mass;i++){ angle_proportions.push(1); }
	var eli = geo.polygon3D_inside_ellipse(cdot, vec3Dsemiaxes, semiaxes, angle_proportions);
	eli.shift(); //center dot removed
	eli.push(eli[0]); //karkas closed for ribbon creation
	//left half karkas
	var l_aarc = [];
	var l_dot = geo.dotXDoffset(cdot,axes[0],-head_width/2);
	for (var i=0;i<eli.length;i++){ l_aarc.push( geo.curve3D_3dots(cdot,l_dot,eli[i]) ); }
	//right half karkas
	var r_aarc = [];
	var r_dot = geo.dotXDoffset(cdot,axes[0],head_width/2);
	for (var i=0;i<eli.length;i++){ r_aarc.push( geo.curve3D_3dots(cdot,eli[i],r_dot) ); }
	//sum
	var aaarc = [];
	for (var i=0;i<eli.length;i++){ aaarc.push([l_aarc[i],r_aarc[i]]); }
	var abezpoints = continued_bez_array_getPoints_maker(aaarc,Math.floor(mass/2)); //.getPoints...
	var id = "head";
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	balon.material = material; //color should be counted before
	dummy["head"] = balon;
}

function mat_id_counter(id){
	var matid;
	if (id.startsWith("back")){ matid = "back_mat"; }
	else if (id.startsWith("neck")){ matid = "neck_mat"; }
	else if (id.startsWith("r_shoulder")){ matid = "r_shoulder_mat" }
	else if (id.startsWith("l_shoulder")){ matid = "l_shoulder_mat" }
	else { matid = id+"_mat"; }
	return matid;
}
function balons_creator(d,bones){
	//create ribbons for bones + head(need elipsoid 1 1 1 then scale in arc study ) + ass + body face/back (need ribs etc... muddy) + neck(need think how) + foot(half ellipsoid + none standart size sheme)
	var ids = [
	"r_shoulders","r_shoulder","r_elbow","r_palm","r_hip","r_shin",
	"l_shoulders","l_shoulder","l_elbow","l_palm","l_hip","l_shin",
	"back_0","back_1","back_2","back_3","back_4","back_5","back_6","back_7","back_8","back_9","back_10","back_11","back_12","back_13","back_14","back_15","back_16",
	"neck_0","neck_1","neck_2","neck_3","neck_4","neck_5"
	]; //bones element ids
	var b_dis = geo.vecXDnorm(geo.vecXD(bones["back_0"][1][0],bones["back_0"][1][1]));
	var n_dis = geo.vecXDnorm(geo.vecXD(bones["neck_0"][1][0],bones["neck_0"][1][1]));
	var dis_values = [
		d["arm_width"],d["arm_width"],d["arm_width"],d["palm_width"],d["hip_width"],d["shin_width"],
		d["arm_width"],d["arm_width"],d["arm_width"],d["palm_width"],d["hip_width"],d["shin_width"],
		b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,b_dis,
		n_dis,n_dis,n_dis,n_dis,n_dis,n_dis
	];
	//bone ribbons loop
	for (var i = 0;i<ids.length;i++){
		var id = ids[i]
		if (id in bones){
			var mat_id = mat_id_counter(id);
			var material = dummy_mat[mat_id];
			var bone = bones[id];
			var dis = dis_values[i]/2;
			dummy[id] = one_balon_creator(bone,dis,material,id);
		}
	}
	//ass - three meshes. width will increased to 0.5 hips_width. Length mesh will from hip start dot along ox(back) to width+length
	var sdot =geo.dotXDoffset( bones["ass"][1][0] , bones["ass"][0][2], -d["hip_width"]/4);
	var edot =geo.dotXDoffset( bones["ass"][1][1] , bones["ass"][0][2], d["hip_width"]/4);
	var axes = bones["ass"][0];
	var bone = [axes,[sdot,edot]];
	var dis = d["hip_width"]/2;
	var material = dummy_mat["back_mat"];
	var id = "ass_base";
	dummy[id] = one_balon_creator(bone,dis,material,id);
	//left half
	var dis = d["hip_width"]/2;
	var axes = bones["ass"][0];
	var sdot = geo.dotXDoffset( bones["ass"][1][0], axes[2], dis );
	axes = rotoy(axes,90);
	var asslength = d["hip_width"]/2 + d["ass_length"];
	var edot = geo.dotXDoffset(sdot,axes[2],asslength);
	var bone = [axes,[sdot,edot]];
	var material = dummy_mat["l_hip_mat"];
	var id = "ass_left";
	dummy[id] = ass_balon_creator(bone,dis,material,id);
	//right half
	var axes = bones["ass"][0];
	var sdot = geo.dotXDoffset( bones["ass"][1][1], axes[2], -dis );
	axes = rotoy(axes,90);
	var edot = geo.dotXDoffset(sdot,axes[2],asslength);
	var bone = [axes,[sdot,edot]];
	var material = dummy_mat["r_hip_mat"];
	var id = "ass_right";
	dummy[id] = ass_balon_creator(bone,dis,material,id);
	//left foot
	var bone = bones["l_foot"];
	var dis = d["shin_width"]/2;
	var disup = d["foot_width"];
	var material = dummy_mat["l_foot_mat"];
	var id = "l_foot";
	dummy[id] = foot_balon_creator(bone,dis,disup,material,id);
	//right foot
	var bone = bones["r_foot"];
	var dis = d["shin_width"]/2;
	var disup = d["foot_width"];
	var material = dummy_mat["r_foot_mat"];
	var id = "r_foot";
	dummy[id] = foot_balon_creator(bone,dis,disup,material,id);
	
	//body
	var material = dummy_mat["back_mat"];
	ribs_balon_creator(d,bones,material);
	//head
	var material = dummy_mat["head_mat"];
	head_balon_creator(d,bones,material);
}

function Dummy_Creator(){
	clearall();
	
	var d=gui_reader(); //GuiReader.js
	// console.log(d);
	
	mat_maker();
	if (document.getElementById("axes").checked && axes.length==0){ console.log("show axes");  axes_creator(axes_size); }
	
	//start points and directions
	var c = [0,0,0] //center dot
	var vx = [1,0,0]; //ox
	var vy = [0,1,0]; //oy
	var vz = [0,0,1]; //oz
	
	//create bones karkas
	//fa - around vx, sa - around vy, ta - around vz (all relative from ass)
	var bones = bones_creator(d,c,vx,vy,vz);
	console.log(bones);
	balons_creator(d,bones);
	
	showme("complete");
}

var clear_rib_ids=[];//dinamically every time
var clear_ids = [
	"head",
	"r_shoulders","r_shoulder","r_elbow","r_palm","r_hip","r_shin",
	"l_shoulders","l_shoulder","l_elbow","l_palm","l_hip","l_shin",
	"back_0","back_1","back_2","back_3","back_4","back_5","back_6","back_7","back_8","back_9","back_10","back_11","back_12","back_13","back_14","back_15","back_16",
	"neck_0","neck_1","neck_2","neck_3","neck_4","neck_5",
	"ass_base","ass_left","ass_right",
	"r_foot","l_foot"
];
function clearall(force=false){
	if (fresh) { fresh = false; }
	else{
		var ids = clear_ids;
		for (var i=0;i<clear_rib_ids.length;i++){ ids.push(clear_rib_ids[i]); }
		if ("head" in dummy) { for(var i=0;i<ids.length;i++){
			console.log(ids[i]);
			if (dummy[ids[i]].material) { dummy[ids[i]].material.dispose(true,true) };
			dummy[ids[i]].dispose(false,true);} dummy={};
		}
		for (var i=0;i<mat_ids.length;i++){ dummy_mat[mat_ids[i]+"mat"].dispose(true,true); }
		dummy_mat={};
		scene.resetCachedMaterial();
	}
	if (axes){ for(var i=0;i<axes.length;i++) { axes[i].dispose(false, true); } axes = []; }
	if (force){fresh = true;}
}

var OBJexport;
// work but big
function prepare_objects_for_export(objs){
	var rez = []
	for (var i=0;i<objs.length;i++){
		var fullmesh = objs[i].bakeCurrentTransformIntoVertices();
		rez.push(fullmesh);
	}
	return rez;
}
function save_objmesh(){
	var text = "Attention! If you try export bottles or tail, export can be super long or impossible,\ndepend of your environment and rocket configuration.\nBecause huge number objects have a huge data of numbers.\n\nFor example firefox javascript engine have RAM limit of usage, etc.\nYou can try use chrome/chromium, export the model piece by piece(\"LOOK\" tab checkboxes), that later to collect it in full.\n\nDefault configuration, which you can see when start the app (base + tail + ring + bottle),\nuses PC configuration (dual core AMD APU with integrated video 1Gb , CPU 3.4 Ghz, 8Gb RAM),\ncan be exported with result file have 21 mb size.\nIf rocket have huge number of elements (bottles or tail)\nfirefox can fail with error \"allocation size overflow\", which you can see after press \"F12\" keyboard.\n\nWhen you see message about \"long running script\", just ignore it, when script will be completed message disappear."
	if (bottle_section.length>0 || tail_section.length>0) { alert(text); }
	var exportobjects = []; //exported mesh array
	if (base_section.length>0) { for (var i=0;i<base_section.length;i++) { exportobjects.push(base_section[i]); } }
	if (tail_section.length>0) { for (var i=0;i<tail_section.length;i++) { exportobjects.push(tail_section[i]); } }
	if (ring_section.length>0) { for (var i=0;i<ring_section.length;i++) { exportobjects.push(ring_section[i]); } }
	if (bottle_section.length>0) { for (var i=0;i<bottle_section.length;i++) { exportobjects.push(bottle_section[i]); } }
	
	OBJexport = prepare_objects_for_export(exportobjects);
	
	var a = document.getElementById('OBJexport');
	var text = BABYLON.OBJExport.OBJ(OBJexport);
	var type = "text/plain";
	var name = "exported_dummy.obj";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}
  
function get_camera_data_from_screen(){
	document.getElementById("y_view").value = geo.degrees(camera.alpha);
	document.getElementById("z_view").value = geo.degrees(camera.beta);
	document.getElementById("distance_view").value = camera.radius;
	
	
}
function change_camera_test(al,be){
	camera.alpha = geo.radians(al);
	camera.beta = geo.radians(be);
	document.getElementById("y_view").value = al;
	document.getElementById("z_view").value = be;
	
}
showme("Dummy_Creator.js ready");
