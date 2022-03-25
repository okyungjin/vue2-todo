<template>
  <div>
    <TodoListItem
            v-for="todo in todoList"
            :title="todo"
            :key="todo"
            @removeTodoItem="removeTodoItem"
    ></TodoListItem>
  </div>
</template>

<script>
  import TodoListItem from "./TodoListItem";
  export default {
    name: "TodoList",
    components: {TodoListItem},
    props: {
      todoList: Array,
    },
    methods: {
      removeTodoItem(targetItem) {
        this.$emit('removeTodoItem', targetItem);
      }
    }
  }
</script>