if (localStorage.getItem('username') == null) {
  window.location.replace('dangnhap.html');
}
var idOrder = localStorage.getItem("idOrder");
if (idOrder === null) {
    window.location.replace("lichsumuahang.html");
} else {
    getDonHang(idOrder);
}


function getDonHang(id) {
    localStorage.removeItem('idOrder');
    var totalAmount = 0;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url + "/api/get-order-by-id?idOrder="+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.getElementsByClassName('content--address--main--infoUser').item(0).innerHTML = `Người nhận: ` + result.shipmentDetailEntity.consigneeName + `
            <br>Số điện thoại: ` + result.shipmentDetailEntity.phoneNumber + `
            <br>Địa chỉ: ` + result.shipmentDetailEntity.addressDetail + `, 
            `+ result.shipmentDetailEntity.commune + `, 
            `+ result.shipmentDetailEntity.district + `, 
            ` + result.shipmentDetailEntity.province;
            var html = '';
            for(let orderDetail of result.listOrderDetail){
                totalAmount += orderDetail.price*orderDetail.quantity;
                html += `<div class="product--item">
                <div class="product--item--image">
                  <img src="`+ orderDetail.product.linkImage +`" alt="" />
                </div>
                <div class="product--item--name">`+ orderDetail.product.productName +`</div>
                <div class="product--item--price">`+ formatMoneyVND(orderDetail.price) +`</div>
                <div class="product--item--quantity">`+ orderDetail.quantity +`</div>
                <div class="product--item-cost">`+ formatMoneyVND(orderDetail.price*orderDetail.quantity) +`</div>
              </div>`
            }
            document.getElementsByClassName('product--items').item(0).innerHTML = html;
            document.getElementsByClassName('content--product--cost').item(0).innerHTML = `Tổng tiền: ` + formatMoneyVND(totalAmount)
            if(result.paymentMethod == 'cod'){
                document.getElementsByClassName('content--pay-paymentMethod--content').item(0).innerHTML = 'Thanh toán khi nhận hàng';
                document.getElementsByClassName('content--pay--main').item(0).innerHTML = `<div class="content--pay--main__left">Thanh toán khi nhận hàng</div>
                <div class="content--pay--main__right">Phí thu hộ: 0đ</div>`
            } else {
                document.getElementsByClassName('content--pay-paymentMethod--content').item(0).innerHTML = 'Thanh toán thẻ Tín dụng/Ghi nợ';
                document.getElementsByClassName('content--pay--main').item(0).innerHTML = `<div class="content--pay--main__left">
                Thanh toán thẻ Tín dụng/Ghi nợ
              </div>
              <div class="content--pay--main__right">
                <div class="content--pay--main__right--credit">
                  `+ result.paymentMethod +`
                </div>
              </div>`
            }
            document.getElementById('messageOrder').value = result.message;
            document.getElementsByClassName('content--pay--footer--cost').item(0).innerHTML = `<div class="content--pay--footer--cost--item">
            Tống tiền hàng: `+ formatMoneyVND(result.orderTotal + result.discount) +`
          </div>
          <div class="content--pay--footer--cost--item">
            Phí vận chuyển: `+ formatMoneyVND(result.transportFee) +`
          </div>
          <div class="content--pay--footer--cost--item">
            Giảm giá: -`+ formatMoneyVND(result.discount) +`
          </div>
          <div class="content--pay--footer--cost--item">
            Tống thanh toán: `+ formatMoneyVND(result.orderTotal + result.transportFee) +`
          </div>`
        })
        .catch(error => console.log('error', error));
}