showme("preparing Dummy_Creator.js");

var fresh = true;
var dummy = {}; //dict like object of meshes
var dummy_mat = {}; //dict like object of materials

function one_mat_maker(hull,alp,hexcolorstring,matname){
	var mat = new BABYLON.StandardMaterial(matname, scene);
	mat.alpha = alp;
	mat.diffuseColor = new BABYLON.Color3.FromHexString(hexcolorstring);
	mat.emissiveColor = new BABYLON.Color3.Black();
	mat.backFaceCulling = false;
	mat.wireframe = hull;
	return mat;
}
function mat_maker(){
	var hull = document.getElementById("wireframe").checked;
	
	for (var i=0;i<5;i++){
		
		var id="";
		var text=(i+1).toString();
		//base
		id= "alpha_base_"+text;
		var alp_base = parseFloat(document.getElementById(id).value);
		id="color_base_"+text;
		var color_base = document.getElementById(id).value;
			
		//tail
		id= "alpha_tail_"+text;
		var alp_tail = parseFloat(document.getElementById(id).value);
		id="color_tail_"+text;
		var color_tail = document.getElementById(id).value;
			
		//bottle
		id= "alpha_bottle_"+text;
		var alp_bottle = parseFloat(document.getElementById(id).value);
		id="color_bottle_"+text;
		var color_bottle = document.getElementById(id).value;
		
		base_section_mat.push(one_mat_maker(hull,alp_base,color_base,"base_mat_"+text));
		tail_section_mat.push(one_mat_maker(hull,alp_tail,color_tail,"tail_mat_"+text));
		bottle_section_mat.push(one_mat_maker(hull,alp_bottle,color_bottle,"bottle_mat_"+text));
		
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
	var bone = [sdot];
	var bone_axes = rotoxyz(axes,[fa,sa,ta],radians); //bone axes rotated
	bone.push( geo.dotXDoffset(sdot,axes[2],long) ); //end bone dot added
	return [bone_axes,bone];
}
function bones_creator(d, c, vx, vy, vz){
	//left side angles _sa _ta used with negative values for mirroring. Left angle _fa not changed.
	//trying to use CW as positive direction
	var bones = {};
	//ass
	var base_axes = rotox([vx,vy,vz],d["base_angle"]);
	var axes = rotoy(base_axes,90);//now ox for ass length if CW around oy work done
	var bone = [geo.dotXDoffset(c,vz,-d["ass_width"]/2),geo.dotXDoffset(c,vz,d["ass_width"]/2)];
	bones["ass"]=[axes,bone];
	
	//r_hip - end ass bone
	var bone = relative_bone_creator(bones["ass"][1][1],base_axes,d["r_hip_fa"]+90,d["r_hip_sa"],d["r_hip_ta"],d["hip_length"]);
	bones["r_hip"] = bone;
	//l_hip - start ass bone
	var bone = relative_bone_creator(bones["ass"][1][0],base_axes,d["l_hip_fa"]+90,-d["l_hip_sa"],-d["l_hip_ta"],d["hip_length"]);
	bones["l_hip"] = bone;
	
	//r_shin
	var bone = relative_bone_creator(bones["r_hip"][1][1],bones["r_hip"][0],d["r_knee_fa"],0,0,d["shin_length"]);
	bones["r_shin"] = bone;
	//l_shin
	var bone = relative_bone_creator(bones["l_hip"][1][1],bones["l_hip"][0],d["l_knee_fa"],0,0,d["shin_length"]);
	bones["l_shin"] = bone;
	
	//r_foot
	var bone = relative_bone_creator(bones["r_shin"][1][1],bones["r_shin"][0],d["r_foot_fa"]-90,0,0,d["foot_length"]);
	bones["r_foot"] = bone;
	//l_foot
	var bone = relative_bone_creator(bones["l_shin"][1][1],bones["l_shin"][0],d["l_foot_fa"]-90,0,0,d["foot_length"]);
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

/**create ribbon rotated skeleton and then cut half data (in foot case) */
function half_balon_creator(d,bone){}
function one_balon_creator(bone,dis,material=null,id = "any"){
	var axes = bone[0]; // [ox,oy,oz]. Bone along oz,side along ox
	var sdot = bone[1][0]; // start dot
	var edot = bone[1][1]; // end dot
	var slever = geo.dotXDoffset(sdot,axes[0],dis);
	var elever = geo.dotXDoffset(edot,axes[0],dis);
	var arc = [sdot,slever,elever,edot];
	var aarc = arc4_rotated_karkas_maker(arc,sdot,axes[2],16); //rotated arc skeleton
	var abezpoints = bez_array_getPoints_maker(aarc,8); //.getPoints... for each arc->babylonbezier from aarc
	var balon = BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: abezpoints}, scene );
	// balon.material = material; //color should be counted before
	return balon;
}
function balons_creator(d,bones){
	//create ribbons for bones + head(need elipsoid 1 1 1 then scale in arc study ) + body face/back (need ribs etc... muddy) + neck(need think how) + foot(half ellipsoid + none standart size sheme)
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
		var bone = bones[id];
		var dis = dis_values[i];
		dummy[id] = one_balon_creator(bone,dis);
	}
}

function Dummy_Creator(){
	// clearall();
	
	var d=gui_reader(); //GuiReader.js
	console.log(d);
	
	// mat_maker();
	if (document.getElementById("axes").checked && axes.length==0){ console.log("show axes");  axes_creator(400); }
	
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

function clearall(force=false){
	if (fresh) { fresh = false; }
	else{
		if (base_section) { for(var i=0;i<base_section.length;i++){base_section[i].material.dispose(true,true); base_section[i].dispose(false,true);} base_section=[]; }
		if (tail_section) { for(var i=0;i<tail_section.length;i++){tail_section[i].dispose(false,true);} tail_section=[]; }
		if (ring_section) { for(var i=0;i<ring_section.length;i++){ring_section[i].dispose(false,true);} ring_section=[]; }
		if (bottle_section) { for(var i=0;i<bottle_section.length;i++){bottle_section[i].dispose(false,true);} bottle_section=[]; }
		for (var i=0;i<5;i++){
			base_section_mat[i].dispose(true,true);
			tail_section_mat[i].dispose(true,true);
			bottle_section_mat[i].dispose(true,true);
		}
		base_section_mat=[];
		tail_section_mat=[];
		bottle_section_mat=[];
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
