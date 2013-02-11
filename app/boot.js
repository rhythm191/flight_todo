'use strict';

define(

  [
    'app/components/datastore',
    'app/components/todo_items',
    'app/components/new_todo'
  ],

  function(
    DataStore,
    TodoItems,
    NewTodo) {

    function initialize() {
      DataStore.attachTo(document);
      TodoItems.attachTo('#todo-list');
      NewTodo.attachTo('#new-todo')
    }

    return initialize;
  }
);