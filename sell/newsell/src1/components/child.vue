<template>
    <div>
      <div>{{message.text}}</div>
      <div>{{message.name}}</div>
    </div>
</template>

<script>
    export default {
        name: "child",
        props:{
          message:Object
        }
    }
</script>

<style scoped>

</style>
