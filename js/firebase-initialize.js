/**
 * Created by shimsware on 1/21/15.
 */

function createBranch(events_in, firebase_id){

    var events_in_count = events_in.length,
        i = 0;
    //create firebase ref here
    var firebase_id = new Firebase(firebase_id);

    //this will initialize the firebase
    //iterate through array and post 0 to count of each event.
    for(;i<events_in_count;i++) {
        firebase_id.child(events_in[i]).set({Count: 0});
    }
    alert('Complete')
}