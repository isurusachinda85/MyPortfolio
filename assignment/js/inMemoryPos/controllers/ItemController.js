getAllItem();

$("#saveItem").click(function () {
    saveItem();
});

$("#deleteItem").click(function () {
    let id = $("#itemCodeText").val();

    let consent = confirm("Do you want to delete.?");

    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            clearTextItemText();
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

$("#updateItem").click(function () {
    let code = $("#itemCodeText").val();
    updateItem(code);
    clearTextItemText();
});


function saveItem() {
    let itemCode = $("#itemCodeText").val();

    if (searchItem(itemCode.trim()) == undefined) {
        let itemName = $("#itemNameText").val();
        let unitPrice = $("#unitPriceText").val();
        let qty = $("#qtyText").val();

        let newItem = Object.assign({}, item)
        newItem.code = itemCode;
        newItem.name = itemName;
        newItem.price = unitPrice;
        newItem.qty = qty;

        itemDB.push(newItem);
        getAllItem();
        clearTextItemText();
    }else {
        alert("Customer already exits.!");
        clearTextItemText();
    }
}

function getAllItem() {
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let itemCode = itemDB[i].code;
        let name = itemDB[i].name;
        let price = itemDB[i].price;
        let qty = itemDB[i].qty;

        let row = `<tr>
                  <td>${itemCode}</td>
                  <td>${name}</td>
                  <td>${price}</td>
                  <td>${qty}</td>
                  </tr>`

        $("#tblItem").append(row);
    }
    trTextAddTextItem();
}

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);
            let itemCode = $("#itemCodeText").val();
            let itemName = $("#itemNameText").val();
            let unitPrice = $("#unitPriceText").val();
            let qty = $("#qtyText").val();

            item.code = itemCode;
            item.name = itemName;
            item.price = unitPrice;
            item.qty = qty;

            getAllItem();
        }
    }
}

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function trTextAddTextItem() {
    $("#tblItem>tr").click(function () {
        let code = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        $("#itemCodeText").val(code);
        $("#itemNameText").val(itemName);
        $("#unitPriceText").val(unitPrice);
        $("#qtyText").val(qty);
    });

}