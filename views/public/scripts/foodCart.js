const anchorTag = document.querySelectorAll('.txt');
const img = document.querySelector('.main_header--cart');

const cart = [];

img.addEventListener('click',(event) => {
    axios.post('./order/cart',{
        items:sessionStorage.getItem("cart")
    })
    cart.clear();
    window.location.href = "./order/cart";
})

//can be imporved by sending all data together at once instead of one by one
for(let i = 0; i < anchorTag.length;i++) {
    anchorTag[i].addEventListener('click',(event)=> {
        console.log(anchorTag[i].dataset);
        cart.push(anchorTag[i].dataset.foodid);
        console.log(cart);
        sessionStorage.setItem("cart",JSON.stringify(cart));
    });
}