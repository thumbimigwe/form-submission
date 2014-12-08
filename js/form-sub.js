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

//write a function getCounter(event_id)




//add a parameter that references the event_id and increments it.

function counterUpdate() {
    positionRef.transaction(function (currentValue) {
        return (currentValue || 0) + 1
    });
}


//isNumeric checks if the input is a number and returns a boolean
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



//add event_id parameter to sendToFireBase function

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
        if (count > 5) {
            var textInp = "Your are on the waitlist for the event. We will contact you if we get an opening. Thanks and Climb On!"
            sendEmail(email, name, textInp);
            //alert("Your on the waitlist. A confirmation email will be sent to you soon. Please close the page.");
        }
        else {
            var textInpp = "Your are in we will be evaluating the submissions and sending you more detailed email about the event."
            sendEmail(email, name, textInpp);
            //alert("Your in! A confirmation email will be sent to you soon. Please close the page.")
        }

        userTimeRef.setWithPriority({ name: name, anum: anum, email: email, phone: phone, comment: comment, time: timeInMs, count: count}, timeInMs);
    });

    //alert(count);

}



function submitForm() {



    var name = $("#nameInput").val();
    var anum = $("#anumb").val();
    var email = $("#emailInput").val();
    var phone = Number($("#phonenum").val());
    var comment = $("#commentsIn").val();
    //Returns the current time in mS
    var timeInMs = Date.now();

    //Final check of input before its sent out to the DB
    if ((name != "" && email != "" && isNumeric(parseInt(anum))) || (name != "" && email != "" && isNumeric(parseInt(anum)) && isNumeric(parseInt(phone)))) {
        sendToFireBase(name, anum, email, phone, comment, timeInMs);

        alert("Your submission has been saved. You will receive an email within the hour. If you have not received the email please contact us at climbing@iit.edu")
    }


    else {
        alert("Please enter Name,A#,Email, and Phone correctly.")
        }

}


$(document).ready(function() {
    $('.registerForm').bootstrapValidator({
        //container: 'tooltip',
        live: 'enabled',
        message: 'This value is not valid',

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The username can only consist of alphabetical, number and underscore'
                    }
                }
            },
                name: {
                    message: 'The name is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The name is required and cannot be empty'
                        },
                        stringLength: {
                            min: 4,
                            max: 30,
                            message: 'Enter full name. The name must be more than 4 and less than 30 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ]+$/,
                            message: 'The name can only consist of alphabetical'
                        }
                    }
                },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            phonenum: {
                validators: {
                    notEmpty: {
                        message: 'The phone is required and cannot be empty'
                    },
                    stringLength:{
                        min:10,
                        max:10,
                        message: 'The input is not a valid phone number must be in format 3125673000'
                    },
                    digits: {
                        message: 'The phone number must consist of digits only'
                    }
                }
            },

            anumb: {
                validators: {
                    notEmpty: {
                        message: 'The A# is required and cannot be empty'
                    },
                    stringLength:{
                        min:8,
                        max:8,
                        message: 'A valid A# is 8 places long'
                    },
                    digits: {
                        message: 'The phone number must consist of digits only'
                    }
                }
            },
            comments: {
                validators: {

                    stringLength:{
                        min:0,
                        max:250,
                        message: '250 characters max length.'
                    }
                }
            },

            'events[]': {
                validators: {
                    choice: {
                        min: 1,
                        message: 'Please choose 1 event'
                    }
                }
            }

        }
    })
        .on('success.form.bv', function(e) {
            // Prevent submit form
            e.preventDefault();
            var once = true;
            var $form     = $(e.target),
                validator = $form.data('bootstrapValidator');
            $form.find('.alert').html('Thanks for signing up. Now you can sign in as ' + validator.getFieldElements('username').val()).show();

            //this causes a infinite loop how to fix?
            if (once){
            alert("nice");
            submitForm();
            once = false; }

        });
});