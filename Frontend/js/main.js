const url = "http://localhost:8080";
const tranportFee = 30000;
window.addEventListener("load", function (event) {
  var username = localStorage.getItem("username");

  showCategory();

  $("#input-search").keypress(function (event) {
    // Kiểm tra xem phím Enter đã được nhấn
    if (event.keyCode === 13 && $("#input-search").val() != "") {
      // Thực hiện các hành động tương ứng ở đây
      window.location.replace(
        "danhsachsp.html?search=" + $("#input-search").val()
      );
    }
  });

  if (username) {
    document
      .getElementsByClassName("header--tool__user--items")
      .item(0).innerHTML = `<a href="quanlythongtincanhan.html">
          <div
            id="header--tool__user--item__username"
            class="header--tool__user--item username"
          >
            Hồ sơ
          </div>
        </a>
        <a href="lichsumuahang.html">
          <div
            id="header--tool__user--item__hoso"
            class="header--tool__user--item saudangnhap"
          >
            Đơn mua
          </div>
        </a>
        <a onclick="logout()">
          <div
            id="header--tool__user--item__dangxuat"
            class="header--tool__user--item saudangnhap"
          >
            Đăng xuất
          </div>
        </a>`;
  } else {
    console.log("khong lam gi");
  }

  getNumberProductInCart();
});
function formatDate(str) {
  var date = new Date(str);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // Đảm bảo định dạng "dd"
  if (day < 10) {
    day = "0" + day;
  }

  // Đảm bảo định dạng "mm"
  if (month < 10) {
    month = "0" + month;
  }

  return day + "/" + month + "/" + year;
}
function formatMoneyVND(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function getNumberProductInCart() {
  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/get-number-product-in-cart", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      $(".header--tool__cart__number").get(0).innerHTML = result;
    })
    .catch((error) => console.log("error", error));
}
function openPopup(ele) {
  document.getElementById(ele).style.display = "block";
}
function closePopup(ele) {
  document.getElementById(ele).style.display = "none";
}
document
  .getElementsByClassName("popup--board")
  .item(0)
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
function logout() {
  localStorage.removeItem("username");
  window.location.replace("home.html");
}
function ckeckDangNhap(web) {
  if (localStorage.getItem("username") == null) {
    window.location.replace("dangnhap.html");
  } else {
    window.location.replace(web);
  }
}

function addToCart(id) {
  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url + "/api/add-to-cart?id-product=" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result == "OK") {
        getNumberProductInCart();
      } else {
        alert("Không thể thêm sản phẩm vào giỏ hàng!");
      }
    })
    .catch((error) => console.log("error", error));
}
function getCart() {
  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url + "/api/cart", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var html = "";
      for (let cart of result) {
        html +=
          `<div class="box">
              <input type="checkbox" name="checkProduct" value="` +
          cart.cardId +
          `" onchange="updateAmount(this)"/>
              <img src="` +
          cart.product.linkImage +
          `" alt="" />
              <div class="content-box">
                <h3>` +
          cart.product.productName +
          `</h3>
                <h4>Giá: <span class="product--price">` +
          formatMoneyVND(cart.product.price) +
          `</span></h4>
                <p class="unit">Số lượng: <input class="product--price product--number" value="` +
          cart.productCount +
          `" /></p>
                <p class="btn-area" onclick="deleteProduct(this)">
                  <i class="fa fa-trash"></i>
                  <span class="btn2" >Xoá</span>
                </p>
              </div>
            </div>`;
      }
      document.querySelector(".shop").innerHTML = html;
    })
    .catch((error) => console.log("error", error));
}
function showCategory() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(url + "/api/get-category", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var html = "";
      for (var c of result) {
        html +=
          `<div class="navBar__product--module">
        <div class="navBar__product--module--title">` +
          c.category.categoryName +
          `</div>`;
        var n = 5;
        if (c.listCategory.length < 5) n = c.listCategory.length;
        for (var i = 0; i < n; i++) {
          html +=
            `<div class="navBar__product--module--item">
                  <a onclick="showProductByCategory(` +
            c.listCategory[i].categoryId +
            `)">` +
            c.listCategory[i].categoryName +
            `</a>
                  </div>`;
        }
        html +=
          `<div class="navBar__product--module--item navBar__product--module--item__light">
                <a onclick="showProductByCategory(` +
          c.category.categoryId +
          `)">Xem tất cả</a>
                </div>
                </div>`;
      }
      document.querySelector(".navBar__product--items").innerHTML = html;
    })
    .catch((error) => console.log("error", error));
}
function showProductByCategory(id) {
  window.location.replace("danhsachsp.html?category=" + id);
}
function likeProduct(idProduct, ele) {
  var listLikeProduct = [];
  if (localStorage.getItem("listLikeProduct") != null) {
    listLikeProduct = localStorage.getItem("listLikeProduct").split(",");
  }
  if (listLikeProduct.includes(idProduct.toString())) {
    listLikeProduct = listLikeProduct.filter((element) => element != idProduct);
    ele.classList.remove("text__red");
  } else {
    listLikeProduct.push(idProduct);
    ele.classList.add("text__red");
  }
  localStorage.setItem("listLikeProduct", listLikeProduct);
}
function quenMKCheck() {
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

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
      console.log(result);
      if (result == "Username không có trong CSDL") {
        document.getElementById(
          "user-notfound"
        ).innerHTML = `<span style="color: red;">Username không tồn tại</span>;`;
      }
    })
    .catch((error) => console.log("error", error));
}
