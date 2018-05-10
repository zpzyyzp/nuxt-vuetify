<template>
  <v-container fluid grid-list-lg>
    <v-layout>
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item to="/">HOME</v-breadcrumbs-item>
      <v-breadcrumbs-item :to="'/contents' + kda_content.doi">{{ kda_content['meta_fields']['title']['value'] }}</v-breadcrumbs-item>
    </v-breadcrumbs>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 id="kda_viewer_wrapper">
        <iframe :src="kda_viewer(kda_content.doi)" allowfullscreen frameborder="none" width="100%" height="700px" class="elevation-2">
          Your browser does not support iframes.
        </iframe>
        <v-btn color="pink" dark small top absolute right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6>
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow" class="elevation-2">
          <v-tab key="meta" ripple><v-icon>info</v-icon>メタデータ</v-tab>
          <v-tab-item key="meta">
            <v-data-table hide-actions hide-headers :items="meta_fields">
              <template slot="items" slot-scope="props">
                <th>{{ props.item.field_name }}</th>
                <td>{{ props.item.value }}</td>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab v-if="child !== null" key="toc" ripple><v-icon>list</v-icon>目次</v-tab>
          <v-tab-item v-if="child !== null" key="toc">
            <v-list>
              <v-list-tile v-for="(child, index) in child.contents" :key="index" @click="page = child.page_no">
                <v-list-tile-title>{{ child['meta_fields']['title']['value'] }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-tab-item>
          <v-tab v-if="kda_content.location.has_location" key="map" ripple><v-icon>map</v-icon>地図</v-tab>
          <v-tab-item v-if="kda_content.location.has_location" key="nap">
            <iframe :src="kda_map(kda_content.doi)" width="100%" height="600px">
              Your browser does not support iframes.
            </iframe>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        url: process.env.kda.url,
        m_aid: process.env.kda.m_aid,
        aid: process.env.kda.aid,
        page: 1,
        child: null
      }
    },
    async asyncData ({query, error}) {
      return axios.get(process.env.kda.url + 'api/' + process.env.kda.m_aid + '/content', {
        params: {
          aid: process.env.kda.aid,
          doi: `${query.doi}`
        }
      }).then((res) => {
        if (res.data.parent_doi === null) {
          return { kda_content: res.data }
        }
        return { kda_content: res.data, parent: true }
      }).catch((e) => {
        error({ statusCode: 404, message: e.response.data.error.message })
      })
    },
    head () {
      return {
        title: this.kda_content['meta_fields']['title']['value']
      }
    },
    methods: {
      kda_viewer: function (doi) {
        return this.url + this.m_aid + '/Viewer/IFViewer?archiveID=' + this.aid + '&doi=' + doi + '&tm=0&p=' + this.page
      },
      kda_map: function (doi) {
        return this.url + this.m_aid + '/IframeMap/Select?archiveID=' + this.aid + '&doi=' + doi + '&related=0&contUrl=' + encodeURI('/content/?doi={doi}')
      },
      kda_child: function (doi) {
        return this.url + 'api/' + this.m_aid + '/children?aid=' + this.aid + '&doi=' + doi + '&row=10000&p=1'
      }
    },
    computed: {
      meta_fields: function () {
        return Object.values(this.kda_content['meta_fields'])
      }
    },
    mounted () {
      axios.get(this.kda_child(this.kda_content.doi)).then((res) => { this.child = res.data })
    }
  }
</script>

<style scoped>

</style>