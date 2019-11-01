# LAB - 32 / 33 / 34

## TODO Server (Again)
You’ve been supplied starter code for the To Do application that can (optionally) connect to a live API server. In this assignment, you’ll need to refactor the application in a number of ways:
* Modularize both the todo and todo-connected components.
* They will both use the same form, list, details sub-components
* Use the useReducer hook to manage your displayed lists.
* The application should work the same way, with the obvious exception that the ‘connected’ version is hitting server.
* Alter the application to use the connected component, as you’ll need to use your live server to save real data and fire real events.
* Convert the form component use the form hook you created in the practice assignment
* Implement the Q hook and subscribe to the various CRUD events that your deployed API and Q server are wired for.
* As you save/delete records, anyone using your application (e.g. having multiple tabs open) should see updates in real time.
## Changes for lab 33
Create a context for managing application settings
* Number of items to display per screen (number)
* Display completed items (boolean)

Implement Pagination

* Only display the first n items in the list, where n is the number to display per screen in your context.
* If you have more than n items in the list, add a button labeled Next that will replace the list with the next n items in the list.
* If you are past the first n items (i.e. on page 2 or higher), add a button labeled Previous that will replace the list with the previous n items in the list.
* Filter the completed items out of the list (or not) based on the appropriate setting in context.
* Once you have the new core functionality working, make the application production ready

Modularize and Refactor the app using Hooks for state management

## Changes for lab 34

* Hide the entire interface until the user has logged in.
* Provide a login and logout option in the header of the app
Implement the following RBAC rules:
* Logged In Users with ‘read’ permissions can see the summary/count
* Logged In Users with ‘read’ permissions can see the list of To Do Items
* Logged In Users with ‘delete’ permissions can click the records to mark them as complete
* Logged In Users with ‘update’ permissions can edit existing items
* Logged In Users with ‘create’ permissions can create new items

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-32/pull/1)(lab-32)
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-32/pull/2)(lab-33)
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-32/pull/3)(lab-34)
* [![Build Status](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-32.svg?branch=dev)](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-32)

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

### ItemCountContext/Provider
A context for item count, or how many items to display per page.

### useItemCount
A hook to enable easy access to ItemCountContext

### DisplayCompletedContext/Provider
A context for toggling the display of completed items.

### useDisplayCompleted
A hook to enable easy access to DisplayCompletedContext

### LoginContext/Provider
A context provider for login information

### useLogin
A hook to enable easy access to LoginContext

## Running the app
* `npm start`
  
## Tests
* `npm test`
