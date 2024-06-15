const anchorTag = document.querySelectorAll('.txt');
const img = document.querySelector('.main_header--cart');

img.addEventListener('click',(event) => {
    axios.post('./order/cart',{
        items:sessionStorage.getItem("cart")
    })
    window.location.href = "./order/cart";
})

const cart = [];


//can be imporved by sending all data together at once instead of one by one
for(let i = 0; i < anchorTag.length;i++) {
    anchorTag[i].addEventListener('click',(event)=> {
        cart.push(anchorTag[i].dataset.foodid);
        console.log(cart);
        sessionStorage.setItem("cart",JSON.stringify(cart));
    });
}