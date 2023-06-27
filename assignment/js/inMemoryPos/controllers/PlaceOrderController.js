/*$("#addToCart").attr('disabled', true);
$("#placeOrderBtn").attr('disabled', true);*/


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
let itemQty;
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

/*------------Place holder generate total-------------*/

function calcTotal(amount) {
    totalCost += amount;
    $("#total").val(totalCost);
    $("#subTotal").val(totalCost);
}

/*------------Place holder manage qty-------------*/
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}

function manageTotal(preTotal, nowTotal) {
    totalCost -= preTotal;
    totalCost += nowTotal;

    $("#total").val(totalCost);
}
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
        $("#btnPurchase").attr('disabled', true);
    } else {
        $("#lblCheckSubtotal").parent().children('strong').text("");
        $("#btnPurchase").attr('disabled', false);
    }
});
$("#addToCart").click(function () {
});


$("#orderId").val(generateOrderID());
$("#placeOrderBtn").click(function () {
    $("#orderId").val(generateOrderID());
});
