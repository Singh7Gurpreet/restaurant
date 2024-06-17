const btn = document.querySelector('button');

btn.addEventListener('click',(event)=>{
    console.log("clicked");
    axios.get('/payment').then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
})