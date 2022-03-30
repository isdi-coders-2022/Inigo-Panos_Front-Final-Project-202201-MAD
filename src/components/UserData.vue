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
      <p v-if="userData?.userFound?.comments.length > 0">Comentarios:</p>
      <ul>
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
      <router-link @click="this.resetStorage()" to="/login" class="btn btn-link logout"
        >Logout</router-link
      >
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

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
    ...mapState(['state']),
  },

  mounted() {
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
      }
      this.logout();
    },
  },
});
</script>

<style lang="scss">
.logout {
  margin-top: 2rem;
}
ul {
  margin-top: 2rem;
  p {
    margin-top: 1rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
}
</style>
