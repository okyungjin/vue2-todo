<template>
  <h1>{{ label }}</h1>
</template>

<script>
  export default {
    name: "TodoHeader",
    data() {
      return {
        label: 'TODO it!',
      }
    }
  }
</script>