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
 * - cdot - [x,y,z] , bone start dot
 * - axes - [ox,oy,oz] , relative/rotated coordinate system of bone
 * - fa - front angle . Equivalent of rotation around ox
 * - sa - side angle . Equivalent of rotation around oy
 * - ta - twist angle . Equivalent of rotation around oz
 * - long - bone length
 * - radians - incoming angles in radians
 * - return [[ox,oy,oz],[bone_start,bone_end]] = [ [[x,y,z],[x,y,z],[x,y,z]], [[x,y,z],[x,y,z]] ], which is [bone axes, bone dots]
 */
function relative_bone_creator(cdot, axes, fa, sa, ta, long, radians = false){
	var bone = [cdot];
	var bone_axes = rotoxyz(axes,[fa,sa,ta],radians); //bone axes rotated
	bone.push( geo.dotXDoffset(cdot,axes[2],long) ); //end bone dot added
	return [bone_axes,bone];
}
function bones_creator(d, c, vx, vy, vz){
	
	var bones = {};
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
