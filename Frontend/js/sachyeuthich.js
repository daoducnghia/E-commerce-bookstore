window.addEventListener("load", function () {
    showMenuLeft();
    showProductNoiBat();
    loadProductLike();
});
function loadProductLike() {
    var listLikeProduct = [];
    if (localStorage.getItem('listLikeProduct') != null) {
        listLikeProduct = localStorage.getItem('listLikeProduct').split(',');
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(listLikeProduct);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/get-all-product-by-id", requestOptions)
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
            html += `<i class="fa-light fa-star" style="color: #ffbb00;"></i>`
        }
        for (var i = Math.round(p.point); i < 5; i++) {
            html += `<i class="fa-light fa-star""></i>`
        }
        html += `</div>
      <div class="content--product--item--btn">
        <button class="btn" onclick="addToCart(`+ p.productId + `)">Thêm vào giỏ hàng</button>
      </div>
    </div>`
    }
    document.querySelector(".content--product--items").innerHTML = html;
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