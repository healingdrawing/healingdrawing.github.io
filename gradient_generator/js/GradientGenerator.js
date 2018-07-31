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

function generate_steps(d){
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
    // console.log(JSON.stringify(d));
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
    // var d = get_gui_values_as_object();
    
    
    // console.log(JSON.stringify(d["steps"]));
    // console.log(JSON.stringify(d));
    generate_gradient(d);
}