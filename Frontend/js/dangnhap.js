$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

const form = document.getElementById("login-form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn việc gửi form

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/dangnhap", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result === "Không tìm thấy tài khoản") {
        alert("Không tìm thấy tài khoản");
      } else if (result === "Đăng nhập thành công") {
        window.location.replace("home.html");
      } else {
        alert("khong lam gi");
      }
    })
    .catch((error) => console.log("error", error));

  // Thực hiện kiểm tra đăng nhập ở đây
});
