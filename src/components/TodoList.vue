<template>
  <transition-group name="list" tag="ul">
    <li class="shadow" v-for="(todo, idx) in this.storedTodoItems" :key="todo+idx">
      <span :class="{textCompleted: todo.done}" @click="toggleTodoItem(idx)">{{ todo.label }}</span>
      <span class="removeBtn" @click="removeTodoItem(idx)">Remove</span>
    </li>
  </transition-group>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';

  export default {
    name: "TodoList",
    computed: {
      ...mapState(['todoItems']),
      ...mapGetters(['storedTodoItems'])
    },
    methods: {
      ...mapMutations(['toggleTodoItem', 'removeTodoItem'])
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
    transition: all 0.8s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>