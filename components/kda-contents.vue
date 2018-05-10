<template>
  <v-flex v-if="error !== null">
    <v-alert :value="true" type="error">
      {{error.message}}
    </v-alert>
  </v-flex>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'kdaContent',
    data () {
      return {
        kda_content: {},
        url: process.env.kda.url,
        m_aid: process.env.kda.m_aid,
        aid: process.env.kda.aid,
        doi: this.$route.query.doi,
        error: null
      }
    },
    methods: {},
    mounted () {
      axios.get(this.url + this.m_aid + '/content', {
        params: {
          aid: this.aid,
          doi: this.doi
        }
      }).then(response => {
        this.kda_content = response.data
      }).catch(error => {
        this.error = error.response.data.error
      })
    }
  }
</script>

<style scoped>

</style>