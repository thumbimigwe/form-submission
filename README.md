Form-Submission
===============

Template form submission using Firebase for events. Just use firebase hacker plan.



<h1>Specs</h1>
==================================

Data Structure of the form responses
-----------------------

<pre>
Date ##/##/##
 |____ Event #
        |____ count_event#
        |____ responses_event#
                |____person #
                        |____ Position
                        |____ Name
                        |____ A#
                        |____ Email
                        |____ Phone
                        |____ Comments
                        |____ Time
                |____person #
                        |
 |____ Event #
         |____ count_event#
         |____ responses_event#
                 |____person #
                         |____ Position
                         |____ Name
                         |____ A#
                         |____ Email
                         |____ Phone
                         |____ Comments
                         |____ Time
                 |____person #
                        |
    </pre>      

The plan is to have all the events data into one firebase db. 
    
    *Possible sub option for person is do they need gear.

The way we will do this is by having a checklist for the events you want to sign up for.

- [ ] Event 1
- [ ] Event 2
- [ ] Event 3
- [ ] Event 4
- [x] Event 5


Convert the checked box results into an array

Now we need to go through each checked event and add it to the child node of each event and go through checking if the climber is able to go or not. The results will spit out a string that will be concat with the other results.

Pseudo Code

```

if i < checklist_array.length
    checkresults(checklist_array[i]); //this will put in the event id 

    //pull the count from that event and check if the climber is able to attend
    //append climbers information to that event id results
    //concat results to email_results sring with a new line
    //increment i


```

Reminder
*At least one checkbox must be ticked in order to send the form







<h2>Results</h2>
==================================
Table Template
 ______________________________________________________
| Positon | Name | A# | Email | Phone | Comment | Time |
|------------------------------------------------------|
|         |      |    |       |       |         |      |
|______________________________________________________|


The way to do this quick is to have a JS funciton that will take in the event id and pull data to create the table.

Firebase can't check all its child nodes so I'll have to manually insert the event Id's to the page.

