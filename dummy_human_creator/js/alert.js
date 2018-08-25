
function showme(text){
    console.log(text);
    document.getElementById("info").value = text;
}

function txtalert(arr){
    var text = "";
    for (var i=0;i<arr.length;i++){
        text +="\n"+JSON.stringify(arr[i]);
    }
    alert(text);
}