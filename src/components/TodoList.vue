<template>
  <ul>
    <li v-for="(todo, idx) in todoList" :key="todo+idx">
      <span :class="{textCompleted: todo.done}" @click="toggleTodoItem(idx)">{{ todo.label }}</span>
      <button class="removeBtn" @click="removeTodoItem(idx)">Delete</button>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "TodoList",
    props: {
      todoList: Array,
    },
    computed: {
      isTodoDone(isDone) {
        return {'is-done': isDone};
      }
    },
    methods: {
      removeTodoItem(targetIdx) {
        this.$emit('removeTodoItem', targetIdx);
      },
      toggleTodoItem(targetIdx) {
        this.$emit('toggleTodoItem', targetIdx);
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .checkBtnCompleted {
    color: #b3adad;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  /* transition css */
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>