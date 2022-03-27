/* eslint-disable vue/no-parsing-error */
<template>
  <body>
    <div ref="" class="app-template">
      <nav>
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
      <footer>Hola soy un footer</footer>
    </div>
  </body>
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
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style-type: none;
}
#app {
  width: 100%;
  height: 100%;

  position: relative;
  nav {
    display: flex;
    justify-content: center;

    a {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
  body {
    position: relative;
  }

  body::before {
    content: '';
    background-image: url(https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/hanibal.png?alt=media&token=c2abda80-0fe9-4296-ac1a-00a0a2fd37cc);
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: -1;
    opacity: 0.25;
  }

  footer {
    display: flex;
    margin-top: 15px;
    justify-content: center;
  }

  font-family: Cinzel, sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

  .img.ruin {
    width: 100px;
    height: 100px;
  }

  .profile_image {
    width: 50px;
    height: 68px;
  }

  .ruin-details__comment-card-container__div__image {
    width: 15px;
    height: 15px;
    margin: 1px;
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
