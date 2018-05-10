<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <img src="/v.png" :alt="title">
      </v-toolbar-title>
      <v-btn
              v-for="link in links"
              :key="link.title"
              color="dark"
              :to="link.to"
              flat
      >
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer height="auto" class="white" :inset="true">
      <v-layout row wrap justify-center>
        <v-btn
                v-for="link in links"
                :key="link.title"
                color="dark"
                :to="link.to"
                flat
        >
          <v-icon>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-flex xs12 py-3 text-xs-center>
          &copy;2018 — <strong>Jugemu</strong>
        </v-flex>
        <v-btn absolute dark fab buttom right color="pink" @click="scroll()">
          <v-icon>arrow_upward</v-icon>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'IRIアーカイブ',
        links: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'info', title: 'About Us', to: '/about' },
          { icon: 'contacts', title: 'Contact Us', to: '/contacts' }
        ]
      }
    },
    methods: {
      scroll: function () {
        scroll(0, 0)
      }
    }
  }
</script>

<style>

</style>
