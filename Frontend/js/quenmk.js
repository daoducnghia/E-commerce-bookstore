var a_id = localStorage.getItem("accountID");
console.log(a_id);
document
  .getElementById("button-luu-mk")
  .addEventListener("click", function (event) {
    event.preventDefault(); // ngăn chặn hành vi mặc định của button
    // xử lý dữ liệu và trả về kết quả

    var password = document.getElementById("password").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: parseInt(a_id),
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/quenMK-save", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result == "Không tim thấy account") {
          console.log("Không tìm thấy account");
        } else if (result == "MK mới trùng MK cũ") {
          document.getElementById("exception").innerText =
            "Mật khẩu mới không được trùng mật khẩu cũ";
        } else if (result == "Đổi mật khẩu thành công") {
          alert("Đổi mật khẩu thành công!");
          window.location.replace("dangnhap.html");
        }
      })
      .catch((error) => console.log("error", error));
  });
