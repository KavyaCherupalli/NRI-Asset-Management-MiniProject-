const params = new URLSearchParams(window.location.search);
const userName = params.get("name");
const heading = document.getElementById("o");
const bd = document.getElementById("cnt");

let usId = 1;
console.log(userName);

fetch(`http://localhost:3000/users/${userName}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    usId = data[0].id;
    heading.innerText = `Hello, ${data[0].name}`;
    let propertyDetails = "";

    fetch(`http://localhost:3000/properties/${usId}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((property) => {
          propertyDetails += `Property - ${property.village}, ${property.mandal}, ${property.district}, ${property.pin_number} --- ${property.status}\n`;
        });

        bd.innerText = propertyDetails;
      });
  });

// const userId = params.get("id");
// console.log(userId); // 123
// const userNameEl = document.querySelector("#o");

// fetch(`http://localhost:3000/user/${userId}`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     o.value = data[0].name;
//   });
