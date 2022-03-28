<template>
  <div id="app">
    <TodoHeader label="TODO it!"></TodoHeader>
    <TodoInput @submitTodoItem="addTodoItem"></TodoInput>
    <TodoList :todo-list="todoItems" @removeTodoItem="removeTodoItem"></TodoList>
    <TodoFooter @clear="clearTodoItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from './components/TodoFooter';
import LocalStorage from "./helper/localStorage";

export default {
  name: 'App',
  components: { TodoFooter, TodoList, TodoInput, TodoHeader},
  data() {
    return {
      todoItems: [],
    }
  },
  created() {
    this.todoItems = LocalStorage.fetch();
  },
  methods: {
    addTodoItem(newTodoItem) {
      this.todoItems.push(newTodoItem);
      LocalStorage.update(this.todoItems);
    },
    removeTodoItem(targetTodoItem) {
      this.todoItems = this.todoItems.filter(todo => todo !== targetTodoItem);
      LocalStorage.update(this.todoItems);
    },
    clearTodoItems() {
      LocalStorage.clear();
      this.todoItems = [];
    }
  },
}
</script>