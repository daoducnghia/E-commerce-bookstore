if (localStorage.getItem('username') == null) {
    window.location.replace('dangnhap.html');
}
getCart();
var moneyNum = 0;
window.addEventListener("load", function (event) {
    var inputElements = document.querySelectorAll('.product--price');
    for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('change', function (event) {
            if (event.target.value < 1) {
                event.target.value = 1;
            } else {
                var numberProduct = event.target.value;
                var box = event.target.parentElement.parentElement.parentElement;
                var cart = box.querySelector('[name="checkProduct"').value;
                updateCart(cart, numberProduct);
            }
        });
    }
})

function deleteProduct(ele) {
    var box = ele.parentElement.parentElement;
    var cart = box.querySelector('[name="checkProduct"').value;
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(url + "/api/delete-cart-by-id?idCart=" + cart, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                box.remove();
            }
        })
        .catch(error => console.log('error', error));
}
function getCart() {
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/cart", requestOptions)
        .then(response => response.json())
        .then(result => {
            var html = '';
            for (let cart of result) {
                html += `<div class="box">
                <input type="checkbox" name="checkProduct" value="`+ cart.cardId + `" onchange="updateAmount(this)"/>
                <img src="`+ cart.product.linkImage + `" alt="" />
                <div class="content-box">
                  <h3>`+ cart.product.productName + `</h3>
                  <h4>Giá: <span class="product--price">`+ formatMoneyVND(cart.product.price) + `</span></h4>
                  <p class="unit">Số lượng: <input class="product--price product--number" value="`+ cart.productCount + `" /></p>
                  <p class="btn-area" onclick="deleteProduct(this)">
                    <i class="fa fa-trash"></i>
                    <span class="btn2" >Xoá</span>
                  </p>
                </div>
              </div>`
            }
            document.getElementsByClassName('shop').item(0).innerHTML = html;

        })
        .catch(error => console.log('error', error));
}
function updateAmount(ele) {
    var item = ele.parentElement.getElementsByClassName('product--price').item(0);
    var itemNumber = ele.parentElement.getElementsByClassName('product--number').item(0);
    var numP = itemNumber.value;
    var moneyStr = item.innerHTML;
    // Loại bỏ ký tự "&nbsp;" trong chuỗi
    moneyStr = moneyStr.replace("&nbsp;", "");
    // Loại bỏ ký tự "₫" trong chuỗi
    moneyStr = moneyStr.replace("₫", "");
    // Loại bỏ ký tự "." trong chuỗi
    moneyStr = moneyStr.replace(".", "");
    if (ele.checked) {
        // Chuyển đổi chuỗi thành số
        moneyNum += Number(moneyStr) * numP;
    } else {
        moneyNum -= Number(moneyStr) * numP;
    }
    var tranFee = tranportFee;
    if (moneyNum == 0) {
        tranFee = 0;
    }
    document.getElementsByClassName('right-bar').item(0).innerHTML = `<p><span>Tạm tính</span><span>` + formatMoneyVND(moneyNum) + `</span></p>
    <hr />
    <p><span>Phí giao hàng</span><span>`+ formatMoneyVND(tranFee) + `</span></p>
    <hr />
    <p><span>Tổng</span><span>`+ formatMoneyVND(moneyNum + tranFee) + `</span></p>
    <a onclick="datHang()"><i class="fa fa-shopping-cart"></i>Thanh toán</a>`
}
function datHang() {
    var Cart = [];
    var items = document.getElementsByName('checkProduct');
    for (let item of items) {
        if (item.checked) {
            Cart.push(item.value);
        }
    }
    if (Cart.length == 0) {
        alert('Vui lòng chọn sản phẩm!');
    } else {
        localStorage.setItem("cart", Cart);
        window.location.replace("dathang.html");
    }
}
function updateCart(cart, numberProduct) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "cardId": cart,
        "productCount": numberProduct
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/update-cart", requestOptions)
        .then(response => response.json())
        .then(result => {
            getNumberProductInCart();
        })
        .catch(error => console.log('error', error));
}