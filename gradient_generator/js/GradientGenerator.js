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

function random_step(){
    
}

function fail_random_step(){
    if (gradient_steps.length == 0){
        showme("1 random all -> 2 random step");
    }else{
        var d = get_gui_values_as_object();
        d["steps"] = (gradient_steps.length-1) / 2;
        var steps = generate_steps(d);
        for (var i=1;i<gradient_steps.length;i += 2){
            var old_step = gradient_steps[i];
            var old_hole = gradient_steps[i+1];
            
            var old_size = old_hole["offset_end"] - old_step["offset_start"];
            var old_step_size = old_step["offset_end"] - old_step["offset_start"];
            var old_step_coef = old_step_size / old_size;
            
            gradient_steps[i]["offset_start"] = steps[i]["offset_start"];
            gradient_steps[i+1]["offset_end"] = steps[i+1]["offset_end"];
            
            var delta = gradient_steps[i]["offset_start"] + (gradient_steps[i+1]["offset_end"] - gradient_steps[i]["offset_start"]) * old_step_coef;
            if (!delta){
                console.log('gradient_steps[i]["offset_start"]',gradient_steps[i]["offset_start"]);
                console.log('gradient_steps[i+1]["offset_end"]',gradient_steps[i+1]["offset_end"]);
                console.log('old_step["offset_start"]',old_step["offset_start"]);
                console.log('old_step["offset_end"]',old_step["offset_end"]);
                console.log('old_hole["offset_end"]',old_hole["offset_end"]);
                console.log('old_step_size',old_step_size);
                console.log('old_size',old_size);
                console.log('old_step_coef',old_step_coef);
                console.log("delta ",delta);
                console.log(gradient_steps[i]["offset_start"] + (gradient_steps[i+1]["offset_end"] - gradient_steps[i]["offset_start"]) * old_step_coef)
            }
            
            gradient_steps[i]["offset_end"] = delta;
            gradient_steps[i+1]["offset_start"] = delta;
            
        }
        generate_svg_preview(gradient_steps);
        showme("random step completed");
    }
}