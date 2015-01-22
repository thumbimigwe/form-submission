//var resultsstring='';

function sendEmail(email, name, subject, textIn) {

    data = {
        "key": "WXc4Rig_JDUopd-yhuOhlw",
        "message": {
            "html": textIn + 'We will meet up next to MTCC Global Grounds. Please show up 10 minutes earlier than time shown. We expect you to bring your gear if not please contact us.',
            "text": textIn + 'We will meet up next to MTCC Global Grounds. Please show up 10 minutes earlier than time shown. We expect you to bring your gear if not please contact us.',
            "subject": "IIT Climbing " + subject,
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
/*
//write a function getCounter(event_id)
function getCount(eventidfb){ //eventID is the reference weekdb/eventid/
    eventidfb.child('Count').on('value', function(nameSnapshot) {
        console.log('HEres the console of event2' +  nameSnapshot.val());

});}*/


//add a parampositionRefeter that references the event_id and increments it.
function counterUpdate(eventid) {
    eventid.transaction(function (currentValue) {
        return (currentValue || 0) + 1
    });
}


//isNumeric checks if the input is a number and returns a boolean
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function decypherEventID(eventidstr){
    // ve_1230_6pm
    // aa_####_#am/pm
    // two letter of gym  _  date  _ time
    switch(eventidstr.toUpperCase().substr(0,2)){
        case "VE":
            gym_name='Vertical Endeavors'
            break;
        case "BB":
            gym_name="Brooklyn Boulders"
            break;
        case "CO":
            gym_name="Climb On"
            break;
        case "HP":
            gym_name="Hidden Peak"
            break
        default :
            gym_name="No gym found"
            break;
    }
//eventidstr.toUpperCase().substr(0,2)
    var decypherstringrtr=gym_name + ' on ' + eventidstr.substr(3,2) +'/'+ eventidstr.substr(5,2) + ' ' + eventidstr.substr(8,eventidstr.stringLength);
    return decypherstringrtr.toString();

}



$(function() {

    var events_in = ["ve_1230_6pm", "event_2_date"],
        events_in_count = events_in.length,
        i = 0;

    for(;i<events_in_count;i++) {
        //alert(event_in[i]);
       var events_name= String(decypherEventID(events_in[i]));

        $('#checkboxes').append('<div class="checkbox"><label><input type="checkbox" name="events[]" value=""'+ events_in[i] +'" />'+ events_name +'</label></div>');

    }

});



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





function submitEvent(name, anum, email, phone, comment, timeInMs, eventsid, firebaseref){

    var eventidFB = firebaseref.child(eventsid.toString());
    var eventidcount = eventidFB.child('Count');

    //for some reason this function below is not running and keeping eventcount as 999
    //I had to implement getCount inside this function since it was returning me null but same exact code *used to* works fine here
    //possibly put the counts back into the html script tag how it was before
    //eventcount can only be acessed inside the .on function since its assynchronous
    //new problem arises with above fix. we have to go through multiple events

    var going = false;

    eventidcount.once('value', function(snapshot , going) {
        var eventcount = snapshot.val();
        var going = false;
        going = eventcount < 6 ? true : false;
        counterUpdate(eventidcount);

        eventidFB.child('data/'+ name.toString()).set({ name: name, anum: anum, email: email, phone: phone, comment: comment, time: timeInMs, count: eventcount, going: going });
        //console.log('going?' + going);

        //I couldnt save the results into one string so seperate emails for each event till solution is found
        sendEmail(email, name, decypherEventID(eventsid.toString()),'going: ' + going);
    });


    //everything below must be thrown inside .on() function but I do not want it to post to firebase when ever theres a change in count
    //one way to do this is if notsubmited=true run this code and when .onComplete change notsubmited= false and disconnect from the firebase app.
}


function newsubmitForm(firebaseref){

    var name = $("#nameInput").val();
    var anum = $("#anumb").val();
    var email = $("#emailInput").val();
    var phone = Number($("#phonenum").val());
    var comment = $("#commentsIn").val();
    //Returns the current time in mS
    var timeInMs = Date.now();

    var eventsarray =  document.getElementsByName('events[]');
    console.log('before the while loop');
    var i =0;

    while(i < eventsarray.length){
        if(eventsarray[i].checked) {
            submitEvent(name, anum, email, phone, comment, timeInMs, eventsarray[i].value, firebaseref);
        }
        i=i+1;}

    alert('Your responses has been submitted. You will receive a confirmation email within the hour.');
    //Firebase.goOffline();
    setTimeout(function(){
        window.open('','_self').close();
    }, 2000);

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