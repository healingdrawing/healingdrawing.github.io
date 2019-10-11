function generate(){
    var parameters = new URLSearchParams(window.location.search)
    var product = 'product test'
    var creator = 'creator test'
    if(parameters.has('product')) product = parameters.get('product')
    if(parameters.has('creator')) creator = parameters.get('creator')
    //replace tag inner html
    alert(product)
    if(product != ''){
        var tags = document.body.getElementsByClassName('product')
        for (var i = 0;i< tags.length;i++){tags[i].innerHTML = product}
    }
    if(creator != ''){
        var tags = document.body.getElementsByClassName('creator')
        for (var i = 0;i< tags.length;i++){tags[i].innerHTML = creator}
    }
}

generate()