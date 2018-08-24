showme("preparing SceneCreator.js");

// alert(geo.vecXD([1,2,3],[4,5,6]));

var axes=[]; //3mesh + 3 text
var axes_size = 40;

var canvas = document.getElementById("renderCanvas");
canvas.width = 600;
canvas.height = 600;
var engine = new BABYLON.Engine(canvas, true);
var scene;
var camera;
var ambient_light;
var directional_light;
var point_light;

function axes_creator (size) {
	var makeTextPlane = function (text, color, size) {
		var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
		var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
		plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
		plane.material.backFaceCulling = false;
		plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
		plane.material.diffuseTexture = dynamicTexture;
		return plane;
	};
	var axisX = BABYLON.Mesh.CreateLines("axisX", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
		new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	], scene);
	axisX.color = new BABYLON.Color3(1, 0, 0);
	var xChar = makeTextPlane("X", "red", size / 10);
	xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
	var axisY = BABYLON.Mesh.CreateLines("axisY", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
		new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
	], scene);
	axisY.color = new BABYLON.Color3(0, 1, 0);
	var yChar = makeTextPlane("Y", "green", size / 10);
	yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
	var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
		new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
	], scene);
	axisZ.color = new BABYLON.Color3(0, 0, 1);
	var zChar = makeTextPlane("Z", "blue", size / 10);
	zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	var axesbox = [xChar, yChar, zChar, axisX, axisY, axisZ];
	for (i=0;i<axesbox.length;i++) { axes.push(axesbox[i]); }
};


var createScene = function () {

	// Create the scene space
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(1, 1, 1);
	// Add a camera to the scene and attach it to the canvas
	camera = new BABYLON.ArcRotateCamera("Camera", geo.radians(45), geo.radians(45), 80, BABYLON.Vector3.Zero(), scene);
	// camera.setPosition(new BABYLON.Vector3(-400, -400, -400));
    camera.attachControl(canvas, true);
	
	// Add lights to the scene
	ambient_light = new BABYLON.HemisphericLight("ambient_light", new BABYLON.Vector3(1, 1, 1), scene);
	ambient_light.intensity = 1;
	directional_light = new BABYLON.DirectionalLight("directional_light", new BABYLON.Vector3(-500, -500, -500), scene );
	directional_light.intensity = 1; directional_light.setEnabled(false);
	point_light = new BABYLON.PointLight("point_light", new BABYLON.Vector3(500, 500, 500), scene );
	point_light.intensity = 0.3; point_light.setEnabled(false);
	
	axes_creator(axes_size);

	// Add and manipulate meshes in the scene
	// var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1}, scene);

	return scene;
};

/******* End of the create scene function ******/    

scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
scene.render();
});


window.addEventListener("resize", function () { // Watch for browser/canvas resize events
engine.resize();
});

function background_color(){
	var colornow = scene.clearColor.toHexString();
	var colornew = document.getElementById("color_background").value.toUpperCase();
	if(colornow != colornew) { scene.clearColor = new BABYLON.Color3.FromHexString(colornew); console.log("background color changed from",colornow,"to",colornew);}
}
function refresh_lamp(){
	background_color();
	camera.alpha = geo.radians( parseFloat( document.getElementById("y_view").value ) );
	camera.beta = geo.radians( parseFloat( document.getElementById("z_view").value ) );
	camera.radius = parseFloat( document.getElementById("distance_view").value ) ;
	if (document.getElementById("perspective_view").checked){camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;}else{camera.mode =  BABYLON.Camera.ORTHOGRAPHIC_CAMERA;}
	
	ambient_light.direction = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_ambient").value),
		parseFloat(document.getElementById("y_ambient").value),
		parseFloat(document.getElementById("z_ambient").value)
	);
	ambient_light.intensity = parseFloat(document.getElementById("intensity_ambient").value);
	if(document.getElementById("cbox_ambient").checked){ ambient_light.setEnabled(true); } else { ambient_light.setEnabled(false); }
	var htmlhexcolor = document.getElementById("color_ambient").value;
	ambient_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	htmlhexcolor = document.getElementById("color_ground_ambient").value;
	ambient_light.groundColor = new BABYLON.Color3.FromHexString(htmlhexcolor);
	
	directional_light.direction = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_directional").value),
		parseFloat(document.getElementById("y_directional").value),
		parseFloat(document.getElementById("z_directional").value)
	);
	directional_light.intensity = parseFloat(document.getElementById("intensity_directional").value);
	if(document.getElementById("cbox_directional").checked){ directional_light.setEnabled(true); } else { directional_light.setEnabled(false); }
	htmlhexcolor = document.getElementById("color_directional").value;
	directional_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	
	point_light.position = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_point").value),
		parseFloat(document.getElementById("y_point").value),
		parseFloat(document.getElementById("z_point").value)
	);
	point_light.intensity = parseFloat(document.getElementById("intensity_point").value);
	if(document.getElementById("cbox_point").checked){ point_light.setEnabled(true); } else { point_light.setEnabled(false); }
	htmlhexcolor = document.getElementById("color_point").value;
	point_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	showme("\"LAMP\" tab data was applied");
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

function PNGexport(){
	var exp_res = document.getElementById("export_resolution").value; //export resolution / box side size px
	exp_res = parseInt(exp_res);
	var oldbackground = scene.clearColor;
	var transperent = document.getElementById("transperent").checked;
	if (transperent) {
		scene.clearColor = new BABYLON.Color4(0,0,0,0);
		scene.render();
	}
	BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, exp_res);
	scene.clearColor = oldbackground;
}

showme("SceneCreator.js ready");