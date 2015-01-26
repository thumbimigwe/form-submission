/**
 * Created by shimsware on 1/21/15.
 */

function createBranch(){
    //events_in must be in format event_1_334,event_2_234,etc...




    var events_in_array = $("#events_in").val().split(",");
    var events_in_count = events_in_array.length,
        i = 0;
    //create firebase ref here
    var firebase_idnew = new Firebase($("#firebase_id").val());

    alert(events_in_array+'    '+firebase_idnew);

    //this will initialize the firebase
    //iterate through array and post 0 to count of each event.
    for(;i<events_in_count;i++) {
        firebase_idnew.child(events_in_array[i]).set({Count: 0});
    }
    alert('Complete')
}