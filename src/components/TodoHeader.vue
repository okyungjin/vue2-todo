<template>
  <h1>{{ label }}</h1>
</template>

<script>
  export default {
    name: "TodoHeader",
    props: {
      label: String
    }
  }
</script>