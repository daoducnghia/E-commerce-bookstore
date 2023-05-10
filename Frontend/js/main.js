const url = "http://localhost:8080";
const tranportFee = 30000;
window.addEventListener("load", function (event) {
  var username = localStorage.getItem("username");
  // console.log(username);
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

  getNumberProductInCart()
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
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function getNumberProductInCart() {
  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/api/get-number-product-in-cart", requestOptions)
    .then(response => response.json())
    .then(result => {
      $('.header--tool__cart__number').get(0).innerHTML = result;
    })
    .catch(error => console.log('error', error));
}
function openPopup(ele){
  document.getElementById(ele).style.display = 'block';
}
function closePopup(ele){
  document.getElementById(ele).style.display = 'none';
}
document.getElementsByClassName('popup--board').item(0).addEventListener('click', function(event){
  event.stopPropagation();
})
function logout(){
  localStorage.removeItem('username');
  window.location.replace('home.html');
}
function ckeckDangNhap(web){
  if(localStorage.getItem('username') == null){
    window.location.replace('dangnhap.html');
  } else {
    window.location.replace(web);
  }
}