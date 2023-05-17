const logBtn = document.getElementById("xy");
const regBtn = document.getElementById("yz");

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  var name = document.getElementById("user").value;
  var email = document.getElementById("e").value;
  console.log(name, email);

  window.location.href = `user.html?name=${name}`;
}

logBtn.addEventListener("click", (event) => {
  submitForm(event);
});

function regForm(event) {
  event.preventDefault();

  window.location.href = "registration.html";
}

regBtn.addEventListener("click", (event) => {
  regForm(event);
});
