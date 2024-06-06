const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

//0 will be for signUp 
//1 for log in

const signupButton = document.querySelectorAll(".submit-btn")[0];
const loginButton = document.querySelectorAll(".submit-btn")[1];

loginButton.addEventListener('click',(e)=>{
	const mail = document.querySelectorAll(".loginInput")[0].value;
	const pass = document.querySelectorAll(".loginInput")[1].value;
	if(mail.length === 0 || pass.length === 0) {
		console.log("Not vald credentials");
	}
	axios.post('/submit',{
		email:mail,
		password:pass
	}).then(response => {
		// assing token to session storage
		// and redirect to reservation page
		console.log("ok");
		//will do something on success and failure
	}).catch(err => {
		console.log(err.message);
		//print error message
	})	
});

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});