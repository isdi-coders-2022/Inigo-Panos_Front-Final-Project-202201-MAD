/* eslint-disable vue/no-parsing-error */
<template>
  <body>
    <div ref="" class="app-template">
      <nav>
        <router-link to="/ruins">List de ruinas</router-link> |
        <router-link to="/addRuin">Crear Ruinas</router-link>
        <div v-if="this.userLoggedStatus?.loggedIn === true">
          <router-link to="/userData">
            <img
              class="profile_image"
              src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
              alt="RomanBust"
          /></router-link>
        </div>
        <div v-else>
          <button v-on:click="logOutUser()">
            <router-link to="/login">
              <img
                class="profile_image"
                src="https://vignette.wikia.nocookie.net/spqr-series/images/1/17/Augustus.png/revision/latest?cb=20140205212909"
                alt="RomanBust"
            /></router-link>
          </button>
        </div>
      </nav>

      <router-view />
      <main></main>
      <footer>Hola soy un footer</footer>
    </div>
  </body>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      idUser: '',
    };
  },

  computed: {
    ...mapState('account', ['']),
    ...mapGetters('account', ['userInfo', 'userData', 'userLoggedStatus']),
  },

  methods: {
    ...mapActions('account', ['loginWithToken', 'logout']),

    logOutUser() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style-type: none;
}
#app {
  width: 100%;
  min-height: 100%;

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
