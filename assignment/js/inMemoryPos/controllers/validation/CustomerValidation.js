let idPattern = /^(C00-)[0-9]{3}$/;

let namePattern = /^[A-Za-z ]{5,}$/;

let addressPattern = /^[A-Za-z0-9 ]{8,}$/;

let phonePattern = /^\d{3}-\d{3}-\d{4}$/;

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let vArray = [];

vArray.push({field: $("#cusIdText"), regEx: idPattern});
vArray.push({field: $("#cusNameText"), regEx: namePattern});
vArray.push({field: $("#cusAddressText"), regEx: addressPattern});
vArray.push({field: $("#cusMobileText"), regEx: phonePattern});
vArray.push({field: $("#cusEmailText"), regEx: emailPattern});

function clearTextCustomerText() {
    $("#cusIdText,#cusNameText,#cusAddressText,#cusMobileText,#cusEmailText").val("");
    $("#cusIdText").val("").focus();
    setBtn();
}

setBtn();
//disable tab
$("#cusIdText,#cusNameText,#cusAddressText,#cusMobileText,#cusEmailText").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = vArray.indexOf(vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidations(vArray[indexNo]);

    setBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != vArray[vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(vArray[indexNo])) {
                vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < vArray.length; i++) {
        if (!checkValidations(vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#deleteCustomer").prop("disabled", true);
    $("#updateCustomer").prop("disabled", true);

    if (checkAll()) {
        $("#saveCustomer").prop("disabled", false);
    } else {
        $("#saveCustomer").prop("disabled", true);
    }

    let id = $("#cusIdText").val();
    if (searchCustomer(id) == undefined) {
        $("#deleteCustomer").prop("disabled", true);
        $("#updateCustomer").prop("disabled", true);
    } else {
        $("#deleteCustomer").prop("disabled", false);
        $("#updateCustomer").prop("disabled", false);
    }
}
