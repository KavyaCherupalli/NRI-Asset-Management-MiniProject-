const regForm = document.querySelector("form");
const regButton = document.getElementById("regBtn");

function validReg() {
  const name = document.getElementById("u").value;
  const aadhar = document.getElementById("p").value;
  const mobile = document.getElementById("m").value;
  const address = document.getElementById("a").value;
  const email = document.getElementById("e").value;

  // Form validation using Regular Expressions
  const nameRegex = /^[A-z]{1}[a-z]{2,10}$/;
  const aadharRegex = /^[0-9]{12}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const addressRegex = /^[a-zA-Z0-9\s,'-]+$/;
  const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // const emailRegex =
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!nameRegex.test(name)) {
    alert("Please enter a valid name.");
    return;
  }
  if (!aadharRegex.test(aadhar)) {
    alert("Please enter a valid Aadhar number.");
    return;
  }
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Create a new user object
  const user = {
    name: name,
    aadhar: aadhar,
    mobile: mobile,
    address: address,
    email: email,
  };

  // Make a fetch request to post the data to the backend
  fetch("http://localhost:3000/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User Created Success:", data);
      const newId = data.id;
      console.log(newId);
      alert("User registered successfully!");
      window.location.href = `landstart.html?id=${newId}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error registering user. Please try again later.");
    });
}

regButton.addEventListener("click", () => {
  validReg();
});
