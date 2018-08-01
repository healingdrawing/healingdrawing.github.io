var back_chrome_number = 0; // 0- shirt 1 white 2 gray 3 black
var back_color_number = 6; // 0 ... 6 red orange yellow green sky blue violet

function back_chrome_creator(){
    if (back_chrome_number < 3){ back_chrome_number += 1; }
    else{ back_chrome_number = 0; }
    document.getElementById("viewbox").style.backgroundImage = "url(\"css/bw"+back_chrome_number.toString() + ".png\")";
    console.log(back_chrome_number);
    showme("background color changed");
}

function back_color_creator(){
    if (back_color_number < 6){ back_color_number += 1; }
    else{ back_color_number = 0; }
    document.getElementById("viewbox").style.backgroundImage = "url(\"css/c"+back_color_number.toString() + ".png\")";
    console.log(back_color_number);
    showme("background color changed");
}