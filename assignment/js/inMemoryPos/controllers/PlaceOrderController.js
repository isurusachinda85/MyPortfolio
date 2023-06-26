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
$("#placeOrderBtn").click(function () {
    $("#orderId").val(generateOrderID());

})
