<template>
    <div>
      <div>父组建</div>
      <div v-for="site in parentMsg">
        <child_vue :message="site"></child_vue>
      </div>
    </div>
</template>

<script>
    import child from '../../src/components/child'
    export default {
        name: "parent",
        components:{
          child_vue:child
        },
        data(){
          return {
              parentMsg:[
                {
                  text:"这是简介1",
                  name:"这是名字1"
                },
                {
                  text:"这是简介2",
                  name:"这是名字2"
                },
                {
                  text:"这是简介3",
                  name:"这是名字3"
                },
                {
                  text:"这是简介4",
                  name:"这是名字4"
                },
              ]
          }
        }
    }
</script>

<style scoped>

</style>
