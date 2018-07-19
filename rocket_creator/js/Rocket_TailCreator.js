
function one_tail_maker(
    dz,
    r,
    start_offset,
    start_l,
    end_offset,
    end_l,
    start_w,
    end_w,
    cur,
    mat_ind,
    id,
    vn,vr,c
){
    var vs = geo.vec3Dnormal(vn,vr); //vector side
    //tail start section
    var s_dot0 = geo.dotXDoffset(c, vn, dz + start_offset);
    var s_dot0_c = geo.dotXDoffset(s_dot0,vn,-start_w / 2); //step back to half width for 90 dergees back edge
    var s_dot0_m = geo.dotXDoffset(s_dot0,vs,-start_w / 2); //step side minus direction
    var s_dot0_p = geo.dotXDoffset(s_dot0,vs,start_w / 2); //step side plus direction
    
    var s_dot1 = geo.dotXDoffset(s_dot0, vn, start_l);
    var s_dot1_c = geo.dotXDoffset(s_dot1,vn,start_w / 2); //step front to half width for 90 dergees front edge
    var s_dot1_m = geo.dotXDoffset(s_dot1,vs,-start_w / 2); //step side minus direction
    var s_dot1_p = geo.dotXDoffset(s_dot1,vs,start_w / 2); //step side plus direction
    //tail end section
    var e_dot0 = geo.dotXDoffset(c, vn, dz + end_offset);
    var e_dot0 = geo.dotXDoffset(e_dot0,vr,r);
    var e_dot0_c = geo.dotXDoffset(e_dot0,vn,-end_w / 2); //step back to half width for 90 dergees back edge
    var e_dot0_m = geo.dotXDoffset(e_dot0,vs,-end_w / 2); //step side minus direction
    var e_dot0_p = geo.dotXDoffset(e_dot0,vs,end_w / 2); //step side plus direction
    
    var e_dot1 = geo.dotXDoffset(e_dot0, vn, end_l);
    // var e_dot1 = geo.dotXDoffset(e_dot1,vr,r);
    var e_dot1_c = geo.dotXDoffset(e_dot1,vn,end_w / 2); //step front to half width for 90 dergees front edge
    var e_dot1_m = geo.dotXDoffset(e_dot1,vs,-end_w / 2); //step side minus direction
    var e_dot1_p = geo.dotXDoffset(e_dot1,vs,end_w / 2); //step side plus direction
    
    //preparing arcs for ribbon skeletons
    var cd = ( start_offset + start_l - ( end_offset + end_l ) ) * cur; //curvature_distance for tail
    //for big ribbon
    var a_se0_c = [s_dot0_c, s_dot0_c, geo.dotXDoffset(e_dot0_c, vn, cd), e_dot0_c]; // back center curve
    var a_se0_m = [s_dot0_m, s_dot0_m, geo.dotXDoffset(e_dot0_m, vn, cd), e_dot0_m]; // back minus curve
    var a_se0_p = [s_dot0_p, s_dot0_p, geo.dotXDoffset(e_dot0_p, vn, cd), e_dot0_p]; // back plus curve
    
    var a_se1_c = [s_dot1_c, s_dot1_c, geo.dotXDoffset(e_dot1_c, vn, cd), e_dot1_c]; // front center curve
    var a_se1_m = [s_dot1_m, s_dot1_m, geo.dotXDoffset(e_dot1_m, vn, cd), e_dot1_m]; // front minus curve
    var a_se1_p = [s_dot1_p, s_dot1_p, geo.dotXDoffset(e_dot1_p, vn, cd), e_dot1_p]; // front plus curve
    
    var big_ribbon_skeleton = [a_se0_c, a_se0_m, a_se1_m, a_se1_c, a_se1_p, a_se0_p,a_se0_c]; //may be need reverse direct , need test
    
    //for cap tail end x4 strait line shape arc for two ribbons
    var a_ee1_mc = [e_dot1_m,e_dot1_m,e_dot1_c,e_dot1_c];
    var a_ee0_mc = [e_dot0_m,e_dot0_m,e_dot0_c,e_dot0_c];
    
    var a_ee1_pc = [e_dot1_p,e_dot1_p,e_dot1_c,e_dot1_c];
    var a_ee0_pc = [e_dot0_p,e_dot0_p,e_dot0_c,e_dot0_c];
    
    var minus_center_ribbon = [ a_ee0_mc,a_ee1_mc];
    // var minus_center_ribbon = [a_ee1_mc, a_ee0_mc]; // need reversed or black face
    var plus_center_ribbon = [a_ee1_pc, a_ee0_pc];
    
    var mass = 20; //for bezier number dots
    var big_skeleton = bez_array_getPoints_maker(big_ribbon_skeleton,mass);
    mass = 8;
    var minus_skeleton = bez_array_getPoints_maker(minus_center_ribbon,mass);
    var plus_skeleton = bez_array_getPoints_maker(plus_center_ribbon,mass);
    var skeleton = [big_skeleton,minus_skeleton,plus_skeleton];
    var name = ["big_","minus_","plus_"];
    
    for (var i=0;i<3;i++){
        tail_section.push( BABYLON.MeshBuilder.CreateRibbon(id + name[i] + i.toString(), { pathArray: skeleton[i] },  scene )  );
        var ind = tail_section.length-1;
        // console.log(tail_section[ind]);
        tail_section[ind].material = tail_section_mat[mat_ind-1];
    }
}
function tail_maker(d,dz,vn,va,c){
    for (var i=1;i<6;i++){
        var tail_r = d[i][3];
        var tail_start_l = d[i][5];
        var tail_end_l = d[i][7];
        var tail_start_w = d[i][20];
        var tail_end_w = d[i][21];
        var tail_n = d[i][22];
        var checksize = Math.min(tail_r, tail_start_l, tail_end_l, tail_start_w, tail_end_w, tail_n);
        if( checksize > 0 ){//draw tail for this section
            var tail_start_offset = d[i][4];
            var tail_end_offset = d[i][6];
            var tail_dz = dz[i];
            var tail_curvature = d[i][2] / 100;
            var tail_mat_ind = i;
            var n = Math.ceil(tail_n);//just for case of stupid incoming data
            var step = 360 / n;
            for (var ii=0;ii<n;ii++){
                var vr = geo.vec3Drotate(va,vn,ii*step);
                var id = "tail_" + i.toString() + "_" + (ii+1).toString();
                one_tail_maker(
                    tail_dz,
                    tail_r,
                    tail_start_offset,
                    tail_start_l,
                    tail_end_offset,
                    tail_end_l,
                    tail_start_w,
                    tail_end_w,
                    tail_curvature,
                    tail_mat_ind,
                    id,
                    vn,vr,c
                )
            }
        }
    }
}