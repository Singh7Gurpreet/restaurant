const anchorTag = document.querySelectorAll('.txt');
const img = document.querySelector('.main_header--cart');

const cart = new Map();

img.addEventListener('click',(event) => {
    const data = JSON.stringify(Array.from(cart.entries()));
    sessionStorage.setItem("cart",data);
    console.log(data);
    axios.post('./order/cart',{
        items:sessionStorage.getItem("cart")
    }).then((res) => {
        console.log(res);
        window.location.href = "./order/cart";
    }).catch ((error) => {
        console.error(error);
    })
})

//can be imporved by sending all data together at once instead of one by one
for(let i = 0; i < anchorTag.length;i++) {
    anchorTag[i].addEventListener('click',(event)=> {
        if(!cart.has(anchorTag[i].dataset)) {
            cart.set(anchorTag[i].dataset,1);
        } else {
            let qty = cart.get(anchorTag[i].dataset);
            cart.set(anchorTag[i].dataset,qty+1);
        }
    });
}