$("#addToCart").attr('disabled', true);
$("#placeOrderBtn").attr('disabled', true);


//order id generate
function generateOrderID() {
    if (orderDB.length > 0) {
        let lastId = orderDB[orderDB.length - 1].oId;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "ODI-001";
    }
}

//set date
function setCurrentDate() {
    let orderDate = $("#orderDate");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    orderDate.val(today);
}

setCurrentDate();

//load customer id
loadCusId();

function loadCusId() {
    $("#cusID").empty();
    for (let cus of customerDB) {
        $("#cusID").append(`<option>${cus.id}</option>`);
    }
}

//select cus id set content detail on customer
$("#cusID").click(function () {
    let id = $("#cusID").val();

    let findCustomer = searchCustomer(id);
    if (findCustomer) {
        $("#cusName").val(findCustomer.name);
        $("#cusAddress").val(findCustomer.address);
        $("#cusMobile").val(findCustomer.mobile);
    }
})

//load item code
loadItemCode();

function loadItemCode() {
    $("#itemCode").empty();
    for (let item of itemDB) {
        $("#itemCode").append(`<option>${item.code}</option>`);
    }
}

//select item code set content detail on item
$("#itemCode").click(function () {
    let id = $("#itemCode").val();

    let findItem = searchItem(id);
    if (findItem) {
        $("#itemName").val(findItem.name);
        $("#unitPrice").val(findItem.price);
        $("#qtyOnHand").val(findItem.qty);
    }
});
let itemCode;
let itemName;
let itemPrice;
let itemOrderQty;

let totalCost = 0;
let discount = 0;
let subTotal = 0;
let tableRow = [];

$("#addToCart").click(function () {
    let duplicate = false;

    for (let i = 0; i < $("#cart tr").length; i++) {
        if ($("#itemCode option:selected").text() === $("#cart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;
        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#orderQty").val());
        calcTotal($("#orderQty").val() * $("#unitPrice").val());

    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#orderQty").val());
        $(tableRow).children(':nth-child(4)').text($("#orderQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#orderQty").val() * $("#unitPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#orderQty").val() * $("#unitPrice").val());

    }

});


$("#cart").empty();

function loadCartTableDetail() {
    itemCode = $("#itemCode").val();
    itemName = $("#itemName").val();
    itemPrice = $("#unitPrice").val();
    itemOrderQty = $("#orderQty").val();

    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td></tr>`;

    $("#cart").append(row);

}

function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/*------------generate total-------------*/

function calcTotal(amount) {
    totalCost += amount;
    $("#total").val(totalCost);
    $("#subTotal").val(totalCost);
}

/*------------manage qty-------------*/
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}

/*------------manage total-------------*/
function manageTotal(preTotal, nowTotal) {
    totalCost -= preTotal;
    totalCost += nowTotal;

    $("#total").val(totalCost);
}

/*------------generate discount-------------*/
$(document).on("change keyup blur", "#discount", function () {

    discount = $("#discount").val();
    discount = (totalCost / 100) * discount;
    subTotal = totalCost - discount;

    $("#subTotal").val(subTotal);
});

/*------------Place holder Cash & balance-------------*/

$(document).on("change keyup blur", "#cash", function () {
    let cash = $("#cash").val();
    let balance = cash - subTotal;
    $("#balance").val(balance);
    if (balance < 0) {
        $("#lblCheckSubtotal").parent().children('strong').text(balance + " : plz enter valid Balance");
        $("#placeOrderBtn").attr('disabled', true);
    } else {
        $("#lblCheckSubtotal").parent().children('strong').text("");
        $("#placeOrderBtn").attr('disabled', false);
    }
});

/*------------Check qty allow------------*/

$(document).on("change keyup blur", "#orderQty", function () {
    let qtyOnHand = $("#qtyOnHand").val();
    let buyQty = $("#orderQty").val();
    let buyOnHand = qtyOnHand - buyQty;
    if (buyOnHand < 0) {
        $("#lblCheckQty").parent().children('strong').text(qtyOnHand + " : Empty On Stock..!!");
        $("#addToCart").attr('disabled', true);
    } else {
        $("#lblCheckQty").parent().children('strong').text("");
        $("#addToCart").attr('disabled', false);
    }
});

/*-------place order to array for table 01------------*/
function placeOrder() {

    let orderID = $("#orderId").val();
    let customerId = $("#cusID").val();
    let orderDate = $("#orderDate").val();
    let subTotal = $("#subTotal").val();
    let discount = $("#discount").val();

    let newOrder = Object.assign({}, orderDB);
    newOrder.oId = orderID;
    newOrder.cId = customerId;
    newOrder.oDate = orderDate;
    newOrder.subTotal = subTotal;
    newOrder.discount = discount;

    orderDB.push(newOrder);

}

/*-------place order to array for table 02------------*/

function placeOrderDetail() {
    let orderId = $("#orderId").val();
    let customerId = $("#cusID").val();
    let itemCode = $("#itemCode").val();
    let orderQty = $("#orderQty").val();
    let total = $("#total").val();


    let orderDetail = Object.assign({}, orderDetailsDB);
    orderDetail.orderId = orderId;
    orderDetail.cusId = customerId;
    orderDetail.itemId = itemCode;
    orderDetail.qty = orderQty;
    orderDetail.total = total;

    orderDetailsDB.push(orderDetail);

}

$("#addToCart").click(function () {
});

function clearDetail() {
    $("#cusID,#cusName,#cusAddress,#cusMobile,#itemCode,#itemName,#unitPrice,#qtyOnHand,#orderQty,#total,#discount,#cash,#subTotal,#balance").val("");
}

$("#orderId").val(generateOrderID());
$("#placeOrderBtn").click(function () {
    placeOrder();
    placeOrderDetail();
    $("#orderId").val(generateOrderID());
    clearDetail();
    $("#cart").empty();
    loadAllOrder();
    loadOrderDetail();
});
