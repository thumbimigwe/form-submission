Form-Submission
===============

Form-Submission is used to automate the events sign up for the climbing club.

Template form submission using Firebase for events. Just use firebase hacker plan.



<h1>To-Do</h1>
------

- [ ] Add the check box for multiple events
- [ ] Figure a way out to send out multiple events results in one email and do this on one html page
- [ ] Create JS function to create tables of each events data
- [ ] Remove the results from the form page when done fixing above issues



<h1>Specs</h1>
==================================

Data Base Structure of the form responses
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



Events ID

Name: Vertical Endeavors Saturday December 3, 6:00pm

corresponding ID: ve_1203_6pm

<abbreviated name of place>_<date>_<time>



<h2>Results</h2>
==================================
Table Template

<pre>
 ______________________________________________________
| Positon | Name | A# | Email | Phone | Comment | Time |
|------------------------------------------------------|
|         |      |    |       |       |         |      |
|______________________________________________________|

    </pre>

The way to do this quick is to have a JS funciton that will take in the event id and pull data to create the table.

Firebase can't check all its child nodes so I'll have to manually insert the event Id's to the page.



<h1>Implementing into Production</h1>
-------------------------------------

* Boiler plate HTML Form
* Add Firebase web link to form and results
* Insert event options for the week
    - in the form and results page