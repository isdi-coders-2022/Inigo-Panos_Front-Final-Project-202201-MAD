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
        <!-- <p>{{ userData?.userFound?.comments }}</p> -->
        <li
          v-for="comment in userData?.userFound?.comments"
          :key="comment.text"
          class="userData_comment-card"
        >
          <router-link :to="`/ruinDetails/${comment?.ruin_id._id}`">
            Has comentado: <br />
            <span class="userData_comment-card__text">{{ comment.text }},</span> <br />
            en la ruina <span class="userData_comment-card__name">{{ comment.ruin_id.name }}</span>
          </router-link>
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
.userData_comment-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  &__text {
    font-weight: bold;
  }
  &__name {
    font-weight: bold;
  }
}
</style>
