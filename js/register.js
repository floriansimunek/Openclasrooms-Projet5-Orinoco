var firstname = document.getElementById("firstname");
var firstname_err = document.getElementById("firstname_err");

firstname.value = "Florian";

localStorage.setItem('name', firstname.value);
var myName = localStorage.getItem('name');