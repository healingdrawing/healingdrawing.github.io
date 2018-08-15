
function one_ring_maker(
    dz,
    end_offset,
    end_l,
    ring_offset,
    ring_length,
    ring_width,
    ring_radius,
    cur,
    mat_ind,
    id,
    vn,vr,c
){
    //new code
    var center_offset = dz + end_offset + end_l / 2 + ring_offset ;
    var cdot = geo.dotXDoffset(c,vn,center_offset);
    cdot = geo.dotXDoffset(cdot,vr,ring_radius);
    // console.log(JSON.stringify( cdot ));//ok
    //complex bezier from two curves for rotation
    var dot1 = geo.dotXDoffset(cdot,vn,-ring_length / 2);
    // var lever1 = geo.dotXDoffset(dot1,vr,ring_width / 2 * cur);
    // var lever2 = geo.dotXDoffset(cdot,vr,ring_width / 2);
    // var dot2 = lever2;
    var lever1 = dot1;
    var dot2 = geo.dotXDoffset(cdot,vr,ring_width / 2);
    var lever2 = geo.dotXDoffset(dot2,vn,-ring_length / 2 * cur);
    
    var curve1 = [dot1,lever1,lever2,dot2];
    var curve2 = geo.curve3Drotate(curve1,cdot,vr,180);
    var curve3 = geo.curve3Drotate(curve2,cdot,vn,180);
    curve2.reverse(); //reverse curve for connection
    var curve4 = geo.curve3Drotate(curve1,cdot,vn,180);
    curve4.reverse(); //for continued connection
    var arrarc = [curve1,curve2,curve3,curve4];
    // console.log(JSON.stringify( arrarc ));//ok
    var mass = 60; //number of repeats around axis, into rotated karkas
    var karkas = continued_arc4_rotated_karkas_maker(arrarc,c,vn,mass);
    // console.log( karkas );//??? ? LOOKS LIKE THIS SHIP PLACE .... ship ))))
    //need another mass that configure quality
    mass = 20;
    var skeleton = continued_bez_array_getPoints_maker(karkas,mass);
    
    
    ring_section.push( BABYLON.MeshBuilder.CreateRibbon(id, { pathArray: skeleton },  scene )  );
    var ind = ring_section.length-1;
    // console.log( bottle_section[ind] );
    ring_section[ind].material = tail_section_mat[mat_ind-1];
}
function ring_maker(d,dz,vn,va,c){
    for (var i=1;i<6;i++){
        var tail_end_l = d[i][7];
        
        var ring_radius = d[i][11];
        var ring_length = d[i][15];
        var ring_width = d[i][19];
        
        
        var checksize = Math.min(ring_radius,ring_length,ring_width);
        if( checksize > 0 ){//draw bottles for this section
            var ring_offset = d[i][23];
            
            var tail_end_offset = d[i][6];
            var tail_dz = dz[i];
            var ring_curvature = d[1][2] / 100;
            var tail_mat_ind = i;
            
            var vr = va;
            var id = "ring_" + i.toString();
            one_ring_maker(
                tail_dz,
                tail_end_offset,
                tail_end_l,
                ring_offset,
                ring_length,
                ring_width,
                ring_radius,
                ring_curvature,
                tail_mat_ind,
                id,
                vn,vr,c
            )
            
        }
    }
}