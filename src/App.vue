<template>
  <div id="app">

    <table>
      <tr>
        <th id="factoryContainer"><Factory :url="url"/></th>
        <th><Pattern/></th>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </table>
    <!--
    <v-main>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/factory">Factory</router-link> |
      </div>
      <router-view/>
    </v-main>
    -->
  </div>
</template>

<script>
import Factory from '@/components/Factory.vue'
import Pattern from '@/components/Pattern.vue'

export default {
  name: 'app',
  components: {
    Factory,
    Pattern    
  },
  data(){
    return {
      url: 'https://legaldbol.com/wp-content/uploads/2019/03/79-Best-Australian-Tax-Invoice-Template-No-Gst-in-Photoshop-for-Australian-Tax-Invoice-Template-No-Gst.jpg'
      //url: NaN
    }
  },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
table {
  border-collapse: collapse;
  width: 100%;
//  border: 1px solid #ddd;
}
th, td {
  text-align: left;
  padding: 16px;
}

</style>
