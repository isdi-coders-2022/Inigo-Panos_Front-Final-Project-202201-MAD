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
        <li
          v-for="comment in userData?.userFound?.comments"
          :key="comment.text"
          class="comment-text"
        >
          Has comentado: <span class="userData_comment__text">{{ comment.text }}</span
          >, en la ruina <span class="userData_comment__name">{{ comment.ruin_id.name }}</span>
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
    ...mapGetters('account', ['userData']),
  },

  mounted() {
    console.log('MOUNTTTTTTTTTTTTTING');
    console.log(this.userData, 'userData en UserData');
    if (localStorage.getItem('token')) {
      const tokenUser = localStorage.getItem('token');
      this.loginWithToken(tokenUser);
    }
  },
  methods: {
    ...mapActions('account', ['loginWithToken', 'logout']),

    resetStorage() {
      this.userData = {};
      if (localStorage.getItem('token') !== '') {
        localStorage.removeItem('token');
        console.log('Deslogeado con éxito!');
      }

      this.logout();
    },
  },
});
</script>

<style lang="scss">
.userData_comment__text {
  font-weight: bold;
}
.userData_comment__name {
  font-weight: bold;
}
</style>
