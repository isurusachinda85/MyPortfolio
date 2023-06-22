const codePattern = /^(I00-)[0-9]{3}$/;
const itemNamePattern= /^[A-Za-z0-9 ]{3,}$/;
const qtyPattern = /^[0-9]+$/;
const pricePattern = /^[0-9]{2,}([.][0-9]{2})?$/;


let i_vArray = new Array();
i_vArray.push({field: $("#itemCodeText"), regEx: codePattern});
i_vArray.push({field: $("#itemNameText"), regEx: itemNamePattern});
i_vArray.push({field: $("#qtyText"), regEx: qtyPattern});
i_vArray.push({field: $("#unitPriceText"), regEx: pricePattern});


function clearTextItemText() {
    $("#itemCodeText,#itemNameText,#qtyText,#unitPriceText").val("");
    $("#itemCodeText").focus();
    setItemBtn();
}


setItemBtn();

//disable tab
$("#itemCodeText,#itemNameText,#qtyText,#unitPriceText").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkItemValidations(i_vArray[indexNo]);

    setItemBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkItemValidations(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItemValidations(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkItemValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setItemBorder(true, object)
        return true;
    }
    setItemBorder(false, object)
    return false;
}

function setItemBorder(bol, ob) {
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

function checkAllItems() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidations(i_vArray[i])) return false;
    }
    return true;
}

function setItemBtn() {
    $("#deleteItem").prop("disabled", true);
    $("#updateItem").prop("disabled", true);

    if (checkAllItems()) {
        $("#saveItem").prop("disabled", false);
    } else {
        $("#saveItem").prop("disabled", true);
    }

    let code = $("#itemCodeText").val();
    if (searchItem(code) == undefined) {
        $("#deleteItem").prop("disabled", true);
        $("#updateItem").prop("disabled", true);
    } else {
        $("#deleteItem").prop("disabled", false);
        $("#updateItem").prop("disabled", false);
    }

}

