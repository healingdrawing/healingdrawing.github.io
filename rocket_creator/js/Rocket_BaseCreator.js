
function base_maker(d,dz,vn,va,c){
    // console.log("dz = ",dz);
    for (var i=1;i<6;i++){ //section number loop
        var section_radius = d[i][1];
        if (section_radius > 0){ //if <= 0 then not draw base section
            var section_length = d[i][0];
            var dot0 = geo.dotXDoffset(c,vn,dz[i]);
            var dot1 = geo.dotXDoffset(dot0,vn,section_length);
            dot0 = geo.dotXDoffset(dot0,va,section_radius);
            if (i>1){ dot1 = geo.dotXDoffset(dot1,va,d[i-1][1]) }
            var lever0 = dot0.slice();
            var lever1 = dot1.slice();
            var cur = d[i][2] / 100; //curvature %/100
            if ( cur != 0 ){
                if (i>1){
                    lever0 = geo.dotXDoffset(lever0,vn,cur*section_length);
                    lever1 = geo.dotXDoffset(lever1,vn,-cur*section_length);
                }
                else{ //rocket nose
                    if (cur < - 1){ cur = -1;} else if (cur > 1){cur = 1;}
                    lever1 = geo.dotXDoffset(lever1,va,cur*section_radius);
                }
            }
            var arc = [dot0,lever0,lever1,dot1]; // arc for ribbon
            var mass = 60;
            var skeleton = arc4_rotated_karkas_maker(arc,c,vn,mass);
            mass = 20;
            skeleton = bez_array_getPoints_maker(skeleton,mass); //BABYLON bezier curves array getPoints
            // showPathArray(skeleton);
            // console.log(skeleton);
            
            base_section.push( BABYLON.MeshBuilder.CreateRibbon("meshExp"+i.toString(), { pathArray: skeleton },  scene )  );
            
            var ind = base_section.length-1;
            // console.log(base_section[ind]);
            base_section[ind].material = base_section_mat[i-1];
            
        }
    }//console.log("bs",base_section);
}