window.addEventListener("load", function (event) {
    document.getElementsByClassName('product_page').item(0).classList.add('header--navBar--item__active');
    setHeightListFeaturedProduct();
    setInterval(productTranfer, 5000);
});

document.getElementsByClassName('dialogFilter--board').item(0).addEventListener('click', function(event){
    event.stopPropagation();
})
function setHeightListFeaturedProduct(){
    let ele = document.getElementsByClassName('content--sidebar--product--items').item(0);
    let item = ele.getElementsByClassName('content--sidebar--product--item');
    let height = 0;
    if(item.length > 3){
        height = item[0].clientHeight + item[1].clientHeight + item[2].clientHeight + 10*2*2 - 2;
    }
    ele.style.height = height + 'px';
}
function productTranfer(){
    var ele = document.getElementsByClassName('content--sidebar--product--items').item(0);
    items = ele.getElementsByClassName('content--sidebar--product--item');
    var html = '';
    for (let i = 1; i < items.length; i++) {
        html += items[i].outerHTML;
    }
    html += items[0].outerHTML;
    ele.innerHTML = html;
    setHeightListFeaturedProduct();
}
function openDialogFiler(){
    document.getElementsByClassName('dialogFilter').item(0).style.display = 'block';
}
function closeDialogFiler(){
    document.getElementsByClassName('dialogFilter').item(0).style.display = 'none';
}