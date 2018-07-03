/**create BABYLON.Vector3 from list [number,number,number] */
function vec_maker(vec){ var vec3 = new BABYLON.Vector3(vec[0],vec[1],vec[2]); return vec3; }

/**create BABYLON.Curve3.CreateCubicBezier() from x4 BABYLON.Vector3 list [vec,vec,vec,vec] */
function bez_maker_from_vectors(arc,mass=4){ var bez = BABYLON.Curve3.CreateCubicBezier(arc[0],arc[1],arc[2],arc[3],mass); return bez; }

/**create BABYLON.Curve3.CreateCubicBezier() from x4 3D dots list [dot,dot,dot,dot]. Each dot = [x,y,z] = [number,number,number].
 * Use later .getPoints() to take data for generate geometry trajectory etc.
 * - arc - [[x,y,z],[x,y,z],[x,y,z],[x,y,z]] - bezier curve support points [dot1, lever1, lever2, dot2]
 * - mass - number of result bezier curve dots
 */
function bez_maker(arc,mass=4){ var bez = BABYLON.Curve3.CreateCubicBezier(vec_maker(arc[0]),vec_maker(arc[1]),vec_maker(arc[2]),vec_maker(arc[3]),mass); return bez; }

/**create array of BABYLON.Curve3.CreateCubicBezier() uses array arcs. Each arc is array of 4 dots [x,y,z] */
function bez_array_maker(arrarc,mass=4){ var rez=[]; for(i=0;i<arrarc.length;i++){ rez.push( bez_maker(arrarc[i],mass) ); } return rez; }

/**create bezier trajectory close to ring shape uses contiues BABYLON.Curve3.CreateCubicBezier() syntax, than return bez.getPoints()
 * - dot - center dot = [x,y,z] = [number,number,number]
 * - vn - normal vector of trajectory plane = [a,b,c] = [number,number,number]
 * - va - radial vector for first dot of trajectory = [a,b,c] = [number,number,number]
 * - r - trajectory radius
 * - mass - BABYLON.Curve3.CreateCubicBezier() parameter which determine number of result dots for bezier curve
 */
function ring_trajectory(dot,vn,va,r,mass=4){
	//vn=ox at this moment va = -oz
	var vb = geo.vec3Drotate(va,vn,90);
	var vad = geo.vecXDback(va);
	var vbd = geo.vecXDback(vb);
	var ta = geo.dotXDoffset(dot,va,r);
	var tb = geo.dotXDoffset(dot,vb,r);
	var tad = geo.dotXDoffset(dot,vad,r);
	var tbd = geo.dotXDoffset(dot,vbd,r);
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	
	var ac1 = geo.curve3D_3dots(dot,ta,tb);
	var ac2 = geo.curve3D_3dots(dot,tb,tad);
	var ac3 = geo.curve3D_3dots(dot,tad,tbd);
	var ac4 = geo.curve3D_3dots(dot,tbd,ta);
	
	//bezier curves from dots array
	var arc1 = bez_maker(ac1,mass);
	var arc2 = bez_maker(ac2,mass);
	var arc3 = bez_maker(ac3,mass);
	var arc4 = bez_maker(ac4,mass);
	
	var arc14 = arc1.continue(arc2.continue(arc3.continue(arc4)));
	// var arc14mesh = BABYLON.Mesh.CreateLines("cbezier1", arc14.getPoints(), scene); arc14mesh.color = new BABYLON.Color3(1, 0.6, 0);
	return arc14.getPoints();
}

/**create array of bezier arcs from rotation of copy of `arc` around vector `vr` from dot `cdot` with angle step 360 / `mass`.
 * That later convert to BABYLON.Curve3.CreateCubicBezier() array, use bez_array_maker(result_of_this_function).
 * - arc - rotated bezier arc = [dot,dot,dot,dot], where dot = [x,y,z]
 * - cdot - rotation center dot [x,y,z] = [number,number,number]
 * - vr - rotation vector [a,b,c] = [number,number,number]
 * - mass - integer number, how many copies will be around `vr` with permanent angle step rotation
 * - close_karkas - if true then first element of result array will be duplicated at the end of result array
 */
function bezier_rotated_karkas_maker(arc,cdot,vr,mass,close_karkas=true){
    var rez = [];
    var steps = Math.ceil(mass);
    var step = 360 / steps;
    for (i=0;i<steps;i++) { rez.push( geo.curve3Drotate(arc,cdot,vr,step * i) ); }
    if (close_karkas) { rez.push(rez[0]); }
    return rez;
}