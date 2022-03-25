<template>
  <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/ruins">List of Ruins</router-link> |
    <router-link to="/userData" v-on="reset - id - event">Detalles de usuario</router-link> |
    <router-link to="/addRuin">Add new ruin</router-link> |
    <!-- <router-link to="/ruinDetails">Ruin Details</router-link> |
    <router-link to="/ruinUpdate">Update Ruin</router-link> | -->
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
    console.log('App llamando a tierra');
    if (localStorage.getItem('token')) {
      const tokenUser = localStorage.getItem('token');
      console.log('TOKEN USER COGIDO EN APP', tokenUser);

      // tokenUser = JSON.parse(tokenUser);

      console.log('Llamado en App.vue');
      this.loginWithToken(tokenUser);
    }
  },

  methods: {
    ...mapActions('account', ['loginWithToken']),
  },
  // methods() {
  //   let idUser = localStorage.getItem('id');
  //   console.log(idUser, ' id del usuario en local storage');
  //   idUser = JSON.parse(idUser);
  //   console.log(idUser, ' en App.vue para ocultar detalles del usuario');
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
