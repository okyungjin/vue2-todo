<template>
  <form id="todo-input" @submit.prevent="submitTodoItem">
    <label for="searchText"></label>
    <input type="text" id="searchText" v-model="inputText">
    <button type="submit">ADD</button>
  </form>
</template>

<script>
  export default {
    name: "TodoInput",
    data() {
      return {
        inputText: '',
      }
    },
    methods: {
      submitTodoItem() {
        this.$emit('submitTodoItem', this.inputText);
        this.clearInput();
      },
      clearInput() {
        this.inputText = '';
      }
    }
  }
</script>