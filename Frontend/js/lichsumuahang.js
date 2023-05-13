if (localStorage.getItem('username') == null) {
  window.location.replace('dangnhap.html');
}
var stars = document.querySelectorAll('.point__star');
viewOder('all')
document.getElementsByClassName('content--sidebar--user--username').item(0).innerHTML = localStorage.getItem('username');

function viewOder(mes) {
  let items = document.getElementsByClassName('titleBar--item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('titleBar--item__active')
  }
  if (mes == 'all') {
    document.getElementById('titleBar--item__all').classList.add('titleBar--item__active');
  } else if (mes == 'choxacnhan') {
    document.getElementById('titleBar--item__choxacnhan').classList.add('titleBar--item__active');
  } else if (mes == 'chovanchuyen') {
    document.getElementById('titleBar--item__chovanchuyen').classList.add('titleBar--item__active');
  } else if (mes == 'dangvanchuyen') {
    document.getElementById('titleBar--item__dangvanchuyen').classList.add('titleBar--item__active');
  } else if (mes == 'hoanthanh') {
    document.getElementById('titleBar--item__hoanthanh').classList.add('titleBar--item__active');
  } else if (mes == 'huy') {
    document.getElementById('titleBar--item__huy').classList.add('titleBar--item__active');
  }

  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));
  myHeaders.append("statusOrder", mes);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + "/api/get-all-order-by-user", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.length === 0) {
        var html = `<div class="content--main--order">Không có đơn hàng</div>`
        document.getElementsByClassName('content--main--orders').item(0).innerHTML = html;
      } else {
        var html = '';
        for (let order of result) {
          html += `<div class="content--main--order">
            <div class="order--header">
              <div class="order--header--idOrder font--subheader">
                DH`+ order.orderId + `
              </div>
              <div class="order--header--date font--subheader">`+ formatDate(order.purchaseDate) + `</div>
              <div class="order--header--status font--subheader">`+ order.orderStatus + `</div>
            </div>
            <div class="order--items" ondblclick="nextPageChiTietDonHang(`+ order.orderId + `)">`
          for (let orderDetail of order.listOrderDetail) {
            html += `<div class="order--item">
              <div class="order--item--image">
                <img src="`+ orderDetail.product.linkImage + `" alt="" />
              </div>
              <div class="order--item--info">
                <div class="order--item--info--productName font--subheader">
                `+ orderDetail.product.productName + `
                </div>
                <div class="order--item--info--productCount">X`+ orderDetail.quantity + `</div>
              </div>
              <div class="order--item--cost">`+ formatMoneyVND(orderDetail.price) + `</div>
            </div>`
          }
          html += `</div><div class="order--footer">
            <div class="order--footer--cost">Tổng tiền: `+ formatMoneyVND(order.orderTotal + tranportFee) + `</div>
            <div class="order--footer--btn">
            `
          if (order.orderStatus == 'Chờ xác nhận') {
            html += `<button class="btn btn__rad4" onclick="updateOrderStatus(` + order.orderId + `,'Huỷ')">Huỷ</button>`
          } else if (order.orderStatus == 'Đang vận chuyển') {
            html += `<button class="btn btn__rad4" onclick="updateOrderStatus(` + order.orderId + `,'Hoàn thành')">Đã nhận được hàng</button>`
          } else if (order.orderStatus == 'Hoàn thành') {
            html += `<button class="btn btn__rad4" onclick="evaluateProduct(` + order.orderId + `)">Đánh giá</button>`
          }
          html += `<button class="btn btn__gray btn__rad4" onclick="nextPageChiTietDonHang(` + order.orderId + `)">Xem chi tiết</button>`
          html += '</div></div></div>';
        }
        html += `</div>`;
        document.getElementsByClassName('content--main--orders').item(0).innerHTML = html;
      }
    })
    .catch(error => console.log('error', error));
}

function nextPageChiTietDonHang(idOrder) {
  // console.log(idOrder);
  localStorage.setItem('idOrder', idOrder);
  window.location.replace("chitietdonhang.html");
}

function updateOrderStatus(orderId, orderStatus) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "orderId": orderId,
    "orderStatus": orderStatus
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(url + "/api/update-order-status", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result != null) {
        viewOder('all');
      } else {
        alert("Đã xảy ra lỗi, vui lòng thực hiện lại!")
      }
    })
    .catch(error => console.log('error', error));
}
function evaluateProduct(idOrder) {
  var myHeaders = new Headers();
  myHeaders.append("user", "user");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + "/api/get-order-by-id?idOrder=" + idOrder, requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var p of result.listOrderDetail) {
        html += `<div class="evaluate--item">
        <div class="evaluate--item--product">
          <input type="hidden" class="evaluate--item--product--id" value="`+ p.product.productId + `">
          <div class="evaluate--item--product--image">
            <img src="`+ p.product.linkImage + `" alt="` + p.product.productName + `" title="` + p.product.productName + `">
          </div>
          <div class="evaluate--item--product--name">`+ p.product.productName + `</div>
        </div>
        <div class="evaluate--item--main">
          <div class="evaluate--item--main--point">
            <div class="evaluate--item--main--point--star">
              <i class="fa-solid fa-star point__star point__star__yellow" title="1" onclick="clickStar(this)"></i>
              <i class="fa-solid fa-star point__star point__star__yellow" title="2" onclick="clickStar(this)"></i>
              <i class="fa-solid fa-star point__star point__star__yellow" title="3" onclick="clickStar(this)"></i>
              <i class="fa-solid fa-star point__star point__star__yellow" title="4" onclick="clickStar(this)"></i>
              <i class="fa-solid fa-star point__star point__star__yellow" title="5" onclick="clickStar(this)"></i>
            </div>
            <div class="evaluate--item--main--point--text">Tuyệt vời</div>
            <input type="hidden" class="evaluate--item--main--point--num" value="5">
          </div>
          <div class="inputLabel">
            <div class="inputLabel--label">Nội dung</div>
            <textarea name="" class="textfield textfield__w100 evaluate--item--main--content" placeholder="Hãy chia sẻ cảm nhận của bạn"></textarea>
          </div>
        </div>
      </div>`
      }
      document.getElementsByClassName('popup--content--evaluate').item(0).innerHTML = html;
      document.getElementById('btnSaveEvaluate').onclick = function() {
        saveEvaluate(idOrder);
      }
      openPopup('popupEvaluate');
    })
    .catch(error => console.log('error', error));
}
function clickStar(star) {
  var starParent = star.parentElement.parentElement;
  var listStar = starParent.getElementsByClassName('point__star');
  starParent.getElementsByClassName('evaluate--item--main--point--num').item(0).value = star.title;
  switch (star.title) {
    case "1":
      starParent.getElementsByClassName('evaluate--item--main--point--text').item(0).innerHTML = "Tệ";
      break;
    case "2":
      starParent.getElementsByClassName('evaluate--item--main--point--text').item(0).innerHTML = "Không hài lòng";
      break;
    case "3":
      starParent.getElementsByClassName('evaluate--item--main--point--text').item(0).innerHTML = "Bình thường";
      break;
    case "4":
      starParent.getElementsByClassName('evaluate--item--main--point--text').item(0).innerHTML = "Hài lòng";
      break;
    case "5":
      starParent.getElementsByClassName('evaluate--item--main--point--text').item(0).innerHTML = "Tuyệt vời";
      break;
  }
  for (var s of listStar) {
    if (s.title <= star.title) {
      s.classList.add('point__star__yellow')
    } else {
      s.classList.remove('point__star__yellow')
    }
  }
}
function saveEvaluate(idOrder) {
  var products = document.getElementsByClassName('evaluate--item--product--id');
  var points = document.getElementsByClassName('evaluate--item--main--point--num');
  var messages = document.getElementsByClassName('evaluate--item--main--content');
  var listReview = []
  for(let i = 0; i<products.length; i++){
    listReview.push({
      "point": points[i].value,
      "description": messages[i].value,
      "product": {
        "productId": products[i].value
      }
    })
  }
  var myHeaders = new Headers();
  myHeaders.append("user", localStorage.getItem("username"));
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "listReview": listReview,
    "order": {
      "orderId": idOrder
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/api/save-review", requestOptions)
    .then(response => response.text())
    .then(result => {
      if(result == "OK"){
        closePopup('popupEvaluate');
        viewOder('all');
      } else {
        alert("Lỗi");
      }
    })
    .catch(error => console.log('error', error));
}