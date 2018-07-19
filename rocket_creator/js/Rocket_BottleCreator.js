
function one_bottle_maker(
    dz,
    r,
    end_offset,
    end_l,
    bottle_offset,
    bottle_length,
    bottle_radius,
    cur,
    mat_ind,
    id,
    vn,vr,c
){
    //new code
    var center_offset = dz + end_offset + end_l / 2 + bottle_offset ;
    var cdot = geo.dotXDoffset(c,vn,center_offset);
    cdot = geo.dotXDoffset(cdot,vr,r);
    // console.log(JSON.stringify( cdot ));//ok
    //complex bezier from two curves for rotation
    var dot1 = geo.dotXDoffset(cdot,vn,-bottle_length / 2);
    var lever1 = geo.dotXDoffset(dot1,vr,bottle_radius * cur);
    var lever2 = geo.dotXDoffset(cdot,vr,bottle_radius);
    var dot2 = lever2;
    var curve1 = [dot1,lever1,lever2,dot2];
    var curve2 = geo.curve3Drotate(curve1,cdot,vr,180);
    curve2.reverse(); //reverse curve for connection
    var arrarc = [curve1,curve2];
    // console.log(JSON.stringify( arrarc ));//ok
    var mass = 60; //number of repeats around axis, into rotated karkas
    var karkas = continued_arc4_rotated_karkas_maker(arrarc,cdot,vn,mass);
    // console.log( karkas );//??? ? LOOKS LIKE THIS SHIP PLACE
    //need another mass that configure quality
    mass = 20;
    var skeleton = continued_bez_array_getPoints_maker(karkas,mass);
    
    
    bottle_section.push( BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: skeleton },  scene )  );
    var ind = bottle_section.length-1;
    // console.log( bottle_section[ind] );
    bottle_section[ind].material = bottle_section_mat[mat_ind-1];
}
function bottle_maker(d,dz,vn,va,c){
    for (var i=1;i<6;i++){
        var tail_r = d[i][3];
        var tail_end_l = d[i][7];
        var tail_n = d[i][22];
        
        var bottle_length = d[i][8];
        var bottle_radius = d[i][9];
        
        
        var checksize = Math.min(bottle_length,bottle_radius);
        if( checksize > 0 ){//draw bottles for this section
            var bottle_offset = d[i][10];
            
            var tail_end_offset = d[i][6];
            var tail_dz = dz[i];
            var bottle_curvature = d[1][2] / 100;
            var tail_mat_ind = i;
            var n = Math.ceil(tail_n);//just for case of stupid incoming data
            var step = 360 / n;
            for (var ii=0;ii<n;ii++){
                var vr = geo.vec3Drotate(va,vn,ii*step);
                var id = "bottle_" + i.toString() + "_" + (ii+1).toString();
                one_bottle_maker(
                    tail_dz,
                    tail_r,
                    tail_end_offset,
                    tail_end_l,
                    bottle_offset,
                    bottle_length,
                    bottle_radius,
                    bottle_curvature,
                    tail_mat_ind,
                    id,
                    vn,vr,c
                )
            }
        }
    }
}