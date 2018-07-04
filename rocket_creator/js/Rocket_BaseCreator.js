
function base_maker(d,dz,vn,va,c){
    
    for (i=1;i<6;i++){ //section number loop
        if (d[i][1] > 0){ //if <= 0 then not draw base section
            var z0 = dz[i]; var y0 = d[i][1];
            var z1 = z0 + d[i][0] ; var y0 = d[i][1];
            var dot0 = geo.dotXDoffset(c,vn,dz[i]);
            var dot1 = geo.dotXDoffset(dot0,vn,d[i][0]);
            dot0 = geo.dotXDoffset(dot0,va,d[i][1]);
            if (i>1){ dot1 = geo.dotXDoffset(dot1,va,dot[i-1][1]) }
            var lever0 = dot0; var lever1 = dot1;
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
            skeleton = bez_array_maker(skeleton,mass); //BABYLON bezier curves array
            showPathArray(skeleton);
            console.log(skeleton);
            var meshExp = new BABYLON.Mesh("meshExp"+i.toString() , scene);
            createRibbon(meshExp, skeleton, false);
            console.log(meshExp);
            meshExp.material = base_section_mat[i-1];
            base_section.push(meshExp);
            
        }
    }
}