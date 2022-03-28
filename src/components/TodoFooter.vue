<template>
  <div>
    <button @click="clear">Clear All</button>
  </div>
</template>

<script>
  export default {
    name: 'TodoFooter',
    methods: {
      clear() {
        this.$emit('clear');
      }
    }
  };
</script>

<style scoped>

</style>