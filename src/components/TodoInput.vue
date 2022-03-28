<template>
  <div class="inputBox shadow">
    <input type="text" id="searchText" ref="searchText" v-model="inputText" @keyup.enter="submitTodoItem">
    <span class="addContainer" type="submit" @click="submitTodoItem">Add</span>
  </div>
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
        this.autofocus();
      },
      clearInput() {
        this.inputText = '';
      },
      autofocus() {
        this.$refs.searchText.focus();
      }
    }
  }
</script>

<style scoped>
  input:focus {
    outline: none;
  }
  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
</style>
