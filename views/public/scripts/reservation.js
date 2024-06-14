const btn = document.querySelector('button');
btn.addEventListener('click',(event)=>{
    const time = document.querySelector('.time');
    const day = document.querySelector('.day');
    axios.post('/reservation/request',{
        time:time.value,
        day:day.value
    }).then(res => {
        console.log(res);
        window.alert("Successfully reserved");
    }).catch(err => {
        window.alert("Sorry! try different slot");
        console.log(err);
    });
})