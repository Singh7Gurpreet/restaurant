const anchorTag = document.querySelectorAll('.txt');
const img = document.querySelector('.main_header--cart');

//set total amount and map on the basis of local storage loaded

let totalAmount = 0;
const cart = new Map();

if(localStorage.getItem("cart") !== undefined) {
    try{
        const data = JSON.parse(localStorage.getItem("cart"));
        const amt = +localStorage.getItem("totalAmount");
        for(let i = 0; i < data.length; i++) {
            Object.assign(data[i][0],[...cart][0]);
            cart.set(data[i][0],data[i][1]);
        }
        totalAmount = amt;
    } catch (err) {
        console.log(err);
    }
}

img.addEventListener('click',(event) => {
    axios.post('./cart',{
        items:localStorage.getItem("cart"),
        amt:totalAmount
    }).then((res) => {
        window.location.href = "./cart";
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
        totalAmount += +anchorTag[i].dataset.foodprice.split('$')[0];
        try{
            const data = JSON.stringify(Array.from(cart.entries()));
            localStorage.setItem("cart",data);
            localStorage.setItem("totalAmount",totalAmount);
        } catch(err) {
            console.err(err);
        }
        console.log(cart);
        });
}

