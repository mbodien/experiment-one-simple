$(document).ready(function() {
    $("body").fadeIn(500);
});

$(".page").hide();
$("#page1").show();

var currentPage = 1;

/* hidden elements */

$(".errorMessage").hide();
$(".facebookSharePicture").hide();


function nextPage() {
    var pageHide = "#page" + currentPage; // #page2
    currentPage ++;
    var pageShow = "#page" + currentPage; // #page3
    $(pageHide).hide();
    $(pageShow).show();
}

function lastPage() {
    var pageHide = "#page" + currentPage; // #page2
    currentPage --;
    var pageShow = "#page" + currentPage; // #page1
    $(pageHide).hide();
    $(pageShow).show();
}

/* Consent page */

function checkConsent() {
    var consent1 = $("input[name=consent1]:checked").val();
    var consent2 = $("input[name=consent2]:checked").val();
    var consent3 = $("input[name=consent3]:checked").val();
    var consent4 = $("input[name=consent4]:checked").val();
    var consent5 = $("input[name=consent5]:checked").val();
    var consent6 = $("input[name=consent6]:checked").val();
    var consentTotal = parseInt(consent1) + parseInt(consent2) + parseInt(consent3) + parseInt(consent4) + parseInt(consent5) + parseInt(consent6);
    console.log(consentTotal);
    if (consentTotal === 6) {
        decideConditions();  // setting experiment conditions here
        setExperimentDirections();
        expStartDataSave();
        nextPage()
    } else {
        $("#consentErrorMessage").show();
    }
}


/* Data saving */

var data = []; // all data will be stored here

function expStartDataSave() {
    var d = new Date();
    var startTime = d.getTime();
    data.push(revealOrderCondition, dissonanceCondition, valueCondition, targetSource, startTime);
}

function demoDataSave() {
    if (!$("input[name=gender]:checked").val() || !$("input[name=facebookUsage]:checked").val()) {
        $("#demosDataError").show();
    } else {
        var age = $("select[name=age]").val();
        var gender = $("input[name=gender]:checked").val();
        var facebookUsage = $("input[name=facebookUsage]:checked").val();
        data.push(age, gender, facebookUsage);
        nextPage();
    }
}

function politicalDataSave() {
    if (!$("input[name=partyID]:checked").val() || !$("input[name=ideology]:checked").val() || !$("input[name=partyImportance]:checked").val()) {
        $("#politicalDataError").show();
    } else {
        var partyID = $("input[name=partyID]:checked").val();
        var ideology = $("input[name=ideology]:checked").val();
        var socialValues = $("input[name=socialValues]:checked").val();
        var ideologyImportance = $("input[name=partyImportance]:checked").val();
        data.push(partyID, ideology, socialValues, ideologyImportance);
        nextPage();
    }
}

function trial1StartTime() {
    var d = new Date();
    var startTime = d.getTime();
    data.push(startTime);
}

function trial2StartTime() {
    var d = new Date();
    var startTime = d.getTime();
    data.push(startTime);
}

function saveMemeData() {
    var memeScore = $("input[name=likertMeme]:checked").val();
    var d = new Date();
    var buttonClickedTime = d.getTime();
    data.push(memeScore, buttonClickedTime);
    console.log(memeScore);
    console.log(buttonClickedTime);
}

function saveFacebookData() {
    memeLike = $("input[name=likertMemeFB]:checked").val();
    if (memeLike === undefined) {
        $("#facebookError").show();
    } else {
        data.push(memeLike);
        nextPage();
    }
}

function saveDiscomfort() {
    var discomfort = $("input[name=discomfort]:checked").val();
    if (discomfort === undefined) {
        $("#discomfortError").show();
    } else {
        data.push(discomfort);
        nextPage();
    }
}

function MTurkID() {
    var workerID = $("#MTurkID").val();
    if (workerID.length < 3) {
        $("#workerIDError").show()
    } else {
        var d = new Date();
        var endTime = d.getTime();
        data.push(workerID, endTime);
        writeData(); // sends data to Firebase
        nextPage();
    }
}


// database write

function writeData() {
    firebase.database().ref('/').push(data)
}


/* Determination of all conditions */

var dissonanceCondition = "";
var valueCondition = "";
var revealOrderCondition = "";
var targetSource = "";

function decideConditions() {
    decideDissonanceCondition();
    decideValueCondition();
    decideRevealOrderCondition();
    decideTargetSource();
    determineTargetMemeProps();

    console.log(dissonanceCondition);
    console.log(valueCondition);
    console.log(revealOrderCondition);
    console.log(targetSource);
}

function decideDissonanceCondition() {
    randNumber = Math.floor(Math.random() * 2); // either 0 or 1
    if (randNumber === 0) {
        dissonanceCondition = "consonantCondition"
    } else {
        dissonanceCondition = "dissonantCondition"
    }
}

function decideValueCondition() {
    randNumber = Math.floor(Math.random() * 4); //  0, 1, 2, or 3
    if (randNumber === 0) {
        valueCondition = "equalityCondition"
    } else if (randNumber === 1) {
        valueCondition = "toleranceCondition"
    } else if (randNumber === 2) {
        valueCondition = "selfRelianceCondition"
    } else {
        valueCondition = "traditionalismCondition"
    }
}

function decideRevealOrderCondition() {
    randNumber = Math.floor(Math.random() * 3); // either 0, 1, or 2
    if (randNumber === 0) {
        revealOrderCondition = "messageFirstCondition"
    } else if (randNumber === 1) {
        revealOrderCondition = "sourceFirstCondition"
    } else {
        revealOrderCondition = "combinationCondition"
    }
}

function pickLiberal() {
    randNumber = Math.floor(Math.random() * 2); // either 0 or 1
    if (randNumber === 0) {
        targetSource = "BO"
    } else {
        targetSource = "HC"
    }
}

function pickConservative() {
    randNumber = Math.floor(Math.random() * 2); // either 0 or 1
    if (randNumber === 0) {
        targetSource = "SP"
    } else {
        targetSource = "DT"
    }
}

function decideTargetSource() {
    if (dissonanceCondition === "consonantCondition") {
        if (valueCondition === "equalityCondition" || valueCondition === "toleranceCondition") {
            pickLiberal()
        } else {
            pickConservative()
        }
    } else if (dissonanceCondition === "dissonantCondition") {
        if (valueCondition === "equalityCondition" || valueCondition === "toleranceCondition") {
            pickConservative()
        } else {
            pickLiberal()
        }
    }
}



/* determine target meme properites */

var targetMemeCopy = "";
var targetMemeSource = "";
var targetMemeImageSource = "";
var targetMemeCopyAndSource = "";

function determineTargetMemeProps() {
    targetMemeCopy = targetMemeCopyLibrary[valueCondition][targetSource];
    targetMemeSource = targetMemeSourceLibrary[targetSource];
    targetMemeImageSource = targetMemeImageSourceLibrary[targetSource];
    targetMemeCopyAndSource = targetMemeCopy + "\n\n" + targetMemeSource;
}

/* determine filler meme properties */

var fillerMemeCopy = "";
var fillerMemeSource = "";
var fillerMemeImageSource = "";
var fillerMemeCopyAndSource = "";

function determineFillerMemeProps(memeID) {
    fillerMemeCopy = fillerMemeCopyLibrary[memeID];
    fillerMemeSource = fillerMemeSourcesLibrary[memeID];
    fillerMemeImageSource = fillerMemeImageSourceLibrary[memeID];
    fillerMemeCopyAndSource = fillerMemeCopy + "\n\n" + fillerMemeSource;
}


function setExperimentDirections() {
    if (revealOrderCondition === "messageFirstCondition") {
        $("#trial1Directions").text("In a moment, we will show you 4 different memes that we will ask you to evaluate. The memes include a message and an image. The meme below is an example.\n\nBut, before we show you the whole memes, we want to know how you feel about just the message of each meme.\n\nPlease record how much you resonate with the message.\n\nBy resonate we mean how much does the message speak to you in a positive, inspiring, and meaningful way.");
    } else if (revealOrderCondition === "sourceFirstCondition") {
        $("#trial1Directions").text("In a moment, we will show you 4 different memes that we will ask you to evaluate. The memes include a message and an image. The meme below is an example.\n\nBut, before we show you the whole memes, we want to know how you feel about just the person who authored the message.\n\nPlease record how much you resonate with the person that you see.\n\nBy resonate we mean how much do you find the person positive, inspiring, and meaningful.");
    }
}

/* meme display logic */

var memeID = 0; // which meme is being viewed?
var trialID = 0; // trial 1 or trial 2?

function decideTrial1Condition() {   // sorts the first trial into reveal condition, sends to set up meme
    if (revealOrderCondition === "messageFirstCondition") {
        $("#memePicture").hide(); // hide picture
        setMemeContent_MessageFirst();
    } else if (revealOrderCondition === "sourceFirstCondition") {
        setMemeContent_SourceFirst();
    } else {
        setMemeContent_Combo();
    }
}

function setMemeContent_MessageFirst() {
    $("#memeStatement").text("How much do you resonate with this meme message?");
    if (memeID < 3) {
        determineFillerMemeProps(memeID);
        $("#memeCopy").text(fillerMemeCopy);
    } else {
        $("#memeCopy").text(targetMemeCopy);
    }
}

function setMemeContent_SourceFirst() {
    $("#memeCopy").text("");
    $("#memeStatement").text("How much do you resonate with this person?");
    if (memeID <3) {
        determineFillerMemeProps(memeID);
        $("#memePicture").attr("src",fillerMemeImageSource);
    } else {
        $("#memePicture").attr("src",targetMemeImageSource);
    }
}

function setMemeContent_Combo() {
    $("#memePicture").show();
    $("#memeStatement").text("How much do you resonate with this meme?");
    if (memeID < 3) {   // if filler meme
        determineFillerMemeProps(memeID);
        $("#memeCopy").text(fillerMemeCopyAndSource);
        $("#memePicture").attr("src",fillerMemeImageSource);

    } else {  // if target meme
        $("#memeCopy").text(targetMemeCopyAndSource);
        $("#memePicture").attr("src",targetMemeImageSource);
    }

}

function memeCounter() {
    if (memeID < 3){    // there are more memes left in the trial
        memeID ++;
        checkWhichTrial();
    } else {
        trialID ++; // +1 to trialID
        memeID = 0;
        nextTrial();
    }
}

function nextTrial() {
    if (trialID === 1) {
        nextPage();
    } else {
        setFacebookTargetMemes(); // sets the target meme for the Facebook questions
        nextPage();
        nextPage();
    }
}

function beginTrial2() {
    lastPage();
    setMemeContent_Combo();
}

function beginExperiment() {    // connected to begin experiment button
    if (revealOrderCondition === "combinationCondition") {
        trialID = 1;
    } else {
        trialID = 0;
    }
    decideTrial1Condition();
}

function checkWhichTrial() {
    if (trialID === 0) {    // if first trial
        decideTrial1Condition();
    } else {    // if not first meme in first trial, save data and decide what to do next
        setMemeContent_Combo();
        }
}

function clearMemeLikert() {
    $("input[name=likertMeme]").prop("checked",false);
}

function checkLikertError() {   // make sure selection made, otherwise throw error
    likertValue = $("input[name=likertMeme]:checked").val();
    if (likertValue === undefined) {
        $("#memeLikertError").show();
    } else {
        $("#memeLikertError").hide();
        saveMemeData();  // creates variable to save data
        clearMemeLikert(); // unchecks the likert radio buttons
        memeCounter(); // +1 meme ID counter, and checks trial counter
    }
}

/* set facebook Like page with memes */
function setFacebookTargetMemes() {
        $("#memeCopyFB-3").text(targetMemeCopyAndSource);
        $("#memePictureFB-3").attr("src",targetMemeImageSource);
}



var select = "";
for (i=17;i<=100;i++) {
    select += "<option val=" + i + ">" + i + "</option>";
}
$("#18_100").html(select);



/* objects of all meme content */

var targetMemeCopyLibrary = {
    equalityCondition: {
        "BO": "Everyone is born with equal capacity for achieving success. Citizens in this country deserve an equal opportunity to reach that potential.",
        "HC": "Everyone is born with equal capacity for achieving success. Citizens in this country deserve an equal opportunity to reach that potential.",
        "SP": "Everyone is born with the same capacity for being successful. But, there isn’t an equal opportunity in this country to make it happen. There should be.",
        "DT": "Everyone is born with the same capacity for being successful. But, there isn’t an equal opportunity in this country to make it happen. There should be."
    },
    selfRelianceCondition: {
        "BO": "We must let individuals take care of themselves, and be cautious of over-involving ourselves in people’s lives. Strength and pride comes from learning how to solve one’s own problems.",
        "HC": "We must let individuals take care of themselves, and be cautious of over-involving ourselves in people’s lives. Strength and pride comes from learning how to solve one’s own problems.",
        "SP": "We must let people take care of themselves. You can’t get too involved in people's lives. Strength and pride comes from learning how to solve your own problems.",
        "DT": "We must let people take care of themselves. You can’t get too involved in people's lives. Strength and pride comes from learning how to solve your own problems."
    },
    toleranceCondition: {
        "BO": "The world should be more accepting of people with different world views and moral standards. By embracing acceptance, we can change the world for the better.",
        "HC": "The world should be more accepting of people with different world views and moral standards. By embracing acceptance, we can change the world for the better.",
        "SP": "The world should try to get along better with people of every type. Even those who look at the world differently. If we just accepted everyone for what they are we can change the world for the better.",
        "DT": "The world should try to get along better with people of every type. Even those who look at the world differently. If we just accepted everyone for what they are we can change the world for the better."
    },
    traditionalismCondition: {
        "BO": "Families play a foundational role in society. Families ensure that the next generation learns the American values that define who we are, and who we strive to be.",
        "HC": "Families play a foundational role in society. Families ensure that the next generation learns the American values that define who we are, and who we strive to be.",
        "SP": "Families are the bedrock of society. Families make sure that the next generation learns the American values that define who we are, and who we want to be.",
        "DT": "Families are the bedrock of society. Families make sure that the next generation learns the American values that define who we are, and who we want to be."
    }
};

var targetMemeSourceLibrary = {
    "BO": "-Barack Obama\nTo Kalamazoo High School on June 8, 2010",
    "HC": "-Hillary Clinton\nTo Wellesley College on May 28, 2001",
    "SP": "-Sarah Palin\nTo Liberty University on December 6, 2013",
    "DT": "-Donald Trump\nTo People Magazine on July 9, 1998"
};

var targetMemeImageSourceLibrary = {
    "BO": "http://i.imgur.com/kQkkSLw.png",
    "HC": "http://i.imgur.com/GWBHtV1.png",
    "SP": "http://i.imgur.com/4EjjVi2.png",
    "DT": "http://i.imgur.com/l15IESM.png"
};

var fillerMemeCopyLibrary = {
    "0": "If you accept the expectations of others, especially negative ones, then you never will change the outcome.",
    "1": "As we look ahead into the next century, leaders will be those who empower others.",
    "2": "Reading, after a certain age, diverts the mind too much from its creative pursuits. Any man who reads too much and uses his own brain too little falls into lazy habits of thinking."
};

var fillerMemeSourcesLibrary = {
    "0": "-Michael Jordan\nTo a Sports Illustrated reporter on July 8th, 1996",
    "1": "-Bill Gates, 1996\nTo Forbes, published January 1996",
    "2": "-Albert Einstein\nWritten in an essay, published 1936"
};

var fillerMemeImageSourceLibrary = {
    "0": "http://i.imgur.com/znhYJK1.png",
    "1": "http://i.imgur.com/Tn6Ohoa.png",
    "2": "http://i.imgur.com/Zx87yWQ.png"
};
