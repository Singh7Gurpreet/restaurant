const reservation = document.querySelector(".reservation");
const order = document.querySelector('.order');

reservation.addEventListener('click',(event) => {
    const token = sessionStorage.getItem('key');
    const url = `/reservation`;
    console.log(`redirecting to ${url}`);
    window.location.href = url;
});

order.addEventListener('click',(event) => {
    const token = sessionStorage.getItem('key');
    const url = `/order`;
    console.log(`redirecting to ${url}`);
    window.location.href = url;
});