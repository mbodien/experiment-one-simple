


$('.page').hide();
$('#page1').show();

var currentPage = 1;


function nextPage() {
    var pageHide = '#page' + currentPage;
    currentPage ++;
    var pageShow = '#page' + currentPage;
    $(pageHide).hide();
    $(pageShow).show();
    writeData('thisisUserID','44','Male');
}

var select = '';
for (i=18;i<=100;i++) {
    select += '<option val=' + i + '>' + i + '</option>';
}

$('#18_100').html(select);



// database initialization
var database = new Firebase('https://experiment-one-c3120.firebaseio.com/');


function writeData(userID, age, gender) {
    database().push({
        'userID': userID,
        'age': age,
        'gender': gender
    })
}
