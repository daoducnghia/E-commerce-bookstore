document.addEventListener("DOMContentLoaded", function (event) {
  setInterval(clickArrowRight, 4000);
});
window.addEventListener("load", function (event) {
  document
    .getElementsByClassName("home_page")
    .item(0)
    .classList.add("header--navBar--item__active");

  showPromotion()
  showCategoryParent()
  pickTop15Product(this.document.querySelector('.content--product--listTitle--item'), 'banchay');
  var username = localStorage.getItem("username");
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
        <a href="dangnhap.html">
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
});
function clickArrowRight() {
  var ele = document.getElementsByClassName("content--slider--items").item(0);
  items = ele.getElementsByClassName("content--slider--item");
  var html = "";
  for (let i = 1; i < items.length; i++) {
    html += items[i].outerHTML;
  }
  html += items[0].outerHTML;
  ele.innerHTML = html;
}
function clickArrowLeft() {
  var ele = document.getElementsByClassName("content--slider--items").item(0);
  items = ele.getElementsByClassName("content--slider--item");
  var html = items[items.length - 1].outerHTML;
  for (let i = 0; i < items.length - 1; i++) {
    html += items[i].outerHTML;
  }
  ele.innerHTML = html;
}

function showPromotion() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-all-promotion-active", requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var pro of result) {
        html += `<div class="content--slider--item">
                <a onclick="pickPromotion(`+ pro.promotionId + `)"><img
                src="`+ pro.linkImage + `"
                alt="" /></a>
                </div>`
      }
      document.querySelector(".content--slider--items").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}
function showCategoryParent() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-category-parent", requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var c of result) {
        html += `<div class="content--catalog--item">
        <a onclick="showProductByCategory(`+ c.categoryId + `)">
          <span class="content--catalog--item__img"><img
              src="`+ c.linkImage + `" alt="` + c.categoryName + `" /></span>
          <span class="content--catalog-item__title">`+ c.categoryName + `</span>
        </a>
      </div>`
      }
      document.querySelector(".content--catalog--items").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}
function showProduct(type) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-top15-product?type=" + type, requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var p of result) {
        html += `<div class="content--product--item">`
        var sale = Math.round((p.oldPrice - p.price) / p.oldPrice * 100);
        if (sale >= 5) {
          html += `<div class="content--product--item--sale">
            <div class="content--product--item--sale--flag"></div>
            -`+ sale + `%
          </div>`;
        }
        html += `<div class="content--product--item--like">`;
        var listLikeProduct = [];
        if (localStorage.getItem('listLikeProduct') != null) {
          listLikeProduct = localStorage.getItem('listLikeProduct').split(',');
        }
        if (listLikeProduct.includes(p.productId.toString())) {
        html += `<i class="fa-light fa-heart text__red" onclick="likeProduct(` + p.productId + `, this)"></i>`;
        } else {
          html += `<i class="fa-light fa-heart" onclick="likeProduct(` + p.productId + `, this)"></i>`;
        }
        html += `</div>
        <div class="content--product--item--img">
          <img src="`+ p.linkImage + `" alt="" />
        </div>
        <a href="chitietsp.html?id=`+ p.productId + `"><div class="content--product--item--title">` + p.productName + `</div></a>`;
        if (sale > 0)
          html += `<div class="content--product--item--price__old">` + formatMoneyVND(p.oldPrice) + `</div>`;
        html += `<div class="content--product--item--price">` + formatMoneyVND(p.price) + `</div>
                <div class="content--product--item--point">`;
        for (var i = 0; i < Math.round(p.point); i++) {
          html += `<i class="fa-duotone fa-star" style="color: #ffbb00;"></i>`
        }
        for (var i = Math.round(p.point); i < 5; i++) {
          html += `<i class="fa-duotone fa-star"></i>`
        }
        html += `</div>
        <div class="content--product--item--btn">
          <button class="btn" onclick="addToCart(`+ p.productId + `)">Thêm vào giỏ hàng</button>
        </div>
      </div>`
      }
      document.querySelector(".content--product--items").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}
function pickTop15Product(ele, type) {
  var lEle = document.getElementsByClassName('content--product--listTitle--item');
  for (var e of lEle) {
    e.classList.remove('content--product--listTitle--item__active');
  }
  ele.classList.add('content--product--listTitle--item__active');
  showProduct(type);
}

function pickPromotion(promotionId) {
  window.location.replace("danhsachsp.html?promotion=" + promotionId);
}
// SEARCH--------------------------------------------------------------
