window.addEventListener("load", function (event) {
    if (localStorage.getItem('username') == null) {
        window.location.replace('dangnhap.html');
    }
    document.getElementsByClassName('productpage').item(0).classList.add('content--sidebar--item__active')
});
function suasanpham(idP){
    openPopup('popupAddProduct');
    //Lấy thông tin sản phẩm theo id hiện lên popup

    //Lưu lại thông tin sp vừa sửa
}