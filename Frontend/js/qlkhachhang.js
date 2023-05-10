window.addEventListener("load", function (event) {
    if (localStorage.getItem('username') == null) {
        window.location.replace('dangnhap.html');
    }
    document.getElementsByClassName('clientpage').item(0).classList.add('content--sidebar--item__active')
});