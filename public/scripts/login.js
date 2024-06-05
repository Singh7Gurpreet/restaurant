console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

//0 will be for signUp 
//1 for log in

const loginButton = document.querySelectorAll(".submit-btn")[0];
const signupButton = document.querySelectorAll(".submit-btn")[1];

loginButton.addEventListener('click',(e)=>{
	axios.get("/hell");
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