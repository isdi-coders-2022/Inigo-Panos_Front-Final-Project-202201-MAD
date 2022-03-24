<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>
  <main>
    <ul v-if="ruinDetails">
      <li>Nombre: {{ ruinDetails.name }}</li>
      <li>Localización: {{ ruinDetails.location }}</li>
      <li>Imágenes: {{ ruinDetails.images }}</li>
      <li>Descripción: {{ ruinDetails.description }}</li>
      Comentarios:
      <li v-for="comment in ruinDetails.comments" :key="comment.text">
        {{ comment.text }}
      </li>
      <li>Score: {{ ruinDetails.score }}</li>
    </ul>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="comment">
          <input type="comment" v-model="this.newComment" name="comment" />{{ ruinDetails }}:
        </label>
      </div>
    </form>

    <div>| <button v-on:click="ruinFavorites()">❤</button> |</div>
    <div>| <button v-on:click="ruinVisited()">📍</button> |</div>

    <div v-if="isAdmin">
      <button v-on:click="deleteRuinById()">🗑</button>
      |
      <router-link :to="`/ruinUpdate/${this.idRuina}`">
        <a>Actualizar datos</a>
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ruin-data',

  data() {
    return {
      id: '',
      name: '',
      location: '',
      description: '',
      images: '',
      score: '',
      comments: [],
      isAdmin: false,
      idRuina: '',
      newComment: '',
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData', 'userInfo']),
  },
  methods: {
    ...mapActions('ruins', [
      'getRuinDetails',
      'deleteRuin',
      'updateRuin',
      'addRuinToFavorites',
      'addRuinToVisited',
      'addCommentToRuin',
    ]),

    deleteRuinById() {
      console.log(this.idRuina);
      this.deleteRuin(this.idRuina);
      console.log('Se ha llamado a la acción borrar Ruina');
    },

    ruinFavorites() {
      this.addRuinToFavorites(this.idRuina);
      console.log('Se llama a favoritos');
    },

    ruinVisited() {
      this.addRuinToVisited(this.idRuina);
      console.log('Se llama a visitados');
    },

    handleSubmit() {
      console.log(this.newComment);
      console.log(this.userInfo, 'this.UserData en ruinDetails');

      const payload = {
        author_id: this.userInfo.userId,
        ruin_id: this.idRuina,
        text: this.newComment,
      };
      console.log(payload, 'PAYLOAD');
      this.addCommentToRuin(payload);
    },
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.idRuina = id as string;

    console.log(this.userData, 'info de USUARIO EN RUIN DETAILS');
    if (this.userData.isAdmin) {
      this.isAdmin = true;
    }

    this.getRuinDetails(id);
    console.log('Se ha llamado a getRuinDetails con la id: ', id);
  },
});
</script>
