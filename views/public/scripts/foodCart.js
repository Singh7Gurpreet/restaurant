const anchorTag = document.querySelectorAll('a');

const cart = [];


for(let i = 0; i < anchorTag.length;i++) {
    anchorTag[i].addEventListener('click',(event)=> {
        cart.push(anchorTag[i].dataset.foodid);
        console.log(cart);
        sessionStorage.setItem("cart",JSON.stringify(cart));
    });
}