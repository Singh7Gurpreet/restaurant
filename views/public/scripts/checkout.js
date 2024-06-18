const btn = document.querySelector('button');

btn.addEventListener('click',(event)=>{
    axios.get('/payment').then(res => {
        window.location.replace(res.data);
    }).catch(err => {
        console.log(err);
    });
})