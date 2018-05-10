<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 text-xs-center><h2>資料一覧</h2></v-flex>
      <v-flex v-for="(value, key) in results.contents" :key="key" xs12 sm4 md3>
        <v-card :to="'/contents?doi=' + value.doi">
          <v-card-media :src="kda_thumb(value['doi'])" height="250px">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline white--text shadows">{{ value['meta_fields']['title']['value'] }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>{{ value['meta_fields']['title']['value'] }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'kda',
    data () {
      return {
        results: [],
        url: process.env.kda.url,
        m_aid: process.env.kda.m_aid,
        aid: process.env.kda.aid,
        width: 250,
        height: 250
      }
    },
    methods: {
      kda_thumb: function (doi) {
        return this.url + 'api/' + this.m_aid + '/contents/' + this.aid + '/' + doi + '/thumbnail?width=' + this.width + '&height=' + this.height + '&trim=0'
      }
    },
    mounted () {
      axios.get(this.url + 'api/' + this.m_aid + '/topcont', {
        params: {
          aid: this.aid,
          row: 20,
          page: 1
        }
      }).then(response => {
        this.results = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .shadows {
    text-shadow: 1px 1px 2px #000;
  }
</style>
