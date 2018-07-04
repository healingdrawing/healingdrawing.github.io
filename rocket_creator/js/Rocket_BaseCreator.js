
function base_maker(d,dz,vn,va,c){
    console.log("dz = ",dz);
    for (var i=1;i<6;i++){ //section number loop
        if (d[i][1] > 0){ //if <= 0 then not draw base section
            var dot0 = geo.dotXDoffset(c,vn,dz[i]);
            var dot1 = geo.dotXDoffset(dot0,vn,d[i][0]);
            dot0 = geo.dotXDoffset(dot0,va,d[i][1]);
            if (i>1){ dot1 = geo.dotXDoffset(dot1,va,d[i-1][1]) }
            var lever0 = dot0.slice();
            var lever1 = dot1.slice();
            var cur = d[i][2]; //curvature
            if ( cur != 0 ){
                if (i>1){
                    lever0 = geo.dotXDoffset(lever0,vn,cur);
                    lever1 = geo.dotXDoffset(lever1,vn,-cur);
                }
                else{ lever1 = geo.dotXDoffset(lever1,va,cur); } //rocket nose
            }
            var arc = [dot0,lever0,lever1,dot1]; // arc for ribbon
            var mass = 8;
            var skeleton = bezier_rotated_karkas_maker(arc,c,vn,mass);
            skeleton = bez_array_getPoints_maker(skeleton,mass); //BABYLON bezier curves array getPoints
            showPathArray(skeleton);
            console.log(skeleton);
            
            base_section.push( new BABYLON.Mesh("meshExp"+i.toString() , scene) );
            var ind = base_section.length-1;
            createRibbon(base_section[ind], skeleton, false);
            console.log(base_section[ind]);
            base_section[ind].material = base_section_mat[i-1];
            
        }
    }console.log("bs",base_section);
}