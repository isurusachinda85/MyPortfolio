getAllCustomer();

/*save customer btn event*/
$("#saveCustomer").click(function () {
    saveCustomer();
});

/*delete customer btn event*/
$("#deleteCustomer").click(function () {
    let id = $("#cusIdText").val();

    let consent = confirm("Do you want to delete.?");

    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            clearTextCustomerText();
            getAllCustomer();
        } else {
            alert("Customer Not Removed..!");
        }
    }
});

/*update customer btn event*/
$("#updateCustomer").click(function () {
    let id = $("#cusIdText").val();
    updateCustomer(id);
    clearTextCustomerText();
});


function saveCustomer() {
    let customerId = $("#cusIdText").val();

    if (searchCustomer(customerId.trim()) == undefined) {
        let customerName = $("#cusNameText").val();
        let customerAddress = $("#cusAddressText").val();
        let customerMobile = $("#cusMobileText").val();
        let customerEmail = $("#cusEmailText").val();

        let newCustomer = Object.assign({}, customer)
        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.mobile = customerMobile;
        newCustomer.email = customerEmail;

        customerDB.push(newCustomer);
        clearTextCustomerText();
        getAllCustomer();
    } else {
        alert("Customer already exits.!");
        clearTextCustomerText();
    }
}

function getAllCustomer() {

    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let cusId = customerDB[i].id;
        let cusName = customerDB[i].name;
        let cusAdd = customerDB[i].address;
        let cusMobile = customerDB[i].mobile;
        let cusEmail = customerDB[i].email;

        let row = `<tr>
           <td>${cusId}</td>
           <td>${cusName}</td>
           <td>${cusAdd}</td>
           <td>${cusMobile}</td>
           <td>${cusEmail}</td>
           </tr>`

        $("#tblCustomer").append(row);
    }
    trTextAddTextCustomer();
}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);
            let customerName = $("#cusNameText").val();
            let customerAddress = $("#cusAddressText").val();
            let customerMobile = $("#cusMobileText").val();
            let customerEmail = $("#cusEmailText").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.mobile = customerMobile;
            customer.email = customerEmail;

            getAllCustomer();
        }
    }
}

function trTextAddTextCustomer() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let mobile = $(this).children().eq(3).text();
        let email = $(this).children().eq(4).text();

        $("#cusIdText").val(id);
        $("#cusNameText").val(name);
        $("#cusAddressText").val(address);
        $("#cusMobileText").val(mobile);
        $("#cusEmailText").val(email);
    });
}

function clearTextCustomerText() {
    $("#cusIdText,#cusNameText,#cusAddressText,#cusMobileText,#cusEmailText").val("");
    $("#cusIdText").val("").focus();
}