<template>
  <div>
    <h1>Detalles del usuario</h1>
  </div>
  <main>
    <ul v-if="userData">
      <li>
        <h3>Nombre: {{ userData?.userFound?.userName }}</h3>
      </li>
      <p>Favoritos:</p>
      <li v-for="favorite in userData.userFound?.favorites" :key="favorite.name">
        <router-link :to="`/ruinDetails/${favorite._id}`">
          <a class="favorite-name">{{ favorite.name }}</a>
        </router-link>
      </li>
      <p>Visitados:</p>
      <li v-for="visited in userData?.userFound?.visited" :key="visited.name">
        <router-link :to="`/ruinDetails/${visited._id}`">
          <a class="visited-name">{{ visited.name }}</a>
        </router-link>
      </li>
      <p>Comentarios:</p>
      <ul>
        <!-- <li>Comentarios: {{ userData.comments }}</li> -->
        <li
          v-for="comment in userData?.userFound?.comments"
          :key="comment.text"
          class="comment-text"
        >
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
  },
  methods: {
    ...mapActions('account', ['getUserData', 'logout']),

    resetStorage() {
      this.userData = {};
      if (localStorage.getItem('token') !== '') {
        localStorage.setItem('token', '');
        console.log('Deslogeado con éxito!');
      }

      this.logout();
    },
  },
});
</script>
