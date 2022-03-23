<template>
  <div>
    <h1>Detalles del usuario</h1>
  </div>
  <main>
    <h4>Bienvenido, user</h4>

    <ul v-if="this.userData">
      <li>Nombre: {{ this.userData.userName }}</li>
      <li>Favoritos: {{ this.userData.favorites }}</li>
      <li>Visitados: {{ this.userData.visited }}</li>
      <li>Comentarios: {{ this.userData.comments }}</li>
    </ul>
    <router-link @click="this.resetStorage()" to="/login" class="btn btn-link">Logout</router-link>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'user-data',

  data() {
    return {
      userName: '',
      favorites: [''],
      comments: [''],
      visited: [''],
    };
  },

  computed: {
    ...mapGetters('account', ['userInfo', 'userData']),
  },

  mounted() {
    if (localStorage.getItem('id') !== undefined) {
      let tokenUser = localStorage.getItem('id');
      tokenUser = JSON.parse(tokenUser);

      this.getUserData(tokenUser);
    } else {
      this.userData = {};
      console.log('Después del logout', this.userData);
    }
  },
  methods: {
    ...mapActions('account', ['getUserData', 'logout']),

    resetStorage() {
      this.userData = {};
      this.logout();
    },
  },
};
</script>
