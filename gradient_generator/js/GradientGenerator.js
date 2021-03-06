var fullsize=1000; //limit for calculation
var scale=1;//will be changed
var gradient_steps = []; //steps array

function random_prefix_counter(d,prefix){
    if (!d[prefix+"_lock_value"]){
        if ( !d[prefix+"_lock_minmax"] ){
            d[prefix+"_min"]=random_int(0,100);
            d[prefix+"_max"]=random_int(d[prefix+"_min"],100);
        }d[prefix]=random_int(d[prefix+"_min"],d[prefix+"_max"]);
    }
}

function generate_random_radius(d){
    if(d["radius_lock_value"]){ var radius = d["radius"]; }else{ var radius = random_int(d["radius_min"],d["radius_max"]); }
    return radius;
}

function generate_full_steps(d){
    var steps = [];
    var sumsize = 0;
    for (var i=0;i<d["steps"];i++){
        if(d["step_size_lock_value"]){ var step_size = d["step_size"]; }else{ var step_size = random_int(d["step_size_min"],d["step_size_max"]); }
        steps.push(step_size);
        sumsize += step_size;
    }
    return [steps,sumsize];
}

function generate_full_holes(d){
    var holes = [];
    var sumsize = 0;
    for (var i=0;i<d["steps"];i++){
        if(d["hole_size_lock_value"]){ var hole_size = d["hole_size"]; }else{ var hole_size = random_int(d["hole_size_min"],d["hole_size_max"]); }
        holes.push(hole_size);
        sumsize += hole_size;
    }
    return [holes,sumsize];
}

function calculate_relative_center_hole(so){
    var rez = [];
    //center hole
    var chole = {};
    chole["offset_start"] = 0;
    chole["offset_end"] = so;
    chole["alpha_start"]=0;
    chole["alpha_end"]=0;
    chole["red_start"]=0;
    chole["green_start"]=0;
    chole["blue_start"]=0;
    chole["red_end"]=0;
    chole["green_end"]=0;
    chole["blue_end"]=0;
    rez.push(chole);
    return rez;
}

function calculate_relative_steps_holes(steps,holes,scale,start_offset){
    var r_steps = [];
    var r_holes = [];
    var so = start_offset;
    for (var i=0;i<steps.length;i++){
        var step = {};
        step["offset_start"] = so;
        var step_size = steps[i] * scale; //now step_size is relative
        step["offset_end"] = so + step_size;
        so += step_size;
        r_steps.push(step);
        
        var hole = {};
        hole["offset_start"] = so;
        var hole_size = holes[i] * scale; //now hole_size is relative
        hole["offset_end"] = so + hole_size;
        so += hole_size;
        r_holes.push(hole);
    }
    return [r_steps, r_holes];
}

function calculate_color_steps(d){
    var rez = [];
    for (var i=0;i<d["steps"];i++){
        if(d["red_lock_value"]){ var red = d["red"]; }else{ var red = random_int(d["red_min"],d["red_max"]); }
        if(d["green_lock_value"]){ var green = d["green"]; }else{ var green = random_int(d["green_min"],d["green_max"]); }
        if(d["blue_lock_value"]){ var blue = d["blue"]; }else{ var blue = random_int(d["blue_min"],d["blue_max"]); }
        if(d["monochrome"]){
            var min_rgb = Math.min(red,green,blue);
            var max_rgb = Math.max(red,green,blue);
            var rgb = random_int(min_rgb,max_rgb);
            red = rgb; green = rgb; blue = rgb;
        }
        if(d["alpha_start_lock_value"]){ var alpha_start = d["alpha_start"]; }else{ var alpha_start = random_int(d["alpha_start_min"],d["alpha_start_max"]); }
        if(d["alpha_end_lock_value"]){ var alpha_end = d["alpha_end"]; }else{ var alpha_end = random_int(d["alpha_end_min"],d["alpha_end_max"]); }
        var step = {};
        step["red_start"] = red;
        step["green_start"] = green;
        step["blue_start"] = blue;
        step["red_end"] = red;
        step["green_end"] = green;
        step["blue_end"] = blue;
        step["alpha_start"] = alpha_start;
        step["alpha_end"] = alpha_end;
        rez.push(step);
    }
    // console.log("color_step",rez);
    return rez;
}

function calculate_color_holes(d, steps){
    var rez = [];
    for (var i=0;i<d["steps"];i++){
        var hole = {};
        if (d["smooth"]){
            hole["alpha_start"] = steps[i]["alpha_end"];
            hole["red_start"] = steps[i]["red_end"];
            hole["green_start"] = steps[i]["green_end"];
            hole["blue_start"] = steps[i]["blue_end"];
            
            if(i==steps.length-1){
                hole["alpha_end"] = 0;
                hole["red_end"] = 0;
                hole["green_end"] = 0;
                hole["blue_end"] = 0;
            }else{
                hole["alpha_end"] = steps[i+1]["alpha_start"];
                hole["red_end"] = steps[i+1]["red_start"];
                hole["green_end"] = steps[i+1]["green_start"];
                hole["blue_end"] = steps[i+1]["blue_start"];
            }
        }else{
            hole["alpha_start"] = 0;
            hole["red_start"] = 0;
            hole["green_start"] = 0;
            hole["blue_start"] = 0;
            hole["alpha_end"] = 0;
            hole["red_end"] = 0;
            hole["green_end"] = 0;
            hole["blue_end"] = 0;
        }
        rez.push(hole);
    }return rez;
}

function build_final_steps(box){
    // relative_center_hole, relative_steps, relative_holes, color_steps, color_holes
    rch = box[0]; rs = box[1]; rh = box[2]; cs = box[3]; ch = box[4];
    rez = [];
    rez.push(rch[0]); //hole added
    for (var i=0;i<rs.length;i++){
        var step = {};
        step["offset_start"] = rs[i]["offset_start"];
        step["offset_end"] = rs[i]["offset_end"];
        step["alpha_start"] = cs[i]["alpha_start"];
        step["alpha_end"] = cs[i]["alpha_end"];
        step["red_start"] = cs[i]["red_start"];
        step["green_start"] = cs[i]["green_start"];
        step["blue_start"] = cs[i]["blue_start"];
        step["red_end"] = cs[i]["red_end"];
        step["green_end"] = cs[i]["green_end"];
        step["blue_end"] = cs[i]["blue_end"];
        rez.push(step);
        
        var hole = {};
        hole["offset_start"] = rh[i]["offset_start"];
        hole["offset_end"] = rh[i]["offset_end"];
        hole["alpha_start"] = ch[i]["alpha_start"];
        hole["alpha_end"] = ch[i]["alpha_end"];
        hole["red_start"] = ch[i]["red_start"];
        hole["green_start"] = ch[i]["green_start"];
        hole["blue_start"] = ch[i]["blue_start"];
        hole["red_end"] = ch[i]["red_end"];
        hole["green_end"] = ch[i]["green_end"];
        hole["blue_end"] = ch[i]["blue_end"];
        rez.push(hole);
    }return rez;
}

function generate_steps(d){
    var radius = generate_random_radius(d);
    var data = generate_full_steps(d);
    var full_steps = data[0]; // step absolute
    var sumsize_steps = data[1];
    data = generate_full_holes(d);
    var full_holes = data[0]; // hole absolute
    var sumsize_holes = data[1];
    var sumsize = sumsize_steps + sumsize_holes;
    // console.log("r",radius,"\nfs",full_steps,"\nfh",full_holes,"\nsss",sumsize_steps,"\nssh",sumsize_holes); //ok
    var so = radius; //center hole offset ... start offset
    var go = 100 - so; //gradient offset ... from hole offset end to gradient border
    var scale = go / sumsize;
    // console.log("scale",scale);
    var relative_center_hole = calculate_relative_center_hole(so); //[{}]
    data = calculate_relative_steps_holes(full_steps,full_holes,scale,so);
    var relative_steps = data[0]; //[{},{}...]
    var relative_holes = data[1]; //[{},{}...]
    var color_steps = calculate_color_steps(d); // r g b a r g b a [{},{}...]
    var color_holes = calculate_color_holes(d,color_steps); // r g b a r g b a [{},{}...]
    var box = [relative_center_hole,relative_steps,relative_holes,color_steps,color_holes];
    // console.log("rch",relative_center_hole,"\nrs",relative_steps,"\nrh",relative_holes,"\ncs",color_steps,"\nch",color_holes);
    var final_steps = build_final_steps(box);
    // console.log("final_steps",final_steps);
    return final_steps;
}

function old_generate_steps(d){
    var steps = [];
    var sumsize=0;
    for (var i=0;i<d["steps"];i++){
        //sizes
        if(d["step_size_lock_value"]){ var step_size = d["step_size"]; }else{ var step_size = random_int(d["step_size_min"],d["step_size_max"]); }
        if(d["hole_size_lock_value"]){ var hole_size = d["hole_size"]; }else{ var hole_size = random_int(d["hole_size_min"],d["hole_size_max"]); }
        hole_size = step_size * hole_size / 100;
        step_size -= hole_size;
        sumsize += step_size+hole_size;
        //alpha
        if(d["alpha_start_lock_value"]){ var alpha_start = d["alpha_start"]; }else{ var alpha_start = random_int(d["alpha_start_min"],d["alpha_start_max"]); }
        if(d["alpha_end_lock_value"]){ var alpha_end = d["alpha_end"]; }else{ var alpha_end = random_int(d["alpha_end_min"],d["alpha_end_max"]); }
        //colors
        if(d["red_lock_value"]){ var red = d["red"]; }else{ var red = random_int(d["red_min"],d["red_max"]); }
        if(d["green_lock_value"]){ var green = d["green"]; }else{ var green = random_int(d["green_min"],d["green_max"]); }
        if(d["blue_lock_value"]){ var blue = d["blue"]; }else{ var blue = random_int(d["blue_min"],d["blue_max"]); }
        if(d["monochrome"]){
            var min_rgb = Math.min(red,green,blue);
            var max_rgb = Math.max(red,green,blue);
            var rgb = random_int(min_rgb,max_rgb);
            red = rgb; green = rgb; blue = rgb;
        }
        var step = {};
        step["red"] = red;
        step["green"] = green;
        step["blue"] = blue;
        step["alpha_start"] = alpha_start;
        step["alpha_end"] = alpha_end;
        step["step_size"] = step_size;
        step["hole_size"] = hole_size;
        steps.push(step);
    }
    
    //relative steps
    var so = d["radius"] / 100; //center hole offset ... start offset
    var go = 1 - so; //gradient offset ... from hole offset end to gradient border
    var scale = go / sumsize;
    // var fullro = so; //full_relative_offset
    var rez = [];
    //center hole
    var chole = {};
    chole["offset_start"] = 0;
    chole["offset_end"] = so;
    chole["alpha_start"]=0;
    chole["alpha_end"]=0;
    chole["red_start"]=0;
    chole["green_start"]=0;
    chole["blue_start"]=0;
    chole["red_end"]=0;
    chole["green_end"]=0;
    chole["blue_end"]=0;
    rez.push(chole);
    
    for (var i=0;i<steps.length;i++){
        //step
        var step = {};
        step["offset_start"] = so;
        var step_size = steps[i]["step_size"] * scale; //now step_size is relative
        step["offset_end"] = so + step_size;
        so += step_size;
        step["alpha_start"]=steps[i]["alpha_start"];
        step["alpha_end"]=steps[i]["alpha_end"];
        step["red_start"]=steps[i]["red"];
        step["green_start"]=steps[i]["green"];
        step["blue_start"]=steps[i]["blue"];
        step["red_end"]=steps[i]["red"];
        step["green_end"]=steps[i]["green"];
        step["blue_end"]=steps[i]["blue"];
        rez.push(step);
        //hole
        var hole = {};
        hole["offset_start"] = so;
        var hole_size = steps[i]["hole_size"] * scale;
        hole["offset_end"] = so + hole_size;
        so += hole_size;
        if (d["smooth"]){
            hole["alpha_start"] = steps[i]["alpha_end"];
            hole["red_start"] = steps[i]["red"];
            hole["green_start"] = steps[i]["green"];
            hole["blue_start"] = steps[i]["blue"];
            
            if(i==steps.length-1){
                hole["alpha_end"] = 0;
                hole["red_end"] = 0;
                hole["green_end"] = 0;
                hole["blue_end"] = 0;
            }else{
                hole["alpha_end"] = steps[i+1]["alpha_start"];
                hole["red_end"] = steps[i+1]["red"];
                hole["green_end"] = steps[i+1]["green"];
                hole["blue_end"] = steps[i+1]["blue"];
            }
        }else{
            hole["alpha_start"] = 0;
            hole["red_start"] = 0;
            hole["green_start"] = 0;
            hole["blue_start"] = 0;
            hole["alpha_end"] = 0;
            hole["red_end"] = 0;
            hole["green_end"] = 0;
            hole["blue_end"] = 0;
        }
        rez.push(hole);
    }
    
    return rez;
}


function generate_gradient(d){
    
    var steps = generate_steps(d);
    gradient_steps = steps;
    generate_svg_preview(steps);
}

function random_all(){
    var d = get_gui_values_as_object();
    
    var prefix = [
        "steps",
        "step_size",
        "hole_size",
        "radius",
        "red",
        "green",
        "blue",
        "alpha_start",
        "aplha_end"
    ];
    for (var i=0;i<prefix.length;i++){
        random_prefix_counter(d,prefix[i]); //generate random gui values
    }
    
    write_values(d);
    
    generate_gradient(d);
    showme("random all completed");
}

function random_full_steps(d,s_n){
    var steps = [];
    var sumsize = 0;
    for (var i=0;i<s_n;i++){
        if(d["step_size_lock_value"]){ var step_size = d["step_size"]; }else{ var step_size = random_int(d["step_size_min"],d["step_size_max"]); }
        steps.push(step_size);
        sumsize += step_size;
    }
    return [steps,sumsize];
}
function random_full_holes(d,s_n){
    var holes = [];
    var sumsize = 0;
    for (var i=0;i<s_n;i++){
        if(d["hole_size_lock_value"]){ var hole_size = d["hole_size"]; }else{ var hole_size = random_int(d["hole_size_min"],d["hole_size_max"]); }
        holes.push(hole_size);
        sumsize += hole_size;
    }
    return [holes,sumsize];
}
function random_size(){
    if (gradient_steps.length == 0){
        showme("1 random all -> 2 random step");
    }else{
        var d = get_gui_values_as_object();
        var prefix = [ "step_size","hole_size" ];
        for (var i=0;i<prefix.length;i++){ random_prefix_counter(d,prefix[i]); }write_values(d);
        var s_n = (gradient_steps.length - 1) / 2; // steps number
        var radius = gradient_steps[0]["offset_end"];
        
        var data = random_full_steps(d,s_n);
        var full_steps = data[0]; // step absolute
        var sumsize_steps = data[1];
        data = random_full_holes(d,s_n);
        var full_holes = data[0]; // hole absolute
        var sumsize_holes = data[1];
        var sumsize = sumsize_steps + sumsize_holes;
        var so = radius; //center hole offset ... start offset
        var go = 100 - so; //gradient offset ... from hole offset end to gradient border
        var scale = go / sumsize;
        data = calculate_relative_steps_holes(full_steps,full_holes,scale,so);
        var relative_steps = data[0]; //[{},{}...]
        var relative_holes = data[1]; //[{},{}...]
        for (var i=0;i<s_n;i++){
            var gsi = 1 + (i * 2);//gradient_steps index
            //step
            gradient_steps[gsi]["offset_start"] = relative_steps[i]["offset_start"];
            gradient_steps[gsi]["offset_end"] = relative_steps[i]["offset_end"];
            so += steps[i];
            //hole
            gradient_steps[gsi+1]["offset_start"] = relative_holes[i]["offset_start"];
            gradient_steps[gsi+1]["offset_end"] = relative_holes[i]["offset_end"];
            // if(i<s_n-1){
            //     gradient_steps[gsi+1]["offset_end"] = so + hole_size;
            //     so += hole_size;
            // }else{ gradient_steps[gsi+1]["offset_end"] = 100; }
        }
        generate_svg_preview(gradient_steps);
        showme("random size completed");
    }
}

function random_color_steps(d,s_n){
    var rez = [];
    for (var i=0;i<s_n;i++){
        if(d["red_lock_value"]){ var red = d["red"]; }else{ var red = random_int(d["red_min"],d["red_max"]); }
        if(d["green_lock_value"]){ var green = d["green"]; }else{ var green = random_int(d["green_min"],d["green_max"]); }
        if(d["blue_lock_value"]){ var blue = d["blue"]; }else{ var blue = random_int(d["blue_min"],d["blue_max"]); }
        if(d["monochrome"]){
            var min_rgb = Math.min(red,green,blue);
            var max_rgb = Math.max(red,green,blue);
            var rgb = random_int(min_rgb,max_rgb);
            red = rgb; green = rgb; blue = rgb;
        }
        if(d["alpha_start_lock_value"]){ var alpha_start = d["alpha_start"]; }else{ var alpha_start = random_int(d["alpha_start_min"],d["alpha_start_max"]); }
        if(d["alpha_end_lock_value"]){ var alpha_end = d["alpha_end"]; }else{ var alpha_end = random_int(d["alpha_end_min"],d["alpha_end_max"]); }
        var step = {};
        step["red_start"] = red;
        step["green_start"] = green;
        step["blue_start"] = blue;
        step["red_end"] = red;
        step["green_end"] = green;
        step["blue_end"] = blue;
        step["alpha_start"] = alpha_start;
        step["alpha_end"] = alpha_end;
        rez.push(step);
    }
    // console.log("color_step",rez);
    return rez;
}
function random_color_holes(d, steps, s_n){
    var rez = [];
    for (var i=0;i<s_n;i++){
        var hole = {};
        if (d["smooth"]){
            hole["alpha_start"] = steps[i]["alpha_end"];
            hole["red_start"] = steps[i]["red_end"];
            hole["green_start"] = steps[i]["green_end"];
            hole["blue_start"] = steps[i]["blue_end"];
            
            if(i==steps.length-1){
                hole["alpha_end"] = 0;
                hole["red_end"] = 0;
                hole["green_end"] = 0;
                hole["blue_end"] = 0;
            }else{
                hole["alpha_end"] = steps[i+1]["alpha_start"];
                hole["red_end"] = steps[i+1]["red_start"];
                hole["green_end"] = steps[i+1]["green_start"];
                hole["blue_end"] = steps[i+1]["blue_start"];
            }
        }else{
            hole["alpha_start"] = 0;
            hole["red_start"] = 0;
            hole["green_start"] = 0;
            hole["blue_start"] = 0;
            hole["alpha_end"] = 0;
            hole["red_end"] = 0;
            hole["green_end"] = 0;
            hole["blue_end"] = 0;
        }
        rez.push(hole);
    }return rez;
}
function random_color(){
    if (gradient_steps.length == 0){
        showme("1 random all -> 2 random color");
    }else{
        var d = get_gui_values_as_object();
        var prefix = [ "red", "green", "blue", "alpha_start", "aplha_end" ];
        for (var i=0;i<prefix.length;i++){ random_prefix_counter(d,prefix[i]); }write_values(d);
        var s_n = (gradient_steps.length - 1) / 2; // steps number
        
        var color_steps = random_color_steps(d, s_n);
        var color_holes = random_color_holes(d, color_steps, s_n);
        
        for (var i=0;i<s_n;i++){
            var gsi = 1 + (i * 2);//gradient_steps index
            //step
            gradient_steps[gsi]["red_start"] = color_steps[i]["red_start"];
            gradient_steps[gsi]["red_end"] = color_steps[i]["red_end"];
            gradient_steps[gsi]["green_start"] = color_steps[i]["green_start"];
            gradient_steps[gsi]["green_end"] = color_steps[i]["green_end"];
            gradient_steps[gsi]["blue_start"] = color_steps[i]["blue_start"];
            gradient_steps[gsi]["blue_end"] = color_steps[i]["blue_end"];
            gradient_steps[gsi]["alpha_start"] = color_steps[i]["alpha_start"];
            gradient_steps[gsi]["alpha_end"] = color_steps[i]["alpha_end"];
            //hole
            gradient_steps[gsi+1]["red_start"] = color_holes[i]["red_start"];
            gradient_steps[gsi+1]["red_end"] = color_holes[i]["red_end"];
            gradient_steps[gsi+1]["green_start"] = color_holes[i]["green_start"];
            gradient_steps[gsi+1]["green_end"] = color_holes[i]["green_end"];
            gradient_steps[gsi+1]["blue_start"] = color_holes[i]["blue_start"];
            gradient_steps[gsi+1]["blue_end"] = color_holes[i]["blue_end"];
            gradient_steps[gsi+1]["alpha_start"] = color_holes[i]["alpha_start"];
            gradient_steps[gsi+1]["alpha_end"] = color_holes[i]["alpha_end"];
        }
        generate_svg_preview(gradient_steps);
        showme("random size completed");
    }
}

var limit_size_number = 0; //0 1 2 3
function limit_size(){
    var d = get_gui_values_as_object();
    if (limit_size_number <3){ limit_size_number += 1; }else{ limit_size_number = 0; }
    var min_step; var max_step;
    var min_hole; var max_hole;
    var name;
    var x = limit_size_number;
    if (x==0){ min_step = 0; max_step = 100; min_hole = 0; max_hole = 100; name = "standard size: step 0...100  hole 0...100" ;}
    else if (x==1){ min_step = 0; max_step = 50; min_hole = 50; max_hole = 100; name = "big hole size: step 0...50  hole 50...100" ;}
    else if (x==2){ min_step = 50; max_step = 100; min_hole = 0; max_hole = 50; name = "big step size: step 50...100  hole 0...50" ;}
    else if (x==3){ min_step = 50; max_step = 50; min_hole = 50; max_hole = 50; name = "balanced size: step 50...50 hole 50...50" ;}
    
    d["step_size_min"]=min_step;
    d["step_size_max"]=max_step;
    d["hole_size_min"]=min_hole;
    d["hole_size_max"]=max_hole;
    // console.log(d);
    write_values(d);
    showme(name);
}

var limit_alpha_number = 0; //0 1 2 3
function limit_alpha(){
    var d = get_gui_values_as_object();
    if (limit_alpha_number <3){ limit_alpha_number += 1; }else{ limit_alpha_number = 0; }
    var min_alpha_start; var max_alpha_start;
    var min_alpha_end; var max_alpha_end;
    var name;
    var x = limit_alpha_number;
    if (x==0){ min_alpha_start = 0; max_alpha_start = 255; min_alpha_end = 0; max_alpha_end = 255; name = "alpha: start 0...255  end 0...255" ;}
    else if (x==1){ min_alpha_start = 0; max_alpha_start = 127; min_alpha_end = 127; max_alpha_end = 255; name = "alpha: start 0...127  end 127...255" ;}
    else if (x==2){ min_alpha_start = 127; max_alpha_start = 255; min_alpha_end = 0; max_alpha_end = 127; name = "alpha: start 127...255  end 0...127" ;}
    else if (x==3){ min_alpha_start = 255; max_alpha_start = 255; min_alpha_end = 255; max_alpha_end = 255; name = "alpha: start 255...255 end 255...255" ;}
    
    d["alpha_start_min"]=min_alpha_start;
    d["alpha_start_max"]=max_alpha_start;
    d["alpha_end_min"]=min_alpha_end;
    d["alpha_end_max"]=max_alpha_end;
    // console.log(d);
    write_values(d);
    showme(name);
}
var gdata = [];
function gui_limit_color_maker(){
    gdata = [
        ["red_min","red_max","green_min","green_max","blue_min","blue_max"],
        [0,255,0,255,0,255],
        [0,127,0,127,0,127],
        [63,191,63,191,63,191],
        [127,255,127,255,127,255],
        [63,191,0,127,0,127],
        
        [63,191,0,127,63,191],
        [63,191,0,127,127,255],
        [63,191,127,255,63,191],
        [0,127,127,255,0,127],
        [127,255,0,127,0,127],
        
        [127,255,0,127,127,255],
        [63,191,63,191,127,255],
        [0,127,127,255,63,191],
        [0,127,63,191,0,127],
        [127,255,63,191,63,191],
        
        [127,255,63,191,127,255],
        [0,127,0,127,127,255],
        [0,127,63,191,63,191],
        [63,191,127,255,0,127],
        
        [127,255,63,191,0,127],
        [127,255,0,127,63,191],
        [0,127,0,127,63,191],
        [0,127,127,255,127,255],
        
        
        [127,255,127,255,63,191],
        [63,191,63,191,0,127],
        [0,127,63,191,127,255],
        [63,191,127,255,127,255],
        [127,255,127,255,0,127],
    ];
    for (var i=1;i<29;i++){
        var div = document.getElementById("lico"+i.toString());
        div.style.background = "linear-gradient(90deg, rgb("+gdata[i][0].toString()+", "+gdata[i][2].toString()+", "+gdata[i][4].toString()+"), rgb("+gdata[i][1].toString()+", "+gdata[i][3].toString()+", "+gdata[i][5].toString()+"))";
    }
    var div = document.getElementById("palette_view");
    div.style.background = "linear-gradient(90deg, rgb("+gdata[1][0].toString()+", "+gdata[1][2].toString()+", "+gdata[1][4].toString()+"), rgb("+gdata[1][1].toString()+", "+gdata[1][3].toString()+", "+gdata[1][5].toString()+"))";
}
gui_limit_color_maker();
var plcn = 1; //palette limit color number 0incoming from gui button 1... 28 from palette
function limit_color(x){
    if (x==0){ if(plcn<28){ plcn += 1; }else{ plcn = 1; } }
    else{
        plcn = x;
    }
    var ids = [
        "red_min","red_max",
        "green_min","green_max",
        "blue_min","blue_max"
    ];
    var vals = [
        gdata[plcn][0],gdata[plcn][1],
        gdata[plcn][2],gdata[plcn][3],
        gdata[plcn][4],gdata[plcn][5]
    ];
    for (var i=0;i<ids.length;i++){
        document.getElementById(ids[i]).value = vals[i];
    }
    
    var div = document.getElementById("palette_view");
    div.style.background = "linear-gradient(90deg, rgb("+vals[0].toString()+", "+vals[2].toString()+", "+vals[4].toString()+"), rgb("+vals[1].toString()+", "+vals[3].toString()+", "+vals[5].toString()+"))";
    
    var text = " R["+vals[0]+"..."+vals[1]+"] G["+vals[2]+"..."+vals[3]+"] B["+vals[4]+"..."+vals[5]+"]";
    showme(text);
}