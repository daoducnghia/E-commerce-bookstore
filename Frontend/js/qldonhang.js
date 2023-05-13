window.addEventListener("load", function (event) {
    if (localStorage.getItem('username') == null) {
        window.location.replace('dangnhap.html');
    }
    document.getElementsByClassName('orderpage').item(0).classList.add('content--sidebar--item__active');
    viewOrder(this.document.getElementsByClassName('content--body--title--item').item(0), "chuaxacnhan");
    var inputSearch = document.getElementById('inptSearchOrder');
    inputSearch.addEventListener("keydown", function(event){
        if(event.key == 'Enter'){
            if(inputSearch.value.trim() != ''){
                searchOrder(inputSearch.value.trim());
            }
        }
    })
});
function viewOrder(ele, mes) {
    for (var e of document.getElementsByClassName('content--body--title--item')) {
        e.classList.remove('content--body--title--item__active');
    }
    ele.classList.add('content--body--title--item__active');
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));
    myHeaders.append("statusOrder", mes);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(url + "/api/get-all-order", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            var html = '';
            for (var od of result) {
                html += `<div class="content--body--items">
                <div class="content--body--item">`+ od.order.orderId + `</div>
                <div class="content--body--item">`+ od.order.user.account.username + `</div>
                <div class="content--body--item">`+ od.shippingInformation.shipmentDetail.consigneeName + `
                <br>`+ od.shippingInformation.shipmentDetail.phoneNumber + `
                <br>`+ od.shippingInformation.shipmentDetail.addressDetail + `, 
                `+ od.shippingInformation.shipmentDetail.commune + `, 
                `+ od.shippingInformation.shipmentDetail.district + `, 
                `+ od.shippingInformation.shipmentDetail.province + `</div>
                <div class="content--body--item">`;
                for (var p of od.listOrderDetail) {
                    html += p.product.productName + `    X` + p.quantity + `<br>`;
                }
                html += `</div>
                <div class="content--body--item">`+ formatMoneyVND(od.order.orderTotal) + `</div>
                <div class="content--body--item">`+ formatMoneyVND(od.order.discount) + `</div>
                <div class="content--body--item">`+ od.order.orderStatus + `</div>`
                if (od.order.orderStatus == 'Chờ xác nhận' || od.order.orderStatus == 'Chờ vận chuyển') {
                    html += `<div class="content--body--item" style="display: flex;justify-content: right;">
                    <button class="btn" onclick="updateOrderStatus(`+ od.order.orderId + `, 'Đang vận chuyển')">Xác nhận</button>
                    <button class="btn btn__gray" onclick="cancelOrder(`+ od.order.orderId + `)">Huỷ</button>
                    </div>`
                } else {
                    html += `<div class="content--body--item" style="display: flex;justify-content: right;">
                    <button class="btn btn">Chi tiết</button>
                    </div>`
                }
                html += `</div></div>`
            }
            document.getElementsByClassName('content--body--tbody').item(0).innerHTML = html;
        })
        .catch(error => console.log('error', error));
}

function cancelOrder(idOrder) {
    if (confirm('Xác nhận huỷ đơn hàng ' + idOrder)) {
        updateOrderStatus(idOrder, "Huỷ")
    }
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
                viewOrder(this.document.getElementsByClassName('content--body--title--item').item(0), "chuaxacnhan");
            } else {
                alert("Đã xảy ra lỗi, vui lòng thực hiện lại!")
            }
        })
        .catch(error => console.log('error', error));
}
function searchOrder(mes) {
    for (var e of document.getElementsByClassName('content--body--title--item')) {
        e.classList.remove('content--body--title--item__active');
    }
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/get-all-order-by-id?idOrder=" + mes, requestOptions)
        .then(response => response.json())
        .then(result => {
            var html = '';
            for (var od of result) {
                html += `<div class="content--body--items">
                <div class="content--body--item">`+ od.order.orderId + `</div>
                <div class="content--body--item">`+ od.order.user.account.username + `</div>
                <div class="content--body--item">`+ od.shippingInformation.shipmentDetail.consigneeName + `
                <br>`+ od.shippingInformation.shipmentDetail.phoneNumber + `
                <br>`+ od.shippingInformation.shipmentDetail.addressDetail + `, 
                `+ od.shippingInformation.shipmentDetail.commune + `, 
                `+ od.shippingInformation.shipmentDetail.district + `, 
                `+ od.shippingInformation.shipmentDetail.province + `</div>
                <div class="content--body--item">`;
                for (var p of od.listOrderDetail) {
                    html += p.product.productName + `    X` + p.quantity + `<br>`;
                }
                html += `</div>
                <div class="content--body--item">`+ formatMoneyVND(od.order.orderTotal) + `</div>
                <div class="content--body--item">`+ formatMoneyVND(od.order.discount) + `</div>
                <div class="content--body--item">`+ od.order.orderStatus + `</div>`
                if (od.order.orderStatus == 'Chờ xác nhận' || od.order.orderStatus == 'Chờ vận chuyển') {
                    html += `<div class="content--body--item" style="display: flex;justify-content: right;">
                    <button class="btn" onclick="updateOrderStatus(`+ od.order.orderId + `, 'Đang vận chuyển')">Xác nhận</button>
                    <button class="btn btn__gray" onclick="cancelOrder(`+ od.order.orderId + `)">Huỷ</button>
                    </div>`
                } else {
                    html += `<div class="content--body--item" style="display: flex;justify-content: right;">
                    <button class="btn btn">Chi tiết</button>
                    </div>`
                }
                html += `</div></div>`
            }
            document.getElementsByClassName('content--body--tbody').item(0).innerHTML = html;
        })
        .catch(error => console.log('error', error));
}