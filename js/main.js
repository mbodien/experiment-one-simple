$(".page").hide();
$("#page3").show();
var currentPage = 3;

/* hidden elements */

$(".errorMessage").hide();

$(".facebookSharePicture").hide();


// $(document).ready(function () {
//
// });



function nextPage() {
    var pageHide = "#page" + currentPage;
    currentPage ++;
    var pageShow = "#page" + currentPage;
    $(pageHide).hide();
    $(pageShow).show();
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
        $("#trial1Directions").text("There are 4 different memes that you will see.\n\nBut, before we show you the whole memes, we want to know how you feel about just person who authored each message.\n\nPlease record how much you resonate with the person that you see.\n\nBy resonate we mean how much do you find the person positive, inspiring, and meaningful.");
    } else if (revealOrderCondition === "sourceFirstCondition") {
        $("#trial1Directions").text("There are 4 different memes that you will see.\n\nBut, Before we show you the whole memes, we want to know how you feel about just the message of each meme.\n\nPlease record how much you resonate with the person.\n\nBy resonate we mean how much does the message speak to you.");
    }
}


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

var data = [];


function saveMemeData() {
    var memeNumber = "memeID = " + memeID;
    var memeScore = $("input[name=likertMeme]:checked").val();
    var likertData = "trialID = " + trialID + " " + memeNumber + ": " + memeScore;
    var d = new Date();
    var buttonClickedTime = d.getTime();
    var RTData = "trialID = " + trialID + " " + memeNumber + ": " + buttonClickedTime;
    data.push(likertData, RTData);
    console.log(RTData);
    console.log(likertData);
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
        saveMemeData();  // creates variable to save data
        clearMemeLikert(); // unchecks the likert radio buttons
        memeCounter(); // +1 meme ID counter, and checks trial counter
    }
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


/* objects of all meme content */

var targetMemeCopyLibrary = {
    equalityCondition: {
        "BO": "Everyone starts with the capacity to achieve great success. There should be an equal opportunity to everyone to forge that achievement.",
        "HC": "Everyone is born with equal capacity for achieving success. Citizens in this country deserve an equal opportunity to reach that potential.",
        "SP": "Common sense tells us that every person is born with great potential. Common sense also tells us that we need to make sure everyone has equal opportunity to make it happen.",
        "DT": "Everyone is born the same. Everyone could be great. But, there isn’t an equal opportunity in this country to make it happen. There should be."
    },
    selfRelianceCondition: {
        "BO": "Understand that your success in life won’t be determined just by what’s given to you, but by how hard you try. Self perseverance and self reliance should be values that we fight to uphold.",
        "HC": "Strength comes from learning how to handle problems on your own. It’s a crucial skill that everyone must learn. We should always do what we can to encourage that learning.",
        "SP": "Let people figure things out on their own. Learn how to take care of yourself and you’ve learned the most important thing you can.",
        "DT": "Let people take care of themselves. It makes them strong. And it makes them proud."
    },
    toleranceCondition: {
        "BO": "People should be proud of their identity, and they should feel free and able to share that identity. It is our job to make sure that that freedom persists.",
        "HC": "We have the opportunity to embrace not only our own families and communities, but those families and communities that have so much more to offer. Why would we pass on that?",
        "SP": "Sometimes we all feel a bit like the outsider. Everyone can relate to what it’s like to feel excluded. We should always do our best to include others, even if they don’t make choices that we always agree with.",
        "DT": "I get along with people of every type. Not just because good people are everywhere but because I’ve learned that there’s more to be gained by accepting and listening to them than by shutting them out."
    },
    traditionalismCondition: {
        "BO": "Those traditions and values that we have inherited from our parents, and their parents before them, are integral to who we are. We should defend these ideas like we would defend our current lives.",
        "HC": "When our families are strong, we are strong. The traditional values that come from good families are the bedrock of our country. We should never forget that.",
        "SP": "You bet family is important. I’d say the values that come from good, loving families is the most important feature of society today. We should treasure those family values.",
        "DT": "We shouldn’t be afraid of sticking to the things that have worked for us for so long. We should never lose them. We should never forget them. This should be priority number one."
    }
};

var targetMemeSourceLibrary = {
    "BO": "-Barack Obama\nTo Kalamazoo High School on June 8, 2010",
    "HC": "-Hillary Clinton\nTo Wellesley College on May 28, 2001",
    "SP": "-Sarah Palin\nTo Liberty University on December 6, 2013",
    "DT": "-Donald Trump\nTo People Magazine on July 9, 1998"
};

var targetMemeImageSourceLibrary = {
    "BO": "http://bloximages.chicago2.vip.townnews.com/stljewishlight.com/content/tncms/assets/v3/editorial/b/03/b037b0de-4830-11e1-a8ed-001871e3ce6c/4f216e3f0426f.image.jpg?resize=558%2C759",
    "HC": "http://acelebrationofwomen.org/wp-content/uploads/2013/01/HRC.jpeg",
    "SP": "http://thebetterrepublican.com/wp-content/uploads/2016/01/sarah-palin-a-320.jpg",
    "DT": "http://d28hgpri8am2if.cloudfront.net/author_images/5460/donald-j-trump-24050762.jpg"
};

var fillerMemeCopyLibrary = {
    "0": "If you accept the expectations of others, especially negative ones, then you never will change the outcome",
    "1": "As we look ahead into the next century, leaders will be those who empower others.",
    "2": "The only thing that interferes with my learning is my education."
};

var fillerMemeSourcesLibrary = {
    "0": "-Michael Jordan\nTo a Sports Illustrated reporter, July 8th, 1996",
    "1": "-Bill Gates, 1996\nTo Forbes, January 22nd 1996",
    "2": "-Albert Einstein\nWritten in an essay, published 1936"
};

var fillerMemeImageSourceLibrary = {
    "0": "http://thumbs.ebaystatic.com/images/g/AggAAOSwd4tTxuTC/s-l225.jpg",
    "1": "http://insidebigdata.com/wp-content/uploads/2013/07/bill-gates-headshot-500px.jpg",
    "2": "https://s-media-cache-ak0.pinimg.com/736x/05/e1/30/05e1303ea36a8c89e217a1471ff0fb0a.jpg"
};
