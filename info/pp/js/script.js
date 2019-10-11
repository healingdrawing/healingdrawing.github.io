function generate(){
    var parameters = new URLSearchParams(window.location.search)
    var product = 'add product name as url param product=appname'
    var creator = 'add developer name as url param creator=devname'
    var contacts = 'add contacts adress as url param contacts=adress' //kyznector☭gmail.com
    if(parameters.has('product')) product = parameters.get('product')
    if(parameters.has('creator')) creator = parameters.get('creator')
    if(parameters.has('contacts')) contacts = parameters.get('contacts')
    //replace tag inner html
    var tags = document.body.getElementsByClassName('product')
    for (var i = 0;i< tags.length;i++){tags[i].innerHTML = product}
    var tags = document.body.getElementsByClassName('creator')
    for (var i = 0;i< tags.length;i++){tags[i].innerHTML = creator}
    var tags = document.body.getElementsByClassName('contacts')
    for (var i = 0;i< tags.length;i++){tags[i].innerHTML = contacts}
    
}

generate()