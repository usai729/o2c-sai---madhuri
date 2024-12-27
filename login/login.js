window.onload = () => {
	localStorage.setItem("username", "admin");
	localStorage.setItem("password", "admin");
};

function login(event) {
	event.preventDefault();

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (
		localStorage.getItem("username") === username &&
		localStorage.getItem("password") === password
	) {
		location.replace("../home/home.html");
	} else {
		alert("Invalid username or password!");
	}
}
