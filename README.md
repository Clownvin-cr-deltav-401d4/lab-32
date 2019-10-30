# LAB - 32

## TODO Server (Again)
You’ve been supplied starter code for the To Do application that can (optionally) connect to a live API server. In this assignment, you’ll need to refactor the application in a number of ways:
* Modularize both the todo and todo-connected components.
* They will both use the same form, list, details sub-components
* Use the useReducer hook to manage your displayed lists.
* The application should work the same way, with the obvious exception that the ‘connected’ version is hitting server.
* Alter the application to use the connected component, as you’ll need to use your live server to save real data and fire real events.
* Convert the form component use the form hook you created in the practice assignment
* Implement the Q hook and subscribe to the various CRUD events that your deployed API and Q server are wired for.
As you save/delete records, anyone using your application (e.g. having multiple tabs open) should see updates in real time.

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-32/pull/1)
* [![Build Status](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-32.svg?branch=master)](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-32)

## Modules
## Modules
### Header
Contains a header. Set the count property to change the todo count

### Form
Contains a form, taking in a description of the task, who it's assigned to, a difficulty, and a date. When submitting form, a new todo item is created

### TodoList
Contains a list of todos. Todo items are passed in using the "todos" property.

### TodoItem
Houses the information about a single todo, contained in a span, and a button to delete the todo. Clicking on the span will toggle the completed status of the todo.
Clicking the details button will open a modal with the rest of the details.

### Details
A details modal for todo items. Displays more information, such as the asignee, the difficulty, and the date.


## Running the app
* `npm start`
  
## Tests
* `npm test`
