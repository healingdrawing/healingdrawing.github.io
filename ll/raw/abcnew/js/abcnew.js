function abcdraw(){
var text="a k g \n t l d n \n p b m \n e h hg i \n bl w j \n o r s z \n u f v";
text=text.split(" ");
var titles="а ка га _ та ла да на _ па ба ма _ э ха хга ьхг _ ы ша жа _ о ра са за _ у фа ва"
titles=titles.split(" ");
var between=document.getElementById("pixbetween").value;
var upween=document.getElementById("pixupween").value;
var simh=document.getElementById("simheight").value;
var line=document.getElementById("line").checked;
var div=document.getElementById("div_text");
var podpisi=document.getElementById("podpisi").checked;
div.innerHTML="";
var img="<img title='";
var img_="' style='block margin-right:"+between+"px; margin-bottom:"+upween+"px' height='"+simh+" px' src='web_ss/";
var _img=".svg' />";
if (line){_img="_"+_img}
for(i=0;i<text.length;i++){
	if(text[i]!="\n"){
		div.innerHTML+=img+titles[i]+img_+text[i]+_img;
		if(podpisi){div.innerHTML+=" "+titles[i]+" &nbsp;"
		}else{div.innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;"}
	}
	else{div.innerHTML+="<br>"}
}
}

function draw(){
var names={};
var keys="а б в г д ж з к л м н о п р с т у ф х хг ш ы ь э ! ? : ; . , ( ) - \""
keys=keys.split(" ");
keys[keys.length]=" ";
var vals="a b v g d j z k l m n o p r s t u f h hg w bl i e vosk vopr ddot ddottail dot dottail lskoba rskoba dash quote space"
vals=vals.split(" ");
var simh=document.getElementById("simheight").value;

var line=document.getElementById("line").checked;
var podpisi=document.getElementById("podpisi").checked;
var div=document.getElementById("div_text");
div.innerHTML="";
var between=document.getElementById("pixbetween").value;
var upween=document.getElementById("pixupween").value;
//alert(between+" "+upween)
var img="<img title='";
var img_="' style='margin-right:"+between+"px; margin-bottom:"+upween+"px' height='"+simh+" px' src='web_ss/";
var _img=".svg' />";
if (line){_img="_"+_img}
var text=document.getElementById("okno1").value;


if (text==""){abcdraw()}
else{
text=text.toLowerCase();
text=text.split("");
for (i=0;i<keys.length;i++){names[keys[i]]=vals[i]}
for(i=0;i<text.length;i++){
	if(text[i] in names){
		if (text[i]=="х"){
			if (i==text.length-1){
				div.innerHTML+=img+text[i]+img_+names[text[i]]+_img;
				if(podpisi){div.innerHTML+=" "+text[i]+" &nbsp;"}
			}
			else{
				if(text[i+1]=="г"){
					i++;div.innerHTML+=img+"хг"+img_+names["хг"]+_img;
					if(podpisi){div.innerHTML+=" "+"хг"+" &nbsp;"}
				}
				else{
					div.innerHTML+=img+text[i]+img_+names[text[i]]+_img;
					if(podpisi){div.innerHTML+=" "+text[i]+" &nbsp;"}
				}
			}
		}
		else{
			div.innerHTML+=img+text[i]+img_+names[text[i]]+_img;
			if(podpisi){div.innerHTML+=" "+text[i]+" &nbsp;"}
		}
		//alert("jnklj");
	}
	else{
		if (text[i]=="\n"){div.innerHTML+="<br>"}
		else{div.innerHTML+=img+"none"+img_+"none"+_img}
	}
}//alert("вышел из фора\n"+div.innerHTML);

return null
}

}