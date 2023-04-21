$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

const form = document.getElementById("register-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userNumber = document.getElementById("number").value;
  const accountUsername = document.getElementById("username").value;
  const accountPassword = document.getElementById("password").value;

  const username_check = document.getElementById("username-err");
  console.log(accountPassword);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: userName,
    email: userEmail,
    phoneNumber: userNumber,
    username: accountUsername,
    password: accountPassword,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/dangky", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if (result === "Đăng ký thành công") {
        alert("Đăng ký thành công");
        window.location.replace("dangnhap.html");
      } else if (result === "Trùng username") {
        username_check.style.display("block");
        // alert("Trùng username! Hãy đặt username khác!");
      } else {
        alert("khong lam gi ca");
      }
    })
    .catch((error) => console.log("error", error));
});
