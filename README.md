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

<p>The plan is to have all the events data into one firebase db. 
    *Possible sub option for person is do they need gear.</p>

The way we will do this is by having a 

  <ul>
    <li><input type="checkbox" disabled> Event 1</li>
    <li><input type="checkbox" disabled checked> Event 2</li>
    <li><input type="checkbox" disabled> Event 3</li>
    </ul>











