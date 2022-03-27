/* eslint-disable vue/no-parsing-error */
<template>
  <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |

    <router-link to="/ruins">List of Ruins</router-link> |

    <template v-if="this.$store?._state.data.account.status === {}">
      <button v-on:click="showState()">Hola mundo</button>

      <router-link to="/login">
        <img
          class="profile_image"
          src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
          alt="RomanBust"
      /></router-link>
    </template>
    <template v-else-if="this.$store?._state.data.account.status">
      <router-link to="/userData">
        <img
          class="profile_image"
          src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
          alt="RomanBust"
      /></router-link>
    </template>
  </nav>
  <router-view />
  <main></main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      idUser: '',
    };
  },

  computed: {
    ...mapGetters('account', ['userInfo', 'userData']),
  },

  mounted() {
    // console.log(localStorage.getItem('token'), ' token de local storage en app');
    // if (localStorage.getItem('token')) {
    //   const tokenUser = localStorage.getItem('token');
    //   this.loginWithToken(tokenUser);
    // }
  },

  methods: {
    ...mapActions('account', ['loginWithToken']),

    // showState() {
    //   console.log(this.$store._state.data.account.status, 'ESETADO EN APP');
    // },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Cinzel, sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  img {
    width: 100px;
    height: 100px;
  }
  .profile_image {
    width: 50px;
    height: 68px;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
