


$(".page").hide();
$("#page5").show();

var currentPage = 1;


function nextPage() {
    var pageHide = "#page" + currentPage;
    currentPage ++;
    var pageShow = "#page" + currentPage;
    $(pageHide).hide();
    $(pageShow).show();
}

var select = "";
for (i=18;i<=100;i++) {
    select += "<option val=" + i + ">" + i + "</option>";
}

$("#18_100").html(select);



// database write

function writeData(userID, age, gender) {
    firebase.database().ref('/').push({
        "userID": userID,
        "age": age,
        "gender": gender
    })
}
