function generate(){
    var parameters = new URLSearchParams(window.location.search)
    var product = parameters.get('product')
    var creator = parameters.get('creator')
    //replace product tag inner html
    var tags = document.body.getElementsByClassName('product')
    for (var i = 0;i< tags.length;i++){tags[i].innerHTML = product}
    var tags = document.body.getElementsByClassName('creator')
    for (var i = 0;i< tags.length;i++){tags[i].innerHTML = creator}
}

generate()