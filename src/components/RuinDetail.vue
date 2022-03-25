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
      <ul>
        <div v-for="comment in ruinDetails.comments" :key="comment.text">
          <li>
            {{ comment.text }}
          </li>
          |
          <div v-if="isAdmin && comment.author_id._id === userInfo.userId">
            <button v-on:click="deleteRuinComment(comment._id)">🗑</button>
          </div>
        </div>
      </ul>

      <li>Score: {{ ruinDetails.score }}</li>
    </ul>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="comment">
          <input type="comment" v-model="this.newComment" name="comment" /> |
          <button type="button" v-on:click="handleSubmit">Enviar comentario</button>
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
      isAuthor: false,
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
      'deleteCommentFromRuin',
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

    deleteRuinComment(id: string) {
      console.log(id, ' id del comentario a borrar');

      const payloadComment = {
        ruinId: this.idRuina,
        commentId: id,
      };

      this.deleteCommentFromRuin(payloadComment);
      console.log('Se ha pasado: ', payloadComment);
      this.$router.go(0);
    },

    handleSubmit() {
      console.log(this.userInfo, 'this.userInfo en ruinDetails');

      const payload = {
        author_id: this.userInfo.userId,
        ruin_id: this.idRuina,
        text: this.newComment,
      };
      console.log(payload, 'PAYLOAD');
      this.addCommentToRuin(payload);
      this.$router.go(0);
    },
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.idRuina = id as string;

    console.log(this.userData, 'data de USUARIO EN RUIN DETAILS');
    if (this.userData?.isAdmin) {
      this.isAdmin = true;
    }

    this.getRuinDetails(id);
    // console.log('Se ha llamado a getRuinDetails con la id: ', id);
  },
});
</script>
