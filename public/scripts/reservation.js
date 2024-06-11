const btn = document.querySelector('button');
btn.addEventListener('click',(event)=>{
    const time = document.querySelector('.time');
    const day = document.querySelector('.day');
    axios.post('/reservationRequest',)
    console.log(time.value,day.value);
    axios.post('/reservation/request',{
        time:time,
        day:day
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
})