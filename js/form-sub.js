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
function getCount(eventid){ //eventID is the reference weekdb/eventid/
    eventid.child('Count').on('value', function (snapshot) {
        return snapshot.val();
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
}


//add a parampositionRefeter that references the event_id and increments it.
function counterUpdate(eventid) {
    eventid.child('Count').transaction(function (currentValue) {
        return (currentValue || 0) + 1
    });
}


//isNumeric checks if the input is a number and returns a boolean
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


/*

 // Tests to see if /users/<userId> has any data.
 function checkIfUserExists(userId) {
 var usersRef = new Firebase(USERS_LOCATION);
 usersRef.child(userId).once('value', function(snapshot) {
 var exists = (snapshot.val() !== null);
 userExistsCallback(userId, exists);
 });
 }

 */



//add event_id parameter to sendToFireBase function
//Create a new js app that will initialize the DB with all the events and create a count 0


//add variables firebase, event_id[],




function submitEvent(name, anum, email, phone, comment, timeInMs, eventsid, firebaseref){

    var eventidFB = firebaseref.child(eventsid);
    var eventidcount = getCount(eventsid);
    var going;

    going = eventidcount < 6 ? true : false;

    eventidFB.child('data/'+ name).setWithPriority({ name: name, anum: anum, email: email, phone: phone, comment: comment, time: timeInMs, count: eventidcount, going: going }, timeInMs);
    counterUpdate(eventsid);

    return 'For event:'+ eventsid + ' you are going:' + going;
}


function newsubmitForm(firebaseref){

    var name = $("#nameInput").val();
    var anum = $("#anumb").val();
    var email = $("#emailInput").val();
    var phone = Number($("#phonenum").val());
    var comment = $("#commentsIn").val();
    //Returns the current time in mS
    var timeInMs = Date.now();
    alert('newsubmitform');

    var eventsarray = $("#events[]").val();
    var resultstr = '';

    var i =0;
    while(i < eventsarray.length){

         resultstr= resultstr + ""  +   submitEvent(name, anum, email, phone, comment, timeInMs, eventsarray[i], firebaseref);
        i=i+1;};

    sendEmail(email, name, resultstr);

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

            //this causes a infinite loop so i had once is T/F
            if (once){
                //alert("nice");
                newsubmitForm(firebaseref);
                once = false; }

        });
});