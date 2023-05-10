window.addEventListener("load", function (event) {
  document
    .getElementsByClassName("clientpage")
    .item(0)
    .classList.add("content--sidebar--item__active");

  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  console.log(searchTerm);

  if (searchTerm == null) {
    // LOAD ALL KHACH HANG
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/showAllKH", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var html = ``;
        for (let i = 0; i < result.length; i++) {
          html +=
            `<div class="content--body--items" id="` +
            result[i].id +
            `">
                        <div class="content--body--item">` +
            (i + 1) +
            `</div>
                        <div class="content--body--item">` +
            result[i].name +
            `</div>
                        <div class="content--body--item">` +
            result[i].username +
            `</div>
                        <div class="content--body--item">` +
            result[i].email +
            `</div>
                        <div class="content--body--item">` +
            result[i].phoneNumber +
            `</div>
                        <div class="content--body--item">
                            <button class="btn" onclick="suaKH(` +
            result[i].id +
            `)">Sửa</button>
                            <button class="btn btn__gray" onclick="xoaKH(` +
            result[i].id +
            `)">Xoá</button>
                        </div>
                    </div>`;
        }
        var element = document.getElementById("content--body--tbody");
        element.innerHTML = html;
      })
      .catch((error) => console.log("error", error));
  } else {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/api/searchKH?name=" + searchTerm,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        var html = ``;
        for (let i = 0; i < result.length; i++) {
          html +=
            `<div class="content--body--items" id="` +
            result[i].id +
            `">
                        <div class="content--body--item">` +
            (i + 1) +
            `</div>
                        <div class="content--body--item">` +
            result[i].name +
            `</div>
                        <div class="content--body--item">` +
            result[i].username +
            `</div>
                        <div class="content--body--item">` +
            result[i].email +
            `</div>
                        <div class="content--body--item">` +
            result[i].phoneNumber +
            `</div>
                        <div class="content--body--item">
                            <button class="btn" onclick="suaKH(` +
            result[i].id +
            `)">Sửa</button>
                            <button class="btn btn__gray" onclick="xoaKH(` +
            result[i].id +
            `)">Xoá</button>
                        </div>
                    </div>`;
        }
        var element = document.getElementById("content--body--tbody");
        element.innerHTML = html;
      })
      .catch((error) => console.log("error", error));
  }

  //
});

function xoaKH(id) {
  document.getElementById("idKH").value = id;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/deleteKH?id=" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      window.location.reload();
    })
    .catch((error) => console.log("error", error));
}

function luuKH() {
  var id = document.getElementById("idKH").value;
  if (id === null) {
    id = 0;
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: id,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/saveKH", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result == "Lưu KH thành công") {
        window.location.reload();
      } else if (result == "Trùng username") {
        document.getElementById("exception").innerHTML = "Trùng username";
      }
    })
    .catch((error) => console.log("error", error));
}

function suaKH(id) {
  openPopup("popupAddClient");
  // Show single KH
  document.getElementById("idKH").value = id;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/showSingleKH?id=" + id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("name").value = result.name;
      document.getElementById("email").value = result.email;
      document.getElementById("phoneNumber").value = result.phoneNumber;
      document.getElementById("username").value = result.username;
      document.getElementById("password").value = result.password;
    })
    .catch((error) => console.log("error", error));
}
