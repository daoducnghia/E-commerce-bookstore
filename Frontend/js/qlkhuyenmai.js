window.addEventListener("load", function (event) {
    if (localStorage.getItem('username') == null) {
        window.location.replace('dangnhap.html');
    }
    document.getElementsByClassName('promotionpage').item(0).classList.add('content--sidebar--item__active')
    viewPromotion();
});
var inptSearchPromotion = document.querySelector("#inptSearchPromotion");
inptSearchPromotion.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        if (inptSearchPromotion.value != '') {
            searchPromotionByName(inptSearchPromotion.value);
        }
    }
})
var checkboxChonTatCaSach = document.getElementById('chonTatCaSach');
checkboxChonTatCaSach.addEventListener("click", function () {
    if (checkboxChonTatCaSach.checked) {
        document.getElementsByClassName('popup--content--searchProduct').item(0).innerHTML = '';
        document.getElementsByClassName('popup--content--listProduct').item(0).innerHTML = '';
    } else {
        localStorage.removeItem('listPickProduct');
        document.getElementsByClassName('popup--content--searchProduct').item(0).innerHTML = `<div class="popup--content--searchProduct--icon">
        <input type="text" class="inpt inpt--icon" placeholder="Tìm kiếm theo tên sách"  onkeyup="searchProduct(event, this)"/>
        <i class="fa-light fa-magnifying-glass"></i>
        </div>
        <div class="content--product--items__select--nav">
        </div>`;
        document.getElementsByClassName('popup--content--listProduct').item(0).innerHTML = `<div class="popup--content--title">Danh sách sản phẩm</div>
        <div class="content--product--items--nav">
        </div>`;
    }
})
function searchProduct(event, inpt) {
    if (event.key == 'Enter' && inpt.value != '') {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url + "/api/search?name=" + inpt.value, requestOptions)
            .then(response => response.json())
            .then(result => {
                var html = '';
                for (var p of result) {
                    html += `<div class="content--product--items__select">
                    <div class="content--product--item"><input type="checkbox" name="" id="" value="`+ p.productId + `" onclick="pickProduct(this)"></div>
                    <div class="content--product--item"><img src="`+ p.linkImage + `" alt=""></div>
                    <div class="content--product--item">`+ p.productName + `</div>
                    <div class="content--product--item">Giá cũ: `+ formatMoneyVND(p.oldPrice) + `<br>Giá sale: ` + formatMoneyVND(p.price) + `</div>
                    </div>`
                }
                document.querySelector('.content--product--items__select--nav').innerHTML = html;
            })
            .catch(error => console.log('error', error));
    }
}
function pickProduct(ele) {
    if (ele.checked) {
        // l = l.filter(item => item !== 2)
        var listPickP = []
        if (localStorage.getItem("listPickProduct") != null)
            listPickP = localStorage.getItem("listPickProduct").split(',');
        listPickP.push(ele.value);
        listPickP = new Set(listPickP);
        listPickP = Array.from(listPickP);
        localStorage.setItem("listPickProduct", listPickP);
        ele.parentElement.parentElement.innerHTML = '';
        //Load lại danh sách sách đã chọn
        loadListProduct();
    }
}
function loadListProduct() {
    if (localStorage.getItem("listPickProduct") != null) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(localStorage.getItem("listPickProduct").split(','));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url + "/api/get-all-product-by-id", requestOptions)
            .then(response => response.json())
            .then(result => {
                var html = '';
                var count = 1;
                for (var p of result) {
                    html += `<div class="content--product--items">
                    <div class="content--product--item">`+ count + `</div>
                    <div class="content--product--item"><img src="`+ p.linkImage + `" alt=""></div>
                    <div class="content--product--item">`+ p.productName + `</div>
                    <div class="content--product--item">Giá cũ: `+ formatMoneyVND(p.oldPrice) + `<br>Giá sale: ` + formatMoneyVND(p.price) + `</div>
                    <div class="content--product--item"><button class="btn btn__gray" onclick="removePickProduct(`+ p.productId + `)">Xoá</button></div>
                </div>`;
                    count += 1;
                }
                document.querySelector('.content--product--items--nav').innerHTML = html;
            })
            .catch(error => console.log('error', error));
    }
}
function removePickProduct(idP) {
    var listPickP = localStorage.getItem("listPickProduct").split(',');
    listPickP = listPickP.filter(item => item != idP)
    localStorage.setItem("listPickProduct", listPickP);
    loadListProduct();
}
function addPromotion() {
    var idPromotion = document.querySelector("#idPromotion");
    var namePromotion = document.querySelector("#namePromotion");
    var imagePromotion = document.querySelector("#imagePromotion");
    var discountPromotion = document.querySelector("#discountPromotion");
    var typePromotion = document.querySelector("#typePromotion");
    var descriptionPromotion = document.querySelector("#descriptionPromotion");
    var startDatePromotion = document.querySelector("#startDatePromotion");
    var endDatePromotion = document.querySelector("#endDatePromotion");
    var chonTatCaSach = document.querySelector("#chonTatCaSach");
    idPromotion.value = '';
    namePromotion.value = '';
    imagePromotion.value = ''
    discountPromotion.value = '';
    typePromotion.value = 'pct';
    descriptionPromotion.value = '';
    startDatePromotion.value = '';
    endDatePromotion.value = '';
    chonTatCaSach.checked = true;
    document.getElementsByClassName('popup--content--searchProduct').item(0).innerHTML = '';
    document.getElementsByClassName('popup--content--listProduct').item(0).innerHTML = '';
    localStorage.removeItem("listPickProduct");
    openPopup('popupAddPromotion');
}

function savePromotion() {
    var idPromotion = document.querySelector("#idPromotion");
    var namePromotion = document.querySelector("#namePromotion");
    var imagePromotion = document.querySelector("#imagePromotion");
    var discountPromotion = document.querySelector("#discountPromotion");
    var typePromotion = document.querySelector("#typePromotion");
    var descriptionPromotion = document.querySelector("#descriptionPromotion");
    var startDatePromotion = document.querySelector("#startDatePromotion");
    var endDatePromotion = document.querySelector("#endDatePromotion");
    var chonTatCaSach = document.querySelector("#chonTatCaSach");
    var listIDProduct = [];
    var statusPromotion = 'all';
    var linkImage = '';
    if (!chonTatCaSach.checked) {
        statusPromotion = null;
        listIDProduct = localStorage.getItem("listPickProduct").split(',');
    }
    if (imagePromotion.value == '') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "promotion": {
                "promotionId": idPromotion.value,
                "promotionName": namePromotion.value,
                "promotionDescription": descriptionPromotion.value,
                "promotionType": typePromotion.value,
                "discount": discountPromotion.value,
                "linkImage": linkImage,
                "promotionStartTime": reDatePromotion(startDatePromotion.value, 'start'),
                "promotionEndTime": reDatePromotion(endDatePromotion.value, 'end')
            },
            "lProduct": listIDProduct,
            "statusPromotion": statusPromotion
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url + "/api/add-promotion", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result == 'OK') {
                    localStorage.removeItem("listPickProduct");
                    closePopup('popupAddPromotion');
                    viewPromotion();
                } else {
                    alert("Có lỗi xảy ra!");
                }
            })
            .catch(error => console.log('error', error));
    } else {
        var fReader = new FileReader();
        fReader.readAsDataURL(imagePromotion.files[0]);
        fReader.onload = function (e) {
            linkImage = e.target.result;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "promotion": {
                    "promotionId": idPromotion.value,
                    "promotionName": namePromotion.value,
                    "promotionDescription": descriptionPromotion.value,
                    "promotionType": typePromotion.value,
                    "discount": discountPromotion.value,
                    "linkImage": linkImage,
                    "promotionStartTime": reDatePromotion(startDatePromotion.value, 'start'),
                    "promotionEndTime": reDatePromotion(endDatePromotion.value, 'end')
                },
                "lProduct": listIDProduct,
                "statusPromotion": statusPromotion
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + "/api/add-promotion", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result == 'OK') {
                        localStorage.removeItem("listPickProduct");
                        closePopup('popupAddPromotion');
                        viewPromotion();
                    } else {
                        alert("Có lỗi xảy ra!");
                    }
                })
                .catch(error => console.log('error', error));

        }

    }
}
function reDatePromotion(dateString, type) {
    let date = new Date(dateString);
    if (type == 'start') {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
    } else {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
    }
    return date;
}
function viewPromotion() {
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/get-all-promotion", requestOptions)
        .then(response => response.json())
        .then(result => {
            var html = '';
            var count = 1;
            for (var pro of result) {
                html += `<div class="content--body--items">
                <div class="content--body--item">`+ count + `</div>
                <div class="content--body--item"><img
                        src="`+ pro.linkImage + `"
                        alt=""></div>
                <div class="content--body--item">`+ pro.promotionName + `</div>
                <div class="content--body--item" style="justify-content: right;">`+ pro.discount + `</div>
                <div class="content--body--item">`+ (pro.promotionType == 'vnd' ? 'vnđ' : '%') + `</div>
                <div class="content--body--item">`+ formatDate(pro.promotionStartTime) + `</div>
                <div class="content--body--item">`+ formatDate(pro.promotionEndTime) + `</div>`;
                var today = new Date();
                if (today >= new Date(pro.promotionStartTime) && today <= new Date(pro.promotionEndTime))
                    html += `<div class="content--body--item"><span class="btn--lable">Hoạt động</span></div>`;
                else
                    html += `<div class="content--body--item"><span class="btn--lable btn--lable__gray">Ngừng</span></div>`;
                html += `<div class="content--body--item">
                    <button class="btn" onclick="updatePromotion(`+ pro.promotionId + `)">Sửa</button>
                    <button class="btn btn__gray" onclick="deletePromotion(`+ pro.promotionId + `)">Xoá</button>
                </div>
                </div>`;
                count += 1;
            }
            document.querySelector(".content--body--tbody").innerHTML = html;
        })
        .catch(error => console.log('error', error));
}

function searchPromotionByName(namePromotion) {
    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/get-all-promotion-by-name?promotion-name=" + namePromotion, requestOptions)
        .then(response => response.json())
        .then(result => {
            var html = '';
            var count = 1;
            for (var pro of result) {
                html += `<div class="content--body--items">
                <div class="content--body--item">`+ count + `</div>
                <div class="content--body--item"><img
                        src="`+ pro.linkImage + `"
                        alt=""></div>
                <div class="content--body--item">`+ pro.promotionName + `</div>
                <div class="content--body--item" style="justify-content: right;">`+ pro.discount + `</div>
                <div class="content--body--item">`+ (pro.promotionType == 'vnd' ? 'vnđ' : '%') + `</div>
                <div class="content--body--item">`+ formatDate(pro.promotionStartTime) + `</div>
                <div class="content--body--item">`+ formatDate(pro.promotionEndTime) + `</div>`;
                var today = new Date();
                if (today >= new Date(pro.promotionStartTime) && today <= new Date(pro.promotionEndTime))
                    html += `<div class="content--body--item"><span class="btn--lable">Hoạt động</span></div>`;
                else
                    html += `<div class="content--body--item"><span class="btn--lable btn--lable__gray">Ngừng</span></div>`;
                html += `<div class="content--body--item">
                    <button class="btn" onclick="updatePromotion(`+ pro.promotionId + `)">Sửa</button>
                    <button class="btn btn__gray" onclick="deletePromotion(`+ pro.promotionId + `)">Xoá</button>
                </div>
                </div>`;
                count += 1;
            }
            document.querySelector(".content--body--tbody").innerHTML = html;
        })
        .catch(error => console.log('error', error));
}
function deletePromotion(id) {
    if (confirm("Bạn chắc chắn muốn xoá khuyến mãi " + id)) {
        var myHeaders = new Headers();
        myHeaders.append("user", localStorage.getItem("username"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url + "/api/del-promotion?id-promotion=" + id, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result == 'OK') {
                    viewPromotion();
                } else {
                    alert("Có lỗi xảy ra!")
                }
            })
            .catch(error => console.log('error', error));
    }
}
function updatePromotion(id) {
    openPopup('popupAddPromotion');
    var idPromotion = document.querySelector("#idPromotion");
    var namePromotion = document.querySelector("#namePromotion");
    var imagePromotion = document.querySelector("#imagePromotion");
    var discountPromotion = document.querySelector("#discountPromotion");
    var typePromotion = document.querySelector("#typePromotion");
    var descriptionPromotion = document.querySelector("#descriptionPromotion");
    var startDatePromotion = document.querySelector("#startDatePromotion");
    var endDatePromotion = document.querySelector("#endDatePromotion");
    var chonTatCaSach = document.querySelector("#chonTatCaSach");
    var listIDProduct = [];

    chonTatCaSach.checked = false;
    localStorage.removeItem('listPickProduct');
    document.getElementsByClassName('popup--content--searchProduct').item(0).innerHTML = `<div class="popup--content--searchProduct--icon">
        <input type="text" class="inpt inpt--icon" placeholder="Tìm kiếm theo tên sách"  onkeyup="searchProduct(event, this)"/>
        <i class="fa-light fa-magnifying-glass"></i>
        </div>
        <div class="content--product--items__select--nav">
        </div>`;
    document.getElementsByClassName('popup--content--listProduct').item(0).innerHTML = `<div class="popup--content--title">Danh sách sản phẩm</div>
        <div class="content--product--items--nav">
        </div>`;

    var myHeaders = new Headers();
    myHeaders.append("user", localStorage.getItem("username"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url + "/api/get-promotion-by-id?id=" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            idPromotion.value = result.promotion.promotionId;
            namePromotion.value = result.promotion.promotionName;
            imagePromotion.value = '';
            discountPromotion.value = result.promotion.discount;
            typePromotion.value = result.promotion.promotionType;
            descriptionPromotion.value = result.promotion.promotionDescription;
            startDatePromotion.value = formatDateyyyymmdd(result.promotion.promotionStartTime);
            endDatePromotion.value = formatDateyyyymmdd(result.promotion.promotionEndTime);
            listIDProduct = result.lProduct;
            localStorage.setItem("listPickProduct", listIDProduct);
            loadListProduct();
        })
        .catch(error => console.log('error', error));
}
function formatDateyyyymmdd(str) {
    var date = new Date(str);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // Đảm bảo định dạng "dd"
    if (day < 10) {
        day = "0" + day;
    }

    // Đảm bảo định dạng "mm"
    if (month < 10) {
        month = "0" + month;
    }

    return year + "-" + month + "-" + day;
}