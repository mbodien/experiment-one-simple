// database initialization
var database = new Firebase('https://experiment-one-c3120.firebaseio.com/'):

var participantsRef = firebase.database().ref('users/');

participantsRef.on("value",function(snapshot) {
    console.log(snapshot.val());
});



$('.page').hide();
$('#page1').show();

var currentPage = 1;
//
// $(document).ready(function () {
//     $('.page').hide();
//     $('#page1').show();
//     }
// });




function nextPage() {
    var pageHide = '#page' + currentPage;
    currentPage ++;
    var pageShow = '#page' + currentPage;
    $(pageHide).hide();
    $(pageShow).show();
}

var select = '';
for (i=18;i<=100;i++) {
    select += '<option val=' + i + '>' + i + '</option>';
}

$('#18_100').html(select);






// function writeData(userID, age, gender) {
//     firebase.database().ref('users/' + userID).set({
//         age: age,
//         gender: gender
//     })
// }
