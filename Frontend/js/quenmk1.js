const account_id = "";

document
  .getElementById("button-check")
  .addEventListener("click", function (event) {
    event.preventDefault(); // ngăn chặn hành vi mặc định của button
    // xử lý dữ liệu và trả về kết quả
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      email: email,
      phoneNumber: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/quenMK-check", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result.split(" "));
        if (result == "Username không có trong CSDL") {
          document.getElementById(
            "user-notfound"
          ).innerHTML = `<span style="color: red;">Tài khoản không tồn tại</span>`;
        } else if (result == "Sai email") {
          document.getElementById(
            "user-notfound"
          ).innerHTML = `<span style="color: red;">Tài khoản không tồn tại</span>`;
        } else if (result == "Sai số điện thoại") {
          document.getElementById(
            "user-notfound"
          ).innerHTML = `<span style="color: red;">Tài khoản không tồn tại</span>`;
        } else if (result.split(" ")[0] == "Cho") {
          var x = result.split(" ")[4];
          console.log(x);
          localStorage.setItem("accountID", x);
          window.location.replace("quenmk-otp.html");
        }
      })
      .catch((error) => console.log("error", error));
  });
