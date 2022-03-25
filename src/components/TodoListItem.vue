<template>
  <div>
    <p>{{ title }}</p>
    <button @click="removeTodoItem">Delete</button>
  </div>
</template>

<script>
  export default {
    name: "TodoListItem",
    props: {
      title: String,
      isDone: Boolean,
    },
    methods: {
      removeTodoItem() {
        this.$emit('removeTodoItem', this.title);
      }
    }
  }
</script>