/*
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("homeForm").style.display = 'inline-block';
    document.getElementById("customerForm").style.display = 'none';
    document.getElementById("itemForm").style.display = 'none';
    document.getElementById("placeOrderForm").style.display = 'none';
});
document.getElementById("Home").addEventListener('click', function () {
    document.getElementById("homeForm").style.display = 'inline-block';
    document.getElementById("customerForm").style.display = 'none';
    document.getElementById("itemForm").style.display = 'none';
    document.getElementById("placeOrderForm").style.display = 'none';
});

document.getElementById("Customer").addEventListener('click', function () {
    document.getElementById("homeForm").style.display = 'none';
    document.getElementById("customerForm").style.display = 'inline-block';
    document.getElementById("itemForm").style.display = 'none';
    document.getElementById("placeOrderForm").style.display = 'none';
});

document.getElementById("Item").addEventListener('click', function () {
    document.getElementById("homeForm").style.display = 'none';
    document.getElementById("customerForm").style.display = 'none';
    document.getElementById("itemForm").style.display = 'inline-block';
    document.getElementById("placeOrderForm").style.display = 'none';
});
document.getElementById("PlaceOrder").addEventListener('click', function () {
    document.getElementById("homeForm").style.display = 'none';
    document.getElementById("customerForm").style.display = 'none';
    document.getElementById("itemForm").style.display = 'none';
    document.getElementById("placeOrderForm").style.display = 'inline-block';
});
*/

//logics for SPA
initiateUI();

function initiateUI() {
    clearAll();
    $("#homeForm").css("display", "block");
    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "homeForm":
            localStorage.setItem("view", "HOME");
            break;
        case "customerForm":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemForm":
            localStorage.setItem("view", "ITEM");
            break;
        case "placeOrderForm":
            localStorage.setItem("view", "ORDER");
            break;

        case "orderDetailForm":
            localStorage.setItem("view", "ORDERDETAIL");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#homeForm"));
            break;
        case "ITEM":
            setView($("#itemForm"));
            break;
        case "CUSTOMER":
            setView($("#customerForm"));
            break;
        case "ORDER":
            setView($("#placeOrderForm"));
            break;
        case "ORDERDETAIL":
            setView($("#orderDetailForm"));
            break;
        default:
            setView($("#homeForm"));
    }
}

function clearAll() {
    $("#homeForm,#customerForm,#itemForm,#placeOrderForm,#orderDetailForm").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    // console.log(viewOb.get(0).id);
}

//bind events
$("#Home").click(function () {
    setView($("#homeForm"));
});

$("#Customer").click(function () {
    setView($("#customerForm"));
});

$("#Item").click(function () {
    setView($("#itemForm"));
});

$("#PlaceOrder").click(function () {
    setView($("#placeOrderForm"));
});

$("#OrderDetail").click(function () {
    setView($("#orderDetailForm"));
});

//end of logics for SPA
