const url = 'http://localhost:8080';
var header = `<div class="header--logo">
<div class="header--logo--icon"></div>
<div class="header--logo--title font--heading__1 ">BanSach</div>
</div>
<div class="header--title">
Hệ thống quản lý cửa hàng BanSach
</div>
<div class="header--tool">
<div class="header--tool--item header--tool__user">
    <i class="fa-light fa-user" title="Tài khoản"></i>
    <div class="header--tool__user--items">
        <a href="">
            <div class="header--tool__user--item">Tài khoản</div>
        </a>
        <a href="">
            <div class="header--tool__user--item" onclick="logout()">Đăng xuất</div>
        </a>
    </div>
</div>
</div>`;
var sidebar = `<div class="content--sidebar--items">
<a href="adminpage.html" class="content--sidebar--item adminpage"><i class="fa-regular fa-gauge-max"></i>Trang chủ</a>
<a href="qlsanpham.html" class="content--sidebar--item productpage"><i class="fa-regular fa-book"></i>Sản phẩm</a>
<a href="qlkhuyenmai.html" class="content--sidebar--item promotionpage"><i class="fa-light fa-receipt"></i>Khuyến mãi</a>
<a href="qlkhachhang.html" class="content--sidebar--item clientpage"><i class="fa-light fa-users"></i>Khách hàng</a>
<a href="qldonhang.html" class="content--sidebar--item orderpage"><i class="fa-regular fa-bags-shopping"></i>Đơn hàng</a>
<<<<<<< HEAD
<a href="baocao_ql.html" class="content--sidebar--item reportpage"><i class="fa-regular fa-chart-line"></i>Báo cáo</a>
</div>`
$(function () {
    $(".header").html(header);
    $(".content--sidebar").html(sidebar);
})
function openPopup(ele) {
    document.getElementById(ele).style.display = 'block';
}
function closePopup(ele) {
    document.getElementById(ele).style.display = 'none';
}
document.getElementsByClassName('popup--board').item(0).addEventListener('click', function (event) {
    event.stopPropagation();
})
function logout() {
    localStorage.removeItem('username');
    window.location.replace('home.html');
}
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
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
=======
<a href="baocao_ql.html" class="content--sidebar--item reportpage"><i class="fa-light fa-file"></i>Báo cáo</a>
</div>`;
$(function () {
  $(".header").html(header);
  $(".content--sidebar").html(sidebar);
});
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

window.addEventListener("load", function (event) {
  var username = localStorage.getItem("username");
  console.log(username);

  $("#input-search").keypress(function (event) {
    // Kiểm tra xem phím Enter đã được nhấn
    if (event.keyCode === 13) {
      // Thực hiện các hành động tương ứng ở đây
      window.location.replace(
        "qlsanpham.html?search=" + $("#input-search").val()
      );
    }
  });

  $("#input-search-kh").keypress(function (event) {
    // Kiểm tra xem phím Enter đã được nhấn
    if (event.keyCode === 13) {
      // Thực hiện các hành động tương ứng ở đây
      window.location.replace(
        "qlkhachhang.html?search=" + $("#input-search-kh").val()
      );
    }
  });
});
>>>>>>> 49f9fda86986a2da279caa92e58b8b82dacc4f26
