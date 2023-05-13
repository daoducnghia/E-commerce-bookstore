window.addEventListener("load", function (event) {
  if (localStorage.getItem("username") == null) {
    window.location.replace("dangnhap.html");
  }
  document
    .getElementsByClassName("productpage")
    .item(0)
    .classList.add("content--sidebar--item__active");

  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // get all category
  fetch("http://localhost:8080/api/getCategory", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var html = ``;
      for (let x = 0; x < result.length; x++) {
        html += `<option value="">` + result[x].categoryName + `</option>`;
      }
      var elementCate = document.getElementById("dd-category");
      elementCate.innerHTML = html;
    })
    .catch((error) => console.log("error", error));
  // get all language
  fetch("http://localhost:8080/api/getLanguage", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var html = ``;
      for (let x = 0; x < result.length; x++) {
        html += `<option value="">` + result[x].languageName + `</option>`;
      }
      var elementLang = document.getElementById("dd-lang");
      elementLang.innerHTML = html;
    })
    .catch((error) => console.log("error", error));
  // load all product
  if (searchTerm == null) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/showAllProduct", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var html = ``;
        for (let x = 0; x < result.length; x++) {
          var stt = x + 1;
          html +=
            `<div class="content--body--items">
                        <div class="content--body--item">` +
            stt +
            `</div>
                        <div class="content--body--item">` +
            result[x].productName +
            `</div>
                        <div class="content--body--item">` +
            result[x].category.categoryName +
            `</div>
                        <div class="content--body--item">` +
            result[x].language.languageName +
            `</div>
                        <div class="content--body--item">` +
            result[x].publishingCompany.publishingCompanyName +
            `</div>
                        <div class="content--body--item">` +
            result[x].publicationDate +
            `</div>
                        <div class="content--body--item">` +
                        formatMoneyVND(result[x].price) +
            `</div>
                        <div class="content--body--item">` +
            result[x].numberOfProduct +
            `</div>
                        <div class="content--body--item">` +
            result[x].numberOfProductSold +
            `</div>
                        <div class="content--body--item">
                            <button class="btn" onclick="suaSanPham(` +
            result[x].productId +
            `)">Sửa</button>
                            <button class="btn btn__gray" onclick="xoaSP(` +
            result[x].productId +
            `)">Xoá</button>
                        </div>
                    </div>`;
        }

        const element = document.getElementById("content--body--tbody");
        element.innerHTML = html;
      })
      .catch((error) => console.log("error", error));
  } else {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/search?name=" + searchTerm, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var html = ``;
        console.log(result);
        for (let x = 0; x < result.length; x++) {
          var stt = x + 1;
          html +=
            `<div class="content--body--items">
                        <div class="content--body--item">` +
            stt +
            `</div>
                        <div class="content--body--item">` +
            result[x].productName +
            `</div>
                        <div class="content--body--item">` +
            result[x].category.categoryName +
            `</div>
                        <div class="content--body--item">` +
            result[x].language.languageName +
            `</div>
                        <div class="content--body--item">` +
            result[x].publishingCompany.publishingCompanyName +
            `</div>
                        <div class="content--body--item">` +
            result[x].publicationDate +
            `</div>
                        <div class="content--body--item">` +
            result[x].price +
            `đ</div>
                        <div class="content--body--item">` +
            result[x].numberOfProduct +
            `</div>
                        <div class="content--body--item">` +
            result[x].numberOfProductSold +
            `</div>
                        <div class="content--body--item">
                            <button class="btn" onclick="suaSanPham(` +
            result[x].productId +
            `)">Sửa</button>
                            <button class="btn btn__gray" onclick="xoaSP(` +
            result[x].productId +
            `)">Xoá</button>
                        </div>
                    </div>`;
        }
        const element = document.getElementById("content--body--tbody");
        element.innerHTML = html;
      })
      .catch((error) => console.log("error", error));
  }

  // JS thêm sản phẩm

  var form = document.getElementById("form-add");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn gửi form đi
    var id = document.getElementById("idProduct").value;

    var selectBoxL = document.getElementById("dd-lang");
    var textL = selectBoxL.options[selectBoxL.selectedIndex].text;

    var selectBoxC = document.getElementById("dd-category");
    var textC = selectBoxC.options[selectBoxC.selectedIndex].text;

    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var authors = document.getElementById("authors").value;
    var trans = document.getElementById("trans").value;
    var nxb = document.getElementById("nxb").value;
    var page = document.getElementById("page").value;
    var size = document.getElementById("size").value;
    var date = document.getElementById("date").value;
    var quant = document.getElementById("quant").value;
    var describe = document.getElementById("describe").value;

    var linkImg = document.getElementById("linkImg").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      name: name,
      linkImg: linkImg,
      price: price,
      language: textL,
      translator: trans,
      nxb: nxb,
      page: page,
      size: size,
      dateRelease: date,
      quantity: quant,
      describe: describe,
      authors: authors,
      category: textC,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/addProduct", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result == "Trong try") {
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  });

  document
    .getElementsByClassName("productpage")
    .item(0)
    .classList.add("content--sidebar--item__active");
});
function suaSanPham(id) {
  document.getElementById("idProduct").value = id;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/showSingleProduct?id=" + id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("name").value = result.name;
      document.getElementById("price").value = result.price;
      document.getElementById("authors").value = result.authors;
      document.getElementById("trans").value = result.translator;
      document.getElementById("nxb").value = result.nxb;
      document.getElementById("page").value = result.page;
      document.getElementById("size").value = result.size;
      document.getElementById("quant").value = result.quantity;
      document.getElementById("describe").value = result.describe;

      // dropdown
      document.getElementById("dd-lang").text = result.language;
      document.getElementById("dd-category").text = result.category;

      //date
      document.getElementById("date").value = result.dateRelease;
    })
    .catch((error) => console.log("error", error));

  openPopup("popupAddProduct");
}

function xoaSP(id) {
  document.getElementById("idProduct").value = id;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/deleteProduct?id=" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => console.log("error", error));
}

function suasanpham(idP) {
  openPopup("popupAddProduct");
  //Lấy thông tin sản phẩm theo id hiện lên popup

  //Lưu lại thông tin sp vừa sửa
}
