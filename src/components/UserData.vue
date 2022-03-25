<template>
  <div>
    <h1>Detalles del usuario</h1>
  </div>
  <main>
    <h4>Bienvenido, user</h4>

    <ul v-if="userData">
      <li>Nombre: {{ userData.userFound.userName }}</li>
      <li>Favoritos: {{ userData.userFound.favorites }}</li>
      <li>Visitados: {{ userData.userFound.visited }}</li>
      <p>Comentarios:</p>
      <ul>
        <!-- <li>Comentarios: {{ userData.comments }}</li> -->
        <li v-for="comment in userData.userFound.comments" :key="comment.text">
          {{ comment.text }}
        </li>
      </ul>
    </ul>
    <router-link @click="this.resetStorage()" to="/login" class="btn btn-link">Logout</router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
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
    console.log('MOUNTTTTTTTTTTTTTING');
    // if (localStorage.getItem('token') !== undefined) {
    // const tokenUser = localStorage.getItem('token');
    //   if (tokenUser) {
    //     tokenUser = JSON.parse(tokenUser);
    //   }
    //   console.log(tokenUser, ' TOKEN USER si existe en UsreData');
    // this.getUserData(tokenUser);
    // }
    // } else {
    //   this.userData = {};
    //   console.log('Después del logout', this.userData);
    // }
  },
  methods: {
    ...mapActions('account', ['getUserData', 'logout']),

    resetStorage() {
      this.userData = {};
      this.logout();
    },
  },
});
</script>
