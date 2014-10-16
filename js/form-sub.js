function sendEmail(email, name, textIn) {

    data = {
        "key": "WXc4Rig_JDUopd-yhuOhlw",
        "message": {
            "html": textIn,
            "text": textIn,
            "subject": "IIT Climbing - VE 09/03/14",
            "from_email": "iitclimbing@gmail.com",
            "from_name": "IIT Climbing",
            "to": [
                {
                    "email": email,
                    "name": name
                }
            ]
        },
        "async": false
    };

    $(document).ready(function () {

        $.ajax({
            type: "POST",
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: data});
    });
}


function counterUpdate() {
    positionRef.transaction(function (currentValue) {
        return (currentValue || 0) + 1
    });
}


//isNumeric checks if the input is a number and returns a boolean
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function sendToFireBase(name, anum, email, phone, comment, timeInMs) {


    //Below is the reference to the counter variable in firebase\
    //.once was used so that anyone open with the form doesn't see the changes the admin does to the database.
    positionRef.once("value", function (snapshot) {
        //count = snapshot.val();

        var userTimeRef = scoreListRef.child(name);
        //this will call the counter update that will update the /Count/Count variable
        counterUpdate();
        //userTimeRef.setWithPriority({ name:name, anum: anum, email: email, phone: phone, comment: comment, time:timeInMs}, timeInMs);
        //alert("Your submission has been saved.")
        //Displays your current position on the list
        //window.alert(count);
        //Add below sendEmail function that throws in an variables of text to say whats up.
        //Logic to see if your on the wait list or going
        if (count > 2) {
            var textInp = "Your are on the waitlist for the event. We will contact you if we get an opening. Thanks and Climb On!"
            sendEmail(email, name, textInp);
            alert("Your on the waitlist. A confirmation email will be sent to you soon. Please close the page.");
        }
        else {
            var textInpp = "Your are in we will be evaluating the submissions and sending you more detailed email about the event."
            sendEmail(email, name, textInpp);
            alert("Your in! A confirmation email will be sent to you soon. Please close the page.")
        }

        userTimeRef.setWithPriority({ name: name, anum: anum, email: email, phone: phone, comment: comment, time: timeInMs, count: count}, timeInMs);
    });

    //alert(count);

}


function submitForm() {

    var name = $("#nameInput").val();
    var anum = $("#aNumber").val();
    var email = $("#emailInput").val();
    var phone = Number($("#phoneInput").val());
    var comment = $("#commentInput").val();
    //Returns the current time in mS
    var timeInMs = Date.now();

    if ((name != "" && email != "" && isNumeric(parseInt(anum))) || (name != "" && email != "" && isNumeric(parseInt(anum)) && isNumeric(parseInt(phone)))) {
        sendToFireBase(name, anum, email, phone, comment, timeInMs);

        //alert("Your submission has been saved. You will receive an email within the hour. If you have not received the email please contact us at climbing@iit.edu")
    }


    else {
        alert("Please enter Name,A#,Email, and Phone correctly.")
    }
}