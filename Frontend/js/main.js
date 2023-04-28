window.addEventListener("load", function (event) {
  var username = localStorage.getItem("username");
  console.log(username);

  $("#input-search").keypress(function (event) {
    // Kiểm tra xem phím Enter đã được nhấn
    if (event.keyCode === 13) {
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
        <a href="home.html">
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
