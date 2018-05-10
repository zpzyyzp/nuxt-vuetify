<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <kda/>
    </v-flex>
  </v-layout>
</template>
<script>
  import Kda from '../components/kda-list'
  export default {
    components: {Kda},
    head () {
      return {
        title: 'IRIアーカイブ'
      }
    }
  }
</script>