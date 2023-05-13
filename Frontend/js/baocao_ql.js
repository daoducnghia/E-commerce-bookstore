window.addEventListener("load", function (event) {
    if (localStorage.getItem('username') == null) {
        window.location.replace('dangnhap.html');
    }
    document.getElementsByClassName('reportpage').item(0).classList.add('content--sidebar--item__active');
    showReportRevenue();
});

//Thay đổi báo cáo (doanh thu/khách hàng)
var typeReport = document.querySelector("#typeReport");
typeReport.addEventListener("change", function () {
    if (this.value == 'doanhthu') {
        showReportRevenue();
    } else {
        showReportCustomer();
    }
})
function showReportRevenue() {
    document.querySelector(".content--main--title").innerHTML = 'Doanh số theo tháng';
    document.querySelector(".content--main--content--module").innerHTML = `<div class="content--module--left">
    <div class="content--module--left--chart">
        <canvas id="chartRevenue" style="height: 230px;width: 100%;"></canvas>
    </div>
    <div id="tableRevenue">
        <div class="tableRevenue--total">
        </div>
        <div class="tableRevenue--title">
            <div class="tableRevenue--items">
                <div class="tableRevenue--item" style="justify-content: center;">Tháng</div>
                <div class="tableRevenue--item">Số đơn hàng</div>
                <div class="tableRevenue--item">Doanh thu</div>
                <div class="tableRevenue--item">Giảm giá</div>
                <div class="tableRevenue--item">Trả hàng</div>
                <div class="tableRevenue--item">Doanh thu thực tế</div>
            </div>
        </div>
        <div class="tableRevenue--body">
        </div>
    </div>
</div>
<div class="content--module--right">
    <div class="content--module--right--char">
        <canvas id="chartOrder"></canvas>
    </div>
    <div class="content--module--right--char">
        <canvas id="chartOrderByMonth"></canvas>
    </div>
</div>`;
    var date = new Date(); // Tạo một đối tượng Date đại diện cho thời điểm hiện tại
    if (date.getMonth() > 0) {
        date.setMonth(date.getMonth() - 1); // Trừ một tháng từ trường tháng của đối tượng Date
    } else {
        date.setMonth(11); // Cập nhật trường tháng thành 11 (tháng 12)
        date.setFullYear(date.getFullYear() - 1); // Giảm trường năm đi 1
    }
    document.querySelector("#startDate").value = formatDateyyyymmdd(date);
    document.querySelector("#endDate").value = formatDateyyyymmdd(new Date());
    showReportRevenueByMonth(formatDateyyyymmdd(date), formatDateyyyymmdd(new Date()));
}
function showReportCustomer() {
    document.querySelector(".content--main--title").innerHTML = 'Báo cáo khách hàng';
    document.querySelector(".content--main--content--module").innerHTML = `<div class="module--customer">
    <div class="module--customer--header">
        <div class="module--customer--items">
            <div class="module--customer--item">#</div>
            <div class="module--customer--item">Tên khách hàng</div>
            <div class="module--customer--item">Tài khoản</div>
            <div class="module--customer--item">Số đơn hàng</div>
            <div class="module--customer--item">Số đơn hàng huỷ</div>
            <div class="module--customer--item">Doanh thu</div>
        </div>
    </div>
    <div class="module--customer--body">
    </div>
    </div>
    <div class="module--chart">
        <div class="module--customer--chart">
            <canvas id="chartCustomerByMonth"></canvas>
        </div>
    </div>`;
    var date = new Date(); // Tạo một đối tượng Date đại diện cho thời điểm hiện tại
    if (date.getMonth() > 0) {
        date.setMonth(date.getMonth() - 1); // Trừ một tháng từ trường tháng của đối tượng Date
    } else {
        date.setMonth(11); // Cập nhật trường tháng thành 11 (tháng 12)
        date.setFullYear(date.getFullYear() - 1); // Giảm trường năm đi 1
    }
    document.querySelector("#startDate").value = formatDateyyyymmdd(date);
    document.querySelector("#endDate").value = formatDateyyyymmdd(new Date());
    showReportCustomerByMonth(formatDateyyyymmdd(date), formatDateyyyymmdd(new Date()));
}
function showReport() {
    var startDate = document.querySelector("#startDate");
    var endDate = document.querySelector("#endDate");
    if (document.querySelector("#typeReport").value == 'doanhthu') {
        showReportRevenueByMonth(startDate.value, endDate.value);
    } else {
        showReportCustomerByMonth(startDate.value, endDate.value);
    }
}
function showReportRevenueByMonth(startDate, endDate) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
        startDate,
        endDate
    ]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/get-order-by-month", requestOptions)
        .then(response => response.json())
        .then(result => {
            var dataReport = [];
            var dataReportOrder = [];
            var html = ``;
            var numberOrder = 0;
            var revenue = 0.0;
            var discount = 0.0;
            var returns = 0.0;
            var totalRevenue = 0.0;
            var numberOrderReturn = 0;
            for (var r of result) {
                dataReport.push({
                    label: r.time,
                    data: r.totalRevenue,
                    color: "#3a89b5a6"
                })
                dataReportOrder.push({
                    time: r.time,
                    numberOrder: (r.numberOrder - r.numberOrderReturn),
                    numberOrderReturn: r.numberOrderReturn
                })
                numberOrderReturn += r.numberOrderReturn;
                numberOrder += r.numberOrder;
                revenue += r.revenue;
                discount += r.discount;
                returns += r.returns;
                totalRevenue += r.totalRevenue;
                html += `<div class="tableRevenue--items">
                <div class="tableRevenue--item" style="justify-content: center;">`+ r.time + `</div>
                <div class="tableRevenue--item">`+ r.numberOrder + `</div>
                <div class="tableRevenue--item">`+ formatMoneyVND(r.revenue) + `</div>
                <div class="tableRevenue--item">`+ formatMoneyVND(r.discount) + `</div>
                <div class="tableRevenue--item">`+ formatMoneyVND(r.returns) + `</div>
                <div class="tableRevenue--item">`+ formatMoneyVND(r.totalRevenue) + `</div>
                </div>`;
            }
            document.querySelector(".tableRevenue--body").innerHTML = html;
            document.querySelector(".tableRevenue--total").innerHTML = `<div class="tableRevenue--items">
            <div class="tableRevenue--item" style="justify-content: center;">TỔNG</div>
            <div class="tableRevenue--item">`+ numberOrder + `</div>
            <div class="tableRevenue--item">`+ formatMoneyVND(revenue) + `</div>
            <div class="tableRevenue--item">`+ formatMoneyVND(discount) + `</div>
            <div class="tableRevenue--item">`+ formatMoneyVND(returns) + `</div>
            <div class="tableRevenue--item">`+ formatMoneyVND(totalRevenue) + `</div>
            </div>`;
            //Ve bieu do doanh thu theo thang
            var chartRevenue = document.getElementById("chartRevenue");
            new Chart(chartRevenue.getContext("2d"), {
                type: 'bar',
                data: {
                    labels: dataReport.map(item => item.label),
                    datasets: [{
                        label: "Doanh thu thực tế",
                        data: dataReport.map(item => item.data),
                        backgroundColor: dataReport.map(item => item.color)
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Doanh thu theo tháng'
                    }
                }
            })
            //Ve bieu do tong don hang
            var chartOrder = document.getElementById('chartOrder');
            new Chart(chartOrder.getContext("2d"), {
                type: "doughnut",
                data: {
                    labels: ["Đơn hàng thành công", "Đơn hàng huỷ"],
                    datasets: [{
                        data: [(numberOrder - numberOrderReturn), numberOrderReturn],
                        backgroundColor: ["#fcc79e", "#beefd2"]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Tỷ lệ đơn hàng'
                    }
                }
            })
            //Ve biue do dan hang theo thang
            var chartOrderByMonth = document.getElementById('chartOrderByMonth');
            new Chart(chartOrderByMonth.getContext("2d"), {
                type: "line",
                data: {
                    labels: dataReportOrder.map(item => item.time),
                    datasets: [{
                        label: "Đơn hàng thành công",
                        borderColor: "#fcc79e80",
                        backgroundColor: "#fcc79e80",
                        data: dataReportOrder.map(item => item.numberOrder)
                    }, {
                        label: "Đơn hàng huỷ",
                        borderColor: "#beefd280",
                        backgroundColor: "#beefd280",
                        data: dataReportOrder.map(item => item.numberOrderReturn)
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Tỷ lệ đơn hàng'
                    }
                }
            })
        })
        .catch(error => console.log('error', error));
}
function showReportCustomerByMonth(startDate, endDate) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
        startDate,
        endDate
    ]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/api/get-top20-customer", requestOptions)
        .then(response => response.json())
        .then(result => {
            var dataReport = [];
            var html = '';
            var count = 1;
            for (var c of result) {
                dataReport.push({
                    account: c.username,
                    numberOrder: c.numberOrder,
                    revenue: c.revenue
                })
                html += `<div class="module--customer--items">
            <div class="module--customer--item">`+ count + `</div>
            <div class="module--customer--item">`+ c.name + `</div>
            <div class="module--customer--item">`+ c.username + `</div>
            <div class="module--customer--item">`+ c.numberOrder + `</div>
            <div class="module--customer--item">`+ c.numberOrderReturn + `</div>
            <div class="module--customer--item">`+ formatMoneyVND(c.revenue) + `</div>
        </div>`;
                count += 1;
            }
            document.querySelector(".module--customer--body").innerHTML = html;

            //Vẽ biểu đồ đơn đặt hàng và doanh thu từ 20 khách hàng có doanh thu nhiều nhất
            var chartCustomerByMonth = document.querySelector("#chartCustomerByMonth");
            new Chart(chartCustomerByMonth.getContext("2d"), {
                type: "bar",
                data: {
                    datasets: [{
                        label: 'Số đơn hàng',
                        data: dataReport.map(item => item.numberOrder),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        yAxisID: 'left-y-axis' // Chỉ định trục y bên trái
                    }, {
                        label: 'Doanh thu',
                        data: dataReport.map(item => item.revenue),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        yAxisID: 'right-y-axis' // Chỉ định trục y bên phải
                    }],
                    labels: dataReport.map(item => item.account)
                },
                options: {
                    scales: {
                        yAxes: [{
                            id: 'left-y-axis',
                            type: 'linear',
                            position: 'left' // Vị trí của trục y bên trái
                        }, {
                            id: 'right-y-axis',
                            type: 'linear',
                            position: 'right' // Vị trí của trục y bên phải
                        }]
                    }
                }
            });
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