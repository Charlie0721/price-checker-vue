<template>
  <div class="home">
    <br>
    <img alt="Vue logo" src="../assets/logo.jpeg">
   
<ChequeadorP></ChequeadorP>
  </div>
</template>

<script>
// @ is an alias to /src
import ChequeadorP from '@/components/ChequeadorP.vue'


export default {
  name: 'Home',
  components: {
  
    ChequeadorP
  }
}
</script>
