window.addEventListener("load", function (event) {
  // Lấy giá trị của tham số truy vấn 'search'
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");

  console.log(searchTerm);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/search?name=" + searchTerm, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var html = `<div class="content--product--item">
          <div class="content--product--item--sale">
            <div class="content--product--item--sale--flag"></div>
            -30%
          </div>
          <div class="content--product--item--like">
            <i class="fa-light fa-heart"></i>
          </div>
          <div class="content--product--item--img">
            <img src="https://cdn0.fahasa.com/media/catalog/product/9/7/9786043718598.jpg" alt="" />
          </div>
          <div class="content--product--item--title">
            <a href="">Vạn nhân ký - noãn</a>
          </div>
          <div class="content--product--item--price__old">150.000đ</div>
          <div class="content--product--item--price">127.000đ</div>
          <div class="content--product--item--point">
            <i class="fa-light fa-star point__1"></i>
            <i class="fa-light fa-star point__2"></i>
            <i class="fa-light fa-star point__3"></i>
            <i class="fa-light fa-star point__4"></i>
            <i class="fa-light fa-star point__5"></i>
          </div>
          <div class="content--product--item--btn">
            <button class="btn">Thêm vào giỏ hàng</button>
          </div>
        </div>`;
      var html1 = null;
      //   console.log(result[0].productName);
      for (let x = 0; x < result.length; x++) {
        console.log(result[x].productName);
        if (x == 0) {
          html1 =
            `<div class="content--product--item">
          <div class="content--product--item--sale">
            <div class="content--product--item--sale--flag"></div>
            -30%
          </div>
          <div class="content--product--item--like">
            <i class="fa-light fa-heart"></i>
          </div>
          <div class="content--product--item--img">
            <img src="` +
            result[x].linkImage +
            `" alt="" />
          </div>
          <div class="content--product--item--title">
            <a href="">` +
            result[x].productName +
            `</a>
          </div>
          <div class="content--product--item--price__old">` +
            result[x].price +
            `đ</div>
          <div class="content--product--item--price">` +
            result[x].price +
            `đ</div>
          <div class="content--product--item--point">
            <i class="fa-light fa-star point__1"></i>
            <i class="fa-light fa-star point__2"></i>
            <i class="fa-light fa-star point__3"></i>
            <i class="fa-light fa-star point__4"></i>
            <i class="fa-light fa-star point__5"></i>
          </div>
          <div class="content--product--item--btn">
            <button class="btn">Thêm vào giỏ hàng</button>
          </div>
        </div>`;
        } else {
          html1 +=
            `<div class="content--product--item">
          <div class="content--product--item--sale">
            <div class="content--product--item--sale--flag"></div>
            -30%
          </div>
          <div class="content--product--item--like">
            <i class="fa-light fa-heart"></i>
          </div>
          <div class="content--product--item--img">
            <img src="` +
            result[x].linkImage +
            `" alt="" />
          </div>
          <div class="content--product--item--title">
            <a href="">` +
            result[x].productName +
            `</a>
          </div>
          <div class="content--product--item--price__old">` +
            result[x].price +
            `đ</div>
          <div class="content--product--item--price">` +
            result[x].price +
            `đ</div>
          <div class="content--product--item--point">
            <i class="fa-light fa-star point__1"></i>
            <i class="fa-light fa-star point__2"></i>
            <i class="fa-light fa-star point__3"></i>
            <i class="fa-light fa-star point__4"></i>
            <i class="fa-light fa-star point__5"></i>
          </div>
          <div class="content--product--item--btn">
            <button class="btn">Thêm vào giỏ hàng</button>
          </div>
        </div>`;
        }
      }
      //   $(".content--product--items").innerHTML = html1;
      const element = document.getElementById("content--product--items");

      element.innerHTML = html1;
    })
    .catch((error) => console.log("error", error));

  document
    .getElementsByClassName("product_page")
    .item(0)
    .classList.add("header--navBar--item__active");
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

// var requestOptions = {
//   method: "GET",
//   redirect: "follow",
// };

// fetch("http://localhost:8080/api/search?name=" + , requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
