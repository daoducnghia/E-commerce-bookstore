window.addEventListener("load", function (event) {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("id");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/product?id=" + searchTerm, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      //   console.log(result.productName);
      html =
        `<div class="col-2">
                <img
                  src="` +
        result.linkImage +
        `"
                  alt=""
                  width="100%"
                  id="ProductImg"
                />

              </div>
              <div class="col-2">
                <h1 id="name">` +
        result.productName +
        `</h1>
                <h4 id="price" style="color:red">` +
        formatMoneyVND(result.price) +
        ` </h4>
                <input
                  type="number"
                  name=""
                  id="input-number-product"
                  value="1"
                />
                <a onclick="addToCartID()" class="btnA">Thêm vào giỏ hàng</a>
                <h3>Thông tin sản phẩm</h3>
                <table>
                  <tr>
                    <th style="width: 35%"></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>Công ty phát hành:</td>
                    <td id="nha-phat-hanh">` +
        result.publishingCompany.publishingCompanyName +
        `</td>
                  </tr>
                  <tr>
                    <td>Ngày xuất bản:</td>
                    <td id="ngay-xuat-ban">` +
        result.publicationDate +
        `</td>
                  </tr>
                  <tr>
                    <td>Kích thước:</td>
                    <td id="kick-thuoc">` +
        result.productSize +
        `</td>
                  </tr>
                  <tr>
                    <td>Dịch Giả:</td>
                    <td id="dich-gia">
                      ` +
        result.translator +
        `
                    </td>
                  </tr>
                  <tr>
                    <td>Loại bìa:</td>
                    <td id="bia">Bìa mềm</td>
                  </tr>
                  <tr>
                    <td>Số trang:</td>
                    <td id="so-trang">` +
        result.numbersOfPages +
        `</td>
                  </tr>
                </table>
              </div>
            </div>`;
      html2 =
        `     <hr />
              <h1>Chi tiết sách</h1>
              <p>
                ` +
        result.productDescription +
        `
              </p>
              <br />
            `;

      const element = document.getElementById("row");
      const element2 = document.getElementById("description-product");
      element.innerHTML = html;
      element2.innerHTML = html2;
      // xong đến mô tả sản phẩm
    })
    .catch((error) => console.log("error", error));

  // bắt đầu xử lý phần đánh giá
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/api/product-review?id=" + searchTerm,
    requestOptions
  )
    .then((response1) => response1.json())
    .then((result1) => {
      //xử lý điểm trung bình đánh giá
      var sumPoint = 0;
      for (let x = 0; x < result1.length; x++) {
        sumPoint += result1[x].point;
      }
      var avrPoint = (sumPoint / result1.length).toFixed(1);

      var htmlDanhGia = `<hr />
              <h1>Đánh giá</h1>
              <div class="tong-quan-danh-gia">
                <h2>`;
      if (avrPoint == "NaN") {
        htmlDanhGia += 0;
      } else {
        htmlDanhGia += avrPoint;
      }
      htmlDanhGia +=
        `/5 trên tổng ` +
        result1.length +
        ` đánh giá</h2>
              </div>`;

      for (let x = 0; x < result1.length; x++) {
        var htmlStars = "";
        for (let star = 0; star < result1[x].point; star++) {
          htmlStars += `<i class="fa-solid fa-star" style="color: #ff0000;"></i>`;
        }
        if (result1[x].point < 5) {
          for (let star = result1[x].point; star < 5; star++) {
            htmlStars += `<i class="star-danh-gia fa-regular fa-star" style="color: #ff0000"></i>`;
          }
        }
        // htmlStars = "" + htmlStars + "";
        // console.log(htmlStars);
        htmlDanhGia +=
          `<div id="box-danh-gia" class="box-danh-gia">
                <h6 class="name-danhgia">` +
          result1[x].user.name +
          `</h6>
                <div class="stars">
                  ` +
          htmlStars +
          `
                </div>
                <p class="danh-gia">
            ` +
          result1[x].description +
          `
                </p>
            </div>`;
      }
      const element3 = document.getElementById("danhgia");
      element3.innerHTML = htmlDanhGia;
    })
    .catch((error1) => console.log("error1", error1));
});
function addToCartID() {
  addToCart(new URLSearchParams(window.location.search).get("id"));
}
