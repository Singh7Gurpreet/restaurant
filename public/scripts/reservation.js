document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    axios.get("reservation",{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.message);
    }) 
});