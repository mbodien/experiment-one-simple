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

/* Data saving */

var data = []; // all data will be stored here

var d = new Date();

function expStartDataSave() {
    var expStartTime = d.getTime();
    var startTime = "experimentStart: " +expStartTime;
    data.push(startTime);
}

function demoDataSave() {
    if (!$("input[name=gender]:checked").val() || !$("input[name=facebookUsage]:checked").val()) {
        $("#demosDataError").show();
    } else {
        var age = $("input[name=age]:checked").val();
        var ageSave = "age: " + age;
        var gender = $("input[name=gender]:checked").val();
        var genderSave = "gender: " + gender;
        var facebookUsage = $("input[name=facebookUsage]:checked").val();
        var facebookUsageSave = "facebookUsage: " + facebookUsage;
        data.push(ageSave, genderSave, facebookUsageSave);
        nextPage();
    }
}

function politicalDataSave() {
    if (!$("input[name=partyID]:checked").val() || !$("input[name=ideology]:checked").val() || !$("input[name=partyImportance]:checked").val()) {
        $("#politicalDataError").show();
    } else {
        var partyID = $("input[name=partyID]:checked").val();
        var partyIDsave = "party: " + partyID;
        var ideology = $("input[name=ideology]:checked").val();
        var ideologySave = "ideology: " + ideology;
        var socialValues = $("input[name=socialValues]:checked").val();
        var socialValuesSave = "socialValues: " + socialValues;
        var ideologyImportance = $("input[name=partyImportance]:checked").val();
        var ideologyImportanceSave = "importance: " + ideologyImportance;
        data.push(partyIDsave, ideologySave, socialValuesSave, ideologyImportanceSave);
        decideConditions();
        setExperimentDirections();
        nextPage();
    }
}

function trial1StartTime() {
    var startTime = d.getTime();
    var startTimeSave = "trial1 start: " + startTime;
    data.push(startTimeSave);
}

function trial2StartTime() {
    var startTime = d.getTime();
    var startTimeSave = "trial2 start: " + startTime;
    data.push(startTimeSave);
}

function saveMemeData() {
    var memeNumber = "memeID:" + memeID;
    var memeScore = $("input[name=likertMeme]:checked").val();
    var likertData = "trialID_" + trialID + "_" + memeNumber + ": " + memeScore;
    var buttonClickedTime = d.getTime();
    var RTData = "trialID_" + trialID + "_" + memeNumber + ": " + buttonClickedTime;
    data.push(likertData, RTData);
    console.log(RTData);
    console.log(likertData);
}

function saveFacebookLikeData() {
    memeLike = $("input[name=likertMemeFB]:checked").val();
    data.push("facebookLike: " + memeLike);
}

function saveFacebookShareData() {
    memeShare = $("input[name=likertMemeFB]:checked").val();
    data.push("facebookShare: " + memeShare);
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
        $("#trial1Directions").text("In a moment, we will show you 4 different memes that we will ask you to evaluate.\n\nBut, before we show you the whole memes, we want to know how you feel about just the message of each meme.\n\nPlease record how much you resonate with the message.\n\nBy resonate we mean how much does the message speak to you in a positive, inspiring, and meaningful way.");
    } else if (revealOrderCondition === "sourceFirstCondition") {
        $("#trial1Directions").text("There are 4 different memes that you will see.\n\nBut, before we show you the whole memes, we want to know how you feel about just person who authored each message.\n\nPlease record how much you resonate with the person that you see.\n\nBy resonate we mean how much do you find the person positive, inspiring, and meaningful.");
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
    $("#page6").hide();
    $("#page5").show();
    currentPage = 5;
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
    }
    else {
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

var facebookEvalPage = 0;

function facebookEvaluation() {
    if (facebookEvalPage < 1) { // if completed "like" question
        saveFacebookLikeData();
        facebookEvalPage ++;
        $("input[name=likertMemeFB]").prop("checked",false); // reset likert question
        $("#facebookDirections").text("Which of the memes that you have seen would you be most likely to 'share' on Facebook?\nSelect only 1.");
        $("#facebookEvalPicture-0").attr("src","http://audioenhancement.com/wp-content/uploads/2014/05/Share-on-Facebook-LG.png");
        $("#facebookEvalPicture-1").attr("src","http://audioenhancement.com/wp-content/uploads/2014/05/Share-on-Facebook-LG.png");
        $("#facebookEvalPicture-2").attr("src","http://audioenhancement.com/wp-content/uploads/2014/05/Share-on-Facebook-LG.png");
        $("#facebookEvalPicture-3").attr("src","http://audioenhancement.com/wp-content/uploads/2014/05/Share-on-Facebook-LG.png");
    } else {  // if completed "share" question
        saveFacebookShareData();
        nextPage();
        writeData();
    }
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
        "SP": "Everyone is born the same. Everyone could be great. But, there isn’t an equal opportunity in this country to make it happen. There should be.",
        "DT": "Everyone is born the same. Everyone could be great. But, there isn’t an equal opportunity in this country to make it happen. There should be."
    },
    selfRelianceCondition: {
        "BO": "We must let individuals take care of themselves, and be cautious of over-involving ourselves in people’s lives. Strength comes from learning how to solve one’s own problems.",
        "HC": "We must let individuals take care of themselves, and be cautious of over-involving ourselves in people’s lives. Strength comes from learning how to solve one’s own problems.",
        "SP": "Let people take care of themselves. We can’t do everything for them. If we let people figure things out on their own, it will make them strong. And make them proud.",
        "DT": "Let people take care of themselves. We can’t do everything for them. If we let people figure things out on their own, it will make them strong. And make them proud."
    },
    toleranceCondition: {
        "BO": "I’ve always been someone who gets along with others. By listening, by embracing others’ unique point of view, you give yourself the chance to connect with those you’d never otherwise associate.",
        "HC": "I’ve always been someone who gets along with others. By listening, by embracing others’ unique point of view, you give yourself the chance to connect with those you’d never otherwise associate.",
        "SP": "I get along with people of every type. Not just because good people are everywhere but because I’ve learned that there’s more to be gained by accepting and listening than by shutting them out.",
        "DT": "I get along with people of every type. Not just because good people are everywhere but because I’ve learned that there’s more to be gained by accepting and listening than by shutting them out."
    },
    traditionalismCondition: {
        "BO": "Families play a foundational role in society. It’s the responsibility of every parent to ensure that the next generation learns the long-standing values that define who we are, and who we strive to be.",
        "HC": "Families play a foundational role in society. It’s the responsibility of every parent to ensure that the next generation learns the long-standing values that define who we are, and who we strive to be.",
        "SP": "Families are the bedrock of society. Healthy families make sure that those long-established values that make us who we are make it to the next generation, and every generation after.",
        "DT": "Families are the bedrock of society. Healthy families make sure that those long-established values that make us who we are make it to the next generation, and every generation after."
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
    "2": "The only thing that interferes with my learning is my education."
};

var fillerMemeSourcesLibrary = {
    "0": "-Michael Jordan\nTo a Sports Illustrated reporter, July 8th, 1996",
    "1": "-Bill Gates, 1996\nTo Forbes, January 22nd 1996",
    "2": "-Albert Einstein\nWritten in an essay, published 1936"
};

var fillerMemeImageSourceLibrary = {
    "0": "http://i.imgur.com/znhYJK1.png",
    "1": "http://i.imgur.com/Tn6Ohoa.png",
    "2": "http://i.imgur.com/Zx87yWQ.png"
};
