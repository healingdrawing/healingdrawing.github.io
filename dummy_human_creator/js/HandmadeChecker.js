
function handmade_arc4_rotated_karkas_maker(arc,cdot,vr,mass,close_karkas=true){
    var rez = [];
    var steps = Math.ceil(mass);
    var step = 360 / steps;
    for (var i=0;i<steps;i++) {
        var c3r = curve3Drotate(arc,cdot,vr,-step * i);
        txtalert(["c3r",c3r]);
        rez.push( c3r );
    } //need - u or internal material
    if (close_karkas) { rez.push(rez[0]); }
    return rez;
}

function curve3Drotate(curve3D,dot3D,vec3D,angle,rad = false){
    var rez = null;
    // console.log("vec3D inside curve3Drotate = ",JSON.stringify(vec3D));
    if(
        curve3D.length == 4 &&
        curve3D[0].length == 3 &&
        geo.same_size_F(curve3D) &&
        dot3D.length == 3 &&
        vec3D.length == 3 &&
        (geo.vecXDnorm(vec3D) > 0)
    ){
        console.log("first check complete");
        console.log("curve3D = ",curve3D);
        if(angle != 0){
            rez = [];
            for (var i=0;i<curve3D.length;i++){
                // console.log("corve3D[i] = ",JSON.stringify(curve3D[i]));
                var dotind = i.toString() + "/" + curve3D.length.toString();
                var d3r = dot3Drotate(curve3D[i], dot3D, vec3D, angle, dotind, rad);
                txtalert(["dotind outside",dotind,"d3r = ",d3r]);
                rez.push( d3r );
            }//need recode too .looks like bug here when same dots calculate as not same
        }
        else{ rez = curve3D; }
    }
    txtalert(["final rez",rez]);
    return rez;
}

function dot3Drotate(
    dot3D,
    dot3Dc,
    vec3D,
    angle,
    dotindex,
    rad=false
    ){
    var rez = null;
    if (geo.vecXDnorm(vec3D) == 0){
        txtalert(["vec length = 0 ==",geo.vecXDnorm(vec3D),"from vec",vec3D]);// miss , not this place fail
        return rez;
    }
    rez = dot3D;
    if (
        geo.vecXDsame(dot3D, dot3Dc) ||
        angle == 0
        ){
            txtalert(["vec same",geo.vecXDsame(dot3D, dot3Dc),"vec1",dot3D,"vec2",dot3Dc]);
            return rez;
        }
    var vdot = geo.vecXD(dot3Dc, dot3D);
    var d = geo.vecXDnorm(vdot);
    vdot = vec3Drotate(vdot, vec3D, angle, dotindex, rad);
    rez = geo.dotXDoffset(dot3Dc, vdot, d);
    if (!rez[0] ){
        // alert(JSON.stringify(vdot));//nullx3
    }
    return rez;
}

function vec3Drotate(
    vec3D,
    vec3Daxis,
    angle,
    dotindex,
    rad=false
    ){
    var rez = vec3D;
    
    var testang=geo.vecXDangle(vec3D,vec3Daxis);
    txtalert(["dotind",dotindex,"ang",testang,"vec",vec3D,"axis",vec3Daxis]);// THIS FAIL WITH ELBOW... ANGLE CLOSE TO 0
    if (
        geo.vecXDparalleled(vec3D, vec3Daxis) ||
        angle == 0
    ){
        txtalert(["vec ||",geo.vecXDparalleled(vec3D, vec3Daxis),"vec",vec3D,"axis",vec3Daxis,"will return rez",rez]);//last point shot this
        return rez;
    }
    
    if(geo.vecXDangle(vec3D,vec3Daxis)==0){
        txtalert(["vecvecang = 0 ==",geo.vecXDangle(vec3D,vec3Daxis),"now return vec3D",vec3D]);
        return vec3D;
    } //looks like this should be in parallel check... additional statement edit vecXDparalleled_sameside() haxe source
    angle = (rad) ? angle : geo.radians(angle);
    var t = [0,0,0];
    var vb = geo.vec3Dnormal(vec3Daxis, vec3D);
    var vc = geo.vec3Dnormal(vb, vec3Daxis);
    var t0 = geo.dotXDoffset(t, vec3Daxis, geo.vecXDnorm(vec3D) * geo.vecXDcos(vec3Daxis, vec3D));
    var t1 = vec3D;
    var v = geo.vecXD(t0, t1);
    t1 = geo.dotXDoffset(t0, vb, geo.vecXDnorm(v) * Math.sin(angle));
    t1 = geo.dotXDoffset(t1, vc, geo.vecXDnorm(v) * Math.cos(angle));
    rez = geo.vecXD(t, t1);
    if (!rez[0]){rez = vec3D;}
    if(Math.abs(testang) <0.0001){
        txtalert(["vecvecang",testang,"rotang",angle,"vb",vb,"vc",vc,"t0",t0,"t1",t1,"rez",rez]);
    }
    return rez;
}