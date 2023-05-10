window.addEventListener("load", function (event) {
  var username = localStorage.getItem("username");
  if(localStorage.getItem('username') == null){
    window.location.replace('dangnhap.html');
  }
  // SHOW THONG TIN CA NHAN---------------------------------------
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/quanLyThongTinCaNhan", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      $("#username").val(result["username"]);
      $("#password").val(result["password"]);
      $("#name").val(result["name"]);
      $("#email").val(result["email"]);
      $("#phoneNumber").val(result["phoneNumber"]);

      $("#username-left").text(result["username"]);
    })
    .catch((error) => console.log("error", error));
  // END SHOW THONG TIN CA NHAN----------------------------------------

  // SAVE THONG TIN CA NHAN------------------------------------------
  $("#form-quanlytt").submit(function (event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: $("#name").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
      username: $("#username").val(),
      password: $("#password").val(),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/saveTTCN", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Lưu thông tin thành công") {
          window.location.reload();
        } else {
          alert("Khong");
        }
      })
      .catch((error) => console.log("error", error));
  });

  // END SAVE THONG TIN CA NHAN------------------------------------------
});
