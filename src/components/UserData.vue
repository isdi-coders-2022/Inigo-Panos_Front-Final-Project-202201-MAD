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
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters, useStore } from 'vuex';

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
    console.log(this.userInfo.userId, ' userid en UserData');
    this.getUserData(this.userInfo.userId);

    console.log('Datos del usuario: ', this.userData);
  },
  methods: {
    ...mapActions('account', ['getUserData']),
  },
};
</script>
