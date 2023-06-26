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
    for (let item of itemDB){
        $("#itemCode").append(`<option>${item.code}</option>`);
    }
}

$("#placeOrderBtn").click(function () {
    $("#orderId").val(generateOrderID());
})
