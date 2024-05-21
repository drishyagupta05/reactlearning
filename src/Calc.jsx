function add(a,b){
let sum = a+b;
return sum;
}

function sub(a,b){
    let sub = a-b;
    return sub;
}

function mult(a,b){
    let mult = a*b;
    return mult;
}

function div(a,b){
    let div = a/b;
    div = div.toFixed(3)
    return div;
}

export default add;
export {sub, mult, div};