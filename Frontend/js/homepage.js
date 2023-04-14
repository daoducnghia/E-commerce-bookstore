document.addEventListener("DOMContentLoaded", function (event) {
    setInterval(clickArrowRight, 4000)
});
window.addEventListener("load", function (event) {
    document.getElementsByClassName('home_page').item(0).classList.add('header--navBar--item__active')
});
function clickArrowRight() {
    var ele = document.getElementsByClassName('content--slider--items').item(0);
    items = ele.getElementsByClassName('content--slider--item');
    var html = '';
    for (let i = 1; i < items.length; i++) {
        html += items[i].outerHTML;
    }
    html += items[0].outerHTML;
    ele.innerHTML = html;
}
function clickArrowLeft() {
    var ele = document.getElementsByClassName('content--slider--items').item(0);
    items = ele.getElementsByClassName('content--slider--item');
    var html = items[items.length - 1].outerHTML;;
    for (let i = 0; i < items.length - 1; i++) {
        html += items[i].outerHTML;
    }
    ele.innerHTML = html;
}
