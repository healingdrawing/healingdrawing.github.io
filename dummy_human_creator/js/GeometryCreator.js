//random section for _RandomCreator.js

//geo lib instance declaration
var geo = new GeometryXD();

//rotate around babylon direction CW, but i write and test my lib geo.js CCW. Looks like in the future was fail if i not do intermediate layer.
//bottom functions (all which not rotate axes) not depend from this and work own way. Not protected from fails while use both.
/**rotation axes (ox,oy,oz) around ox, CW babylon style (opposite native CCW, which used in geo.js)
 * - axes - [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 * - angle - rotation angle around ox axis
 * - radians - incoming angle in radians
 * - return rotated [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 */
function rotox(axes,angle,radians = false){
    var rez = [];
    var dang = angle; //play with *(-1) if something will fail
    var ox = axes[0]; var oy = axes[1]; var oz = axes[2];
    rez.push(ox);
    rez.push( geo.vec3Drotate(oy,ox,dang,radians) );
    rez.push( geo.vec3Drotate(oz,ox,dang,radians) );
    return rez; //new rotated axes
}

/**rotation axes (ox,oy,oz) around oy, CW babylon style (opposite native CCW, which used in geo.js)
 * - axes - [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 * - angle - rotation angle around oy axis
 * - radians - incoming angle in radians
 * - return rotated [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 */
function rotoy(axes,angle,radians = false){
    var rez = [];
    var dang = angle; //play with *(-1) if something will fail
    var ox = axes[0]; var oy = axes[1]; var oz = axes[2];
    rez.push( geo.vec3Drotate(ox,oy,dang,radians) );
    rez.push(oy);
    rez.push( geo.vec3Drotate(oz,oy,dang,radians) );
    return rez; //new rotated axes
}

/**rotation axes (ox,oy,oz) around oz, CW babylon style (opposite native CCW, which used in geo.js)
 * - axes - [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 * - angle - rotation angle around oz axis
 * - radians - incoming angle in radians
 * - return rotated [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 */
function rotoz(axes,angle,radians = false){
    var rez = [];
    var dang = angle; //play with *(-1) if something will fail
    var ox = axes[0]; var oy = axes[1]; var oz = axes[2];
    rez.push( geo.vec3Drotate(ox,oz,dang,radians) );
    rez.push( geo.vec3Drotate(oy,oz,dang,radians) );
    rez.push(oz);
    return rez; //new rotated axes
}

/**rotation axes (ox,oy,oz) around angles, CW babylon style (opposite native CCW, which used in geo.js)
 * - axes - [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 * - angles - rotation angles around axes [ox_ang,oy_ang,oz_ang]. Rotation direct is oxyz around ox then around oy then around oz
 * - radians - incoming angle in radians
 * - return rotated [ox,oy,oz] = [[x,y,z],[x,y,z],[x,y,z]] ... three vectors list
 */
function rotoxyz(axes,angles,radians = false){
    var rez;
    rez = rotox(axes,angles[0],radians);
    rez = rotoy(rez,angles[1],radians);
    rez = rotoz(rez,angles[2],radians);
    return rez;
}

//end rotate around babylon direction CW section
//-----------------------------------------------

//random float include borders
function random_num(min=0,max=1){
    return Math.random()*(max - min)+min ;
}
//random integer include borders . Just Math.round(random_num(min,max))
function random_int(min=0,max=1){
    return Math.round(random_num(min,max));
}

//geomentry bridge section for connection between geo.js(GeometryXD haxe library) and babylonjs

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

/**create array of BABYLON.Curve3.CreateCubicBezier() uses array of arcs. Each arc is array of 4 dots [x,y,z] 
 * - mass - number of result dots of each bezier curve
*/
function bez_array_maker(arrarc, mass=4){ var rez=[]; for(var i=0;i<arrarc.length;i++){ rez.push( bez_maker(arrarc[i],mass) ); } return rez; }

/**create array of BABYLON.Curve3.CreateCubicBezier() uses array of array of arcs. arrarrarc = [arrarc,arrarc], arrarc = [arc,arc], arc = [dot,dot,dot,dot], dot = [x,y,z]
 * - mass - number of result dots of each bezier curve
*/
function continued_bez_array_maker(arrarrarc, mass=4){
    rez = [];
    for (var i = 0;i < arrarrarc.length;i++){ //one continued bezier
        var arrarc = arrarrarc[i];
        var bez_array = bez_array_maker(arrarc,mass);
        var continued_bez = bez_array_to_one_bez(bez_array); //now this stay continued babylonjs bezier cubic curve object
        rez.push( continued_bez );
    }return rez;
}

/**create array of BABYLON.Curve3.CreateCubicBezier().getPoints() uses array of arcs. Each arc is array of 4 dots [x,y,z]
 * - mass - number of result dots of each bezier curve
*/
function bez_array_getPoints_maker(arrarc,mass=4){ var rez=[]; for(var i=0;i<arrarc.length;i++){ rez.push( bez_maker(arrarc[i],mass).getPoints() ); } return rez; }

/**create array of BABYLON.Curve3.CreateCubicBezier().getPoints() uses array of array of arcs. arrarrarc = [arrarc,arrarc], arrarc = [arc,arc], arc = [dot,dot,dot,dot], dot = [x,y,z]
 * - mass - number of result dots of each bezier curve part (arc 4 dots based)
*/
function continued_bez_array_getPoints_maker(arrarrarc, mass=4){
    rez = [];
    for (var i = 0;i < arrarrarc.length;i++){ //one continued bezier
        var arrarc = arrarrarc[i];
        var bez_array = bez_array_maker(arrarc,mass);
        var continued_bez = bez_array_to_one_bez(bez_array); //now this stay continued babylonjs bezier cubic curve object
        rez.push( continued_bez.getPoints() );
    }return rez;
}


/**just make array uses .getPoints() command for each BABYLON.Curve3.CreateCubicBezier() curve from bez_array */
function bez_array_getPoints(bez_array){ var rez=[]; for(var i=0;i<bez_array.length;i++){ rez.push( bez_array[i].getPoints() ); } return rez; }

/**create mono BABYLON bezier from array of BABYLON.Curve3.CreateCubicBezier() curves */
function bez_array_to_one_bez(bez_array){
    var rez_bez = bez_array[0];
    for (var i = 1;i < bez_array.length;i++){ rez_bez = rez_bez.continue(bez_array[i]); }
    return rez_bez;
}

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
 * - close_karkas - if `true` then first element of result array will be duplicated at the end of result array
 */
function arc4_rotated_karkas_maker(arc,cdot,vr,mass,close_karkas=true){
    var rez = [];
    var steps = Math.ceil(mass);
    var step = 360 / steps;
    for (var i=0;i<steps;i++) { rez.push( geo.curve3Drotate(arc,cdot,vr,-step * i) ); } //need - u or internal material
    if (close_karkas) { rez.push(rez[0]); }
    return rez;
}

/**create array of arrays of bezier arcs from rotation of copy of `arc` around vector `vr` from dot `cdot` with angle step 360 / `mass`.
 * That later convert to BABYLON.Curve3.CreateCubicBezier() array, use continued_bez_array_maker(result_of_this_function).
 * - aarc - rotated array of bezier aarc = [arc,arc], arc = [dot,dot,dot,dot], where dot = [x,y,z]
 * - cdot - rotation center dot [x,y,z] = [number,number,number]
 * - vr - rotation vector [a,b,c] = [number,number,number]
 * - mass - integer number, how many copies will be around `vr` with permanent angle step rotation
 * - close_karkas - if `true` then first element of result array will be duplicated at the end of result array
 */
function continued_arc4_rotated_karkas_maker(aarc,cdot,vr,mass,close_karkas=true){
    //вернет каркас из повернутого вокруг оси ребра, состоящего из нескольких последовательно соединеных дуг ( каждая дуга = 4 точки безье, отдельный элемент массива)
    var parts = [];
    for (var i = 0;i<aarc.length;i++){
        parts.push( arc4_rotated_karkas_maker(aarc[i],cdot,vr,mass,close_karkas) );
    }
    rez=[];
    for (var i = 0;i<parts[0].length;i++){ //how much , depend from mass
        var multiarc = [];
        for(var ii = 0;ii<parts.length;ii++){ //how much continue bezier parts
            multiarc.push( parts[ii][i] );
        }
        rez.push( multiarc );
    }
    return rez;
}

function showPathArray(apath){
    for (var i=0;i<apath.length;i++){ showPath(apath[i]); }
}
function showPath(path) {
    var line = BABYLON.Mesh.CreateLines("line", path, scene )
};