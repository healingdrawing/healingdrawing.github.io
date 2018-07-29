var fullsize=1000; //limit for calculation
var scale=1;//will be changed
var steps = []; //steps array

function random_prefix_counter(d,prefix){
    if (!d[prefix+"_lock_value"]){
        if ( !d[prefix+"_lock_minmax"] ){
            d[prefix+"_min"]=random_int(0,100);
            d[prefix+"_max"]=random_int(d[prefix+"_min"],100);
        }d[prefix]=random_int(d[prefix+"_min"],d[prefix+"_max"]);
    }
}

function generate_steps(d){
    var rez = [];
    var sumsize=0;
    for (var i=0;i<d["steps"];i++){
        //sizes
        var step_size = random_int(d["step_size_min"],d["step_size_max"]);
        var hole_size = random_int(d["hole_size_min"],d["hole_size_max"]);
        hole_size = step_size * hole_size / 100;
        step_size -= hole_size;
        sumsize += step_size+hole_size;
        //alpha
        var alpha_start = random_int(d["alpha_start_min"],d["alpha_start_max"]);
        var alpha_end = random_int(d["alpha_end_min"],d["alpha_end_max"]);
        //colors
        var red = random_int(d["red_min"],d["red_max"]);
        var green = random_int(d["green_min"],d["green_max"]);
        var blue = random_int(d["blue_min"],d["blue_max"]);
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
        rez.push(step);
    }
    
    return rez;
}
function generate_gradient(d){
    
    steps = generate_steps();
}

function random_all(){
    var d = get_gui_values_as_object();
    console.log(JSON.stringify(d));
    
    
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
        random_prefix_counter(d,prefix[i]); //generate random values
    }
    
    // console.log(JSON.stringify(d["steps"]));
    console.log(JSON.stringify(d));
    generate_gradient(d);
}