const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const usernameInput = document.getElementById("usernm");
  const passwordInput = document.getElementById("psword");

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === "admin" && password === "password") {
    window.location.href = "admlog2.html"; // Redirect to the desired page
  } else {
    alert("Invalid username or password"); // Display an error message
  }
});
