function display(){
    var precode = document.getElementById("precode");
    var text = document.getElementById("rawcode").value;
    precode.innerHTML = linenumbers(text);
    hljs.highlightBlock(precode);
} 

function displayWN(){
    var precode = document.getElementById("precode");
    precode.style = "font-family: \"NUM\";font-size: 16;";
    var text = document.getElementById("rawcode").value;
    precode.innerHTML = linenumbers(text, true);
    hljs.highlightBlock(precode);
}

function reset(){
    var precode = document.getElementById("precode");
    precode.style = "font-family: \"VAM\";font-size: 16;";
    precode.innerHTML = "";
    var textarea = "<textarea id=\"rawcode\"></textarea>";
    precode.innerHTML = textarea;
}

function covernumber(text){
    var holder = document.createElement("DIV");
    var div = document.createElement("DIV");
    div.style.color = "#7f9f7f";
    div.style.display = "inline";
    div.innerHTML = text;
    holder.appendChild(div);
    return holder.innerHTML;
}

function linenumbertext(i, max, show){
    var maxlen = max.toString().length;
    var ilen = (i+1).toString().length;
    var rez = "_".repeat(maxlen - ilen+1);
    rez = rez + (i+1).toString() + "|";
    rez = covernumber(rez);
    if (show) {return rez;}else{return "";}
}

function linenumbers(rtext, show = false){
    var rez="";//result string
    var s=" "; var st="&nbsp;"
    var t= "\t"
    var stext = rtext.split(/\n/); //array of strings
    var max = stext.length;
    for (var i = 0;i<max;i++){ //one string
        var linetext = linenumbertext(i, max, show); //create string with number placeholder
        var text = stext[i].split(""); //array of one string characters
        var newtext = "";
        var fresh = true;
        //alert(text);
        for (var ii=0;ii<text.length;ii++){ //one character step
            var c = text[ii];
            //alert(text[ii]);
            if (c == s && fresh) { newtext+=st; }
            else if (c==t && fresh) { newtext+=st*4; }
            else { newtext+=c; fresh=false; }
        }
        //alert(newtext);
        newtext = newtext.replace("//","\n//");
        rez+="<br>\n"+linetext+"\n"+newtext;
    }
    return rez;
}
