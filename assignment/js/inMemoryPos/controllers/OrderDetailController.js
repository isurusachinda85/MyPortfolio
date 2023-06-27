function loadAllOrder() {
    $("#PlaceOrderDetail1").empty();

    for (let order of orderDB) {
        let row = `<tr><td>${order.oId}</td><td>${order.cId}</td><td>${order.oDate}</td><td>${order.subTotal}</td><td>${order.discount}</td></tr>`;
        $("#PlaceOrderDetail1").append(row);
    }
}

function loadOrderDetail() {
    $("#PlaceOrderDetail2").empty();
    for (let detail of orderDetailsDB) {
        let row = `<tr><td>${detail.orderId}</td><td>${detail.cusId}</td><td>${detail.itemId}</td><td>${detail.qty}</td><td>${detail.total}</td></tr>`;
        $("#PlaceOrderDetail2").append(row);
    }
}