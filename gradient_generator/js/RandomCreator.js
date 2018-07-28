//random section for _RandomCreator.js
//random float include borders
function random_num(min=0,max=1){
    return Math.random()*(max - min)+min ;
}
//random integer include borders . Just Math.round(random_num(min,max))
function random_int(min=0,max=1){
    return Math.round(random_num(min,max));
}