window.addEventListener("load", function (event) {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  const category = params.get("category");
  const promotion = params.get("promotion");

  showMenuLeft();
  showProductNoiBat();
  if (searchTerm != null) {
    // Lấy giá trị của tham số truy vấn 'search' ---------------------------------------------------------
    searchProduct(searchTerm)
  } else if (category != null) {
    //Hiển thị sản phẩm theo category
    showAllProductByCategory(category);
  } else if (promotion != null) {
    //Hiển thị sản phẩm theo promotion
    showAllProductByPromotion(promotion);
  } else {
    // Hiển thị toàn bộ sản phẩm trong trang ---------------------------------------------------------
    showAllProduct('moinhat');
  }

  document.getElementsByClassName("product_page").item(0).classList.add("header--navBar--item__active");
  setHeightListFeaturedProduct();
  setInterval(productTranfer, 5000);
});

document
  .getElementsByClassName("popup--board")
  .item(0)
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
function setHeightListFeaturedProduct() {
  let ele = document
    .getElementsByClassName("content--sidebar--product--items")
    .item(0);
  let item = ele.getElementsByClassName("content--sidebar--product--item");
  let height = 0;
  if (item.length > 3) {
    height =
      item[0].clientHeight +
      item[1].clientHeight +
      item[2].clientHeight +
      10 * 2 * 2 -
      2;
  }
  ele.style.height = height + "px";
}
function productTranfer() {
  var ele = document
    .getElementsByClassName("content--sidebar--product--items")
    .item(0);
  items = ele.getElementsByClassName("content--sidebar--product--item");
  var html = "";
  for (let i = 1; i < items.length; i++) {
    html += items[i].outerHTML;
  }
  html += items[0].outerHTML;
  ele.innerHTML = html;
  setHeightListFeaturedProduct();
}
function openPopup(ele) {
  document.getElementById(ele).style.display = "block";
  // document.getElementsByClassName(ele).item(0).style.display = 'block';
}
function closePopup(ele) {
  document.getElementById(ele).style.display = "none";
  // document.getElementsByClassName(ele).item(0).style.display = 'none';
}
function showAllProduct(type) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-all-product?type=" + type, requestOptions)
    .then(response => response.json())
    .then(result => {
      showProductFromList(result);
    })
    .catch(error => console.log('error', error));
}
function showProductNoiBat() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-top15-product?type=banchay", requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var p of result) {
        html += `<div class="content--sidebar--product--item">`
        var sale = Math.round((p.oldPrice - p.price) / p.oldPrice * 100);
        if (sale > 5) {
          html += `<div class="content--sidebar--product--item--sale">
          <div class="content--sidebar--product--item--sale--flag"></div>
          -`+ sale + `%
        </div>`
        }
        html += `<div class="content--sidebar--product--item--like">`
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
        <div class="content--sidebar--product--item--img">
          <img
            src="`+ p.linkImage + `"
            alt=""
          />
        </div>
        <div class="content--sidebar--product--item--title">
          <a href="chitietsp.html?id=`+ p.productId + `">` + p.productName + `</a>
        </div>
        <div class="content--sidebar--product--item--price">` + formatMoneyVND(p.price) + `</div>
      </div>`
      }
      document.querySelector(".content--sidebar--product--items").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}
var dropdownlistSapXep = document.querySelector("#dropdownlistSapXep");
dropdownlistSapXep.addEventListener("change", function () {
  showAllProduct(this.value);
})
function searchProduct(searchTerm) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/search?name=" + searchTerm, requestOptions)
    .then((response1) => response1.json())
    .then((result) => {
      showProductFromList(result);
    })
    .catch((error) => console.log("error", error));
}
function showAllProductByCategory(category) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-all-product-by-category?category=" + category, requestOptions)
    .then(response => response.json())
    .then(result => {
      showProductFromList(result);
    })
    .catch(error => console.log('error', error));
}
function showProductFromList(result) {
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
}
function showAllProductByPromotion(promotion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-all-product-by-promotion?promotion=" + promotion, requestOptions)
    .then(response => response.json())
    .then(result => {
      showProductFromList(result);
    })
    .catch(error => console.log('error', error));
}
function showMenuLeft() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(url + "/api/get-category", requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '';
      for (var c of result) {
        html += `<div class="content--sidebar--item" onclick="showProductByCategory(` + c.category.categoryId + `)">
        `+ c.category.categoryName + `
        <div class="content--sidebar--module">`;
        for (var ct of c.listCategory) {
          html += `<div class="content--sidebar--module--item">
          <a onclick="showProductByCategory(`+ ct.categoryId + `)">` + ct.categoryName + `</a>
        </div>`
        }
        html += `</div>
          </div>`
      }
      document.querySelector(".content--sidebar--items").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}