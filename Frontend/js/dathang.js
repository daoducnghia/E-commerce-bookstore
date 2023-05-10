if (localStorage.getItem('username') == null) {
    window.location.replace('dangnhap.html');
}
var listAddress = []
getAddress();
showAddress(-1);
showProduct();
checkdropdownlistThanhToan()
window.addEventListener("load", function (event) {
    showPrice();
});


function getAddress() {
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    async function fetchData() {
        try {
            const response = await fetch(url + "/api/get-all-shipment-detail-by-user", requestOptions);
            const result = await response.json();
            return result;

        } catch (error) {
            console.log('error', error);
        }
    }

    listAddress = fetchData();
}
function showAddress(id) {
    listAddress.then((result) => {
        var html = '';
        for (var a of result) {
            html += `<div class="popup--content--address--item">
              <div class="popup--content--address--item--radio">
                <input type="radio" name="address" id="" value="`+ a.shipmentDetailId + `"/>
              </div>
              <div class="popup--content--address--item--info">
                <div class="popup--content--address--item--info--user">
                  `+ a.consigneeName + ` | ` + a.phoneNumber + `
                </div>
                <div class="popup--content--address--item--info--address">
                  ` + a.addressDetail + `, ` + a.commune + `, ` + a.district + `, ` + a.province + `
                </div>
              </div>
              <div class="popup--content--address--item--btn">
                <a onclick="updateAddress(`+ a.shipmentDetailId + `)">Cập nhật</a>
              </div>
            </div>`
        }
        document.getElementsByClassName('popup--content--address').item(0).innerHTML = html;
        var address;
        if (id == -1) {
            for (var a of result) {
                if (a.status == "Mặc định") {
                    address = a;
                    break;
                }
            }
        } else {
            for (var a of result) {
                if (a.shipmentDetailId == id) {
                    address = a;
                    break;
                }
            }
        }
        if (address == null) {
            document.getElementsByClassName('content--address--main--infoUser').item(0).innerHTML = 'Chưa có thông tin nhận hàng';
        } else {
            document.getElementById('idAddress').value = address.shipmentDetailId;
            document.getElementsByClassName('content--address--main--infoUser').item(0).innerHTML = address.consigneeName + ` | ` + address.phoneNumber + `<br>` + address.addressDetail + `, ` + address.commune + `, ` + address.district + `, ` + address.province;
        }
    });
}
function addAddress() {
    document.getElementById('idAddressAA').value = '';
    document.getElementById('fullnameAA').value = '';
    document.getElementById('phonenumberAA').value = '';
    document.getElementById('addressAA').value = '';
    document.getElementById('addressDetailAA').value = '';
    document.getElementById('checkAddressAA').checked = false;
    document.getElementById('checkAddressAA').disabled = false;
    openPopup('popupAddAddress');
}
function saveAddress() {
    var idA = document.getElementById('idAddressAA').value;
    var name = document.getElementById('fullnameAA').value;
    var sdt = document.getElementById('phonenumberAA').value;
    var add = document.getElementById('addressAA').value;
    var adddt = document.getElementById('addressDetailAA').value;
    var aArray = add.split(",");
    for (var i = 0; i < aArray.length; i++) {
        aArray[i] = aArray[i].trim();
    }
    var status = "";
    if (document.getElementById('checkAddressAA').checked) {
        status = "Mặc định";
    }
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem('username'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "shipmentDetailId": idA,
        "consigneeName": name,
        "phoneNumber": sdt,
        "province": aArray[0],
        "district": aArray[1],
        "commune": aArray[2],
        "addressDetail": adddt,
        "status": status
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/save-shipment-detail", requestOptions)
        .then(response => response.json())
        .then(result => {
            getAddress();
            showAddress(-1);
            closePopup('popupAddAddress');
        })
        .catch(error => console.log('error', error));
}
function updateAddress(id) {
    listAddress.then((result) => {
        for (var a of result) {
            if (a.shipmentDetailId == id) {
                document.getElementById('idAddressAA').value = a.shipmentDetailId;
                document.getElementById('fullnameAA').value = a.consigneeName;
                document.getElementById('phonenumberAA').value = a.phoneNumber;
                document.getElementById('addressAA').value = a.province + ', ' + a.district + ', ' + a.commune;
                document.getElementById('addressDetailAA').value = a.addressDetail;
                if (a.status == 'Mặc định') {
                    document.getElementById('checkAddressAA').checked = true;
                    document.getElementById('checkAddressAA').disabled = true;
                } else {
                    document.getElementById('checkAddressAA').checked = false;
                    document.getElementById('checkAddressAA').disabled = false;
                }
                break;
            }
        }
    });
    openPopup('popupAddAddress');
}
document.getElementsByClassName('popup--board__AddAddress').item(0).addEventListener('click', function (event) {
    event.stopPropagation();
})
document.getElementsByClassName('popup--board__AddCard').item(0).addEventListener('click', function (event) {
    event.stopPropagation();
})
function pickAddress() {
    showAddress(document.querySelector('input[name="address"]:checked').value);
    closePopup('popupAddress');
}
function showProduct() {
    var listCart = localStorage.getItem('cart').split(',');
    for (var i of listCart) {
        document.getElementsByClassName('product--items').item(0).innerHTML = '';
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url + "/api/get-cart-by-id?idCart=" + i, requestOptions)
            .then(response => response.json())
            .then(result => {
                // tA += result.product.price * result.productCount;
                // localStorage.setItem('total', result.product.price * result.productCount + parseInt(localStorage.getItem('total')))
                document.getElementsByClassName('product--items').item(0).innerHTML += `<div class="product--item">
                <div class="product--item--image">
                  <img src="`+ result.product.linkImage + `" alt="" />
                </div>
                <div class="product--item--name">`+ result.product.productName + `</div>
                <div class="product--item--price">`+ formatMoneyVND(result.product.oldPrice) + `</div>
                <div class="product--item--quantity">`+ result.productCount + `</div>
                <div class="product--item-cost">`+ formatMoneyVND(result.product.oldPrice * result.productCount) + `</div>
                <input type="hidden" name="" class="totalAmount" value="`+ result.product.price * result.productCount + `">
                <input type="hidden" name="" class="totalOldAmount" value="`+ result.product.oldPrice * result.productCount + `">
              </div>`;
            })
            .catch(error => console.log('error', error));
    }
}
function showPrice() {
    var totalAmountInpt = document.querySelectorAll('.totalAmount');
    var totalAmount = 0;
    for (var i = 0; i < totalAmountInpt.length; i++) {
        var value = parseInt(totalAmountInpt[i].value);
        if (!isNaN(value)) {
            totalAmount += value;
        }
    }
    var totalOldAmountInpt = document.querySelectorAll('.totalOldAmount');
    var totalOldAmount = 0;
    for (var i = 0; i < totalOldAmountInpt.length; i++) {
        var value = parseInt(totalOldAmountInpt[i].value);
        if (!isNaN(value)) {
            totalOldAmount += value;
        }
    }
    document.getElementsByClassName('content--product--cost').item(0).innerHTML = 'Tổng tiền: ' + formatMoneyVND(totalOldAmount);
    document.getElementsByClassName('content--pay--footer--cost').item(0).innerHTML = `<div class="content--pay--footer--cost--item">
    Tống tiền hàng: <big id="tongtien">`+ formatMoneyVND(totalOldAmount) + `</big>
  </div>
  <div class="content--pay--footer--cost--item">
    Phí vận chuyển: `+ formatMoneyVND(tranportFee) + `
  </div>
  <div class="content--pay--footer--cost--item">
    Giảm giá: -<big id="giamgia">`+ formatMoneyVND(totalOldAmount - totalAmount) + `</big>
  </div>
  <div class="content--pay--footer--cost--item">
    Tống thanh toán: <big id="tongtt">`+ formatMoneyVND(totalAmount + tranportFee) + `</big>
  </div>`
}
function checkdropdownlistThanhToan() {
    var val = document.getElementById('dropdownlistThanhToan').value;
    if (val == 1) {
        document.getElementsByClassName('content--pay--main').item(0).innerHTML = `<div class="content--pay--main__left">Thanh toán khi nhận hàng</div>
        <div class="content--pay--main__right">Phí thu hộ: 0đ</div>`;
    } else {
        document.getElementsByClassName('content--pay--main').item(0).innerHTML = `<div class="content--pay--main__left">
        Thanh toán thẻ Tín dụng/Ghi nợ
      </div>
      <div class="content--pay--main__right">
      <div class="content--pay--main__right--title">Chọn thẻ</div>
      <div class="content--pay--main__right--credits">
      </div>
      <div class="content--pay--main__right--btn">
            <a onclick="openPopup('popupAddCard')">Thêm thẻ</a>
          </div>
      </div>`;
        showBankCard();
    }
}
function showBankCard() {
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/get-bankcard-by-user", requestOptions)
        .then(response => response.json())
        .then(result => {
            var html = '';
            for (var card of result) {
                html += `<div class="content--pay--main__right--credit">
        <input type="radio" name="card" class='bankCardU' value="Thẻ **** `+ card.cardNumber.substr(-4) + `"/> Thẻ **** ` + card.cardNumber.substr(-4) + `
      </div>`
            }
            document.getElementsByClassName('content--pay--main__right--credits').item(0).innerHTML = html;
        })
        .catch(error => console.log('error', error));
}
function addBankCard() {
    var cardholderName = document.getElementById('cardholderName').value;
    var cardNumber = document.getElementById('cardNumber').value;
    var cvv = document.getElementById('cvv').value;
    var address = document.getElementById('addressCard').value;
    var zipCode = document.getElementById('zipCode').value;
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "cardholderName": cardholderName.toUpperCase(),
        "cardNumber": cardNumber,
        "cvv": cvv,
        "address": address,
        "zipCode": zipCode
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/save-bankcard", requestOptions)
        .then(response => response.json())
        .then(result => {
            showBankCard();
            closePopup('popupAddCard');
        })
        .catch(error => console.log('error', error));
}
function dathang() {
    var listCart = localStorage.getItem('cart').split(',');
    var card = [];
    for (var c of listCart) {
        card.push({ "cardId": c });
    }
    var message = document.getElementById('message').value;
    var val = document.getElementById('dropdownlistThanhToan').value;
    var paymentMethod = 'cod';
    if (val == 2) {
        var radios = document.querySelectorAll('.bankCardU');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                paymentMethod = radios[i].value;
                break;
            }
        }
        if(paymentMethod == 'cod')
            alert("Vui lòng chọn thẻ Tín dụng/Ghi nợ để thanh toán");
    }
    var orderTotal = chuyenStrMoneyToNum(document.getElementById('tongtt'))
    var discount = chuyenStrMoneyToNum(document.getElementById('giamgia'))
    var shipmentDetailId = document.getElementById('idAddress').value;

    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem('username'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "order": {
            "orderTotal": orderTotal - tranportFee,
            "transportFee": tranportFee,
            "discount": discount,
            "paymentMethod": paymentMethod,
            "message": message
        },
        "listCart": card,
        "shipmentDetail": {
            "shipmentDetailId": shipmentDetailId
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/save-order", requestOptions)
        .then(response => response.json())
        .then(result => {
            window.location.replace('lichsumuahang.html');
        })
        .catch(error => console.log('error', error));
}
function chuyenStrMoneyToNum(item) {
    var moneyStr = item.innerHTML;
    // Loại bỏ ký tự "&nbsp;" trong chuỗi
    moneyStr = moneyStr.replace("&nbsp;", "");
    // Loại bỏ ký tự "₫" trong chuỗi
    moneyStr = moneyStr.replace("₫", "");
    // Loại bỏ ký tự "." trong chuỗi
    moneyStr = moneyStr.replace(".", "");
    return Number(moneyStr);
}