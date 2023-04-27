document.addEventListener("DOMContentLoaded", function (event) {
  setInterval(clickArrowRight, 4000);
});
window.addEventListener("load", function (event) {
  document
    .getElementsByClassName("home_page")
    .item(0)
    .classList.add("header--navBar--item__active");

  var username = localStorage.getItem("username");
  console.log(username);
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
        <a href="dangnhap.html">
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
});
function clickArrowRight() {
  var ele = document.getElementsByClassName("content--slider--items").item(0);
  items = ele.getElementsByClassName("content--slider--item");
  var html = "";
  for (let i = 1; i < items.length; i++) {
    html += items[i].outerHTML;
  }
  html += items[0].outerHTML;
  ele.innerHTML = html;
}
function clickArrowLeft() {
  var ele = document.getElementsByClassName("content--slider--items").item(0);
  items = ele.getElementsByClassName("content--slider--item");
  var html = items[items.length - 1].outerHTML;
  for (let i = 0; i < items.length - 1; i++) {
    html += items[i].outerHTML;
  }
  ele.innerHTML = html;
}

// SEARCH--------------------------------------------------------------
