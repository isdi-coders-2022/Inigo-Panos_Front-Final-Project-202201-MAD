<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>
  <main>
    <ul v-if="ruinInfo">
      <li>Nombre: {{ ruinInfo.name }}</li>
      <li>Localización: {{ ruinInfo.location }}</li>
      <li>Imágenes: {{ ruinInfo.images }}</li>
      <li>Descripción: {{ ruinInfo.description }}</li>
      <template v-if="ruinDetails">
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
      </template>

      <li>Score: {{ ruinInfo.score }}</li>
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
      ruinInfo: {
        _id: '',
        name: '',
        location: '',
        description: '',
        images: '',
        score: '',
        comments: [],
        isAdmin: false,
        isAuthor: false,
        idRuina: '',
      },
      newComment: '',
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails', 'listOfRuinsData']),
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
    ...mapActions('account', ['getUserData']),

    deleteRuinById() {
      console.log(this.ruinInfo.idRuina);
      this.deleteRuin(this.ruinInfo.idRuina);
      console.log('Se ha llamado a la acción borrar Ruina');
    },

    ruinFavorites() {
      this.addRuinToFavorites(this.ruinInfo.idRuina);
      console.log('Se llama a favoritos');
    },

    ruinVisited() {
      this.addRuinToVisited(this.ruinInfo.idRuina);
      console.log('Se llama a visitados');
    },

    deleteRuinComment(id: string) {
      console.log(id, ' id del comentario a borrar');

      const payloadComment = {
        ruinId: this.ruinInfo.idRuina,
        commentId: id,
      };

      this.deleteCommentFromRuin(payloadComment);
      console.log('Se ha pasado: ', payloadComment);
      this.$router.go(0);
      console.log(this.userInfo, 'this.userInfo en ruinDetails');
    },

    handleSubmit() {
      // console.log(this.userInfo, 'this.userInfo en ruinDetails');

      const payload = {
        author_id: this.userInfo.userId,
        // eslint-disable-next-line no-underscore-dangle
        ruin_id: this.ruinInfo._id,
        text: this.newComment,
      };
      console.log(this.userInfo.userId);
      console.log(payload, 'PAYLOAD');
      this.addCommentToRuin(payload);

      // this.$router.go(0);
    },
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    // this.idRuina = id as string;
    this.getRuinDetails(id);

    // eslint-disable-next-line no-underscore-dangle
    const foundRuin = this.listOfRuinsData.find((e: any) => e._id === id);
    this.ruinInfo = foundRuin;

    console.log(this.userData, 'userData de USUARIO EN RUIN DETAILS');
    if (this.userData?.isAdmin) {
      this.ruinInfo.isAdmin = true;
    }

    // console.log('Se ha llamado a getRuinDetails con la id: ', id);
  },
});
</script>
