/* eslint-disable no-underscore-dangle */
<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>

  <main>
    <ul v-if="this.ruinInfo">
      <li>Nombre: {{ ruinInfo.name }}</li>
      <li>Localización: {{ ruinInfo.location }}</li>
      <li>Imágenes: <img v-bind:src="ruinInfo.images" alt="" /></li>
      <li>Descripción: {{ ruinInfo.description }}</li>

      <template v-if="this.ruinDetails">
        Comentarios:
        <ul>
          <div v-for="comment in ruinDetails?.comments" :key="comment.text">
            <li>Autor: {{ comment?.author_id?.userName }} Comentario: {{ comment?.text }}</li>
            -- | --

            <!-- <p>{{ this.userData?.userFound?._id }} 1</p>
            <p>{{ this.userData?.userFound?.isAdmin }} 2</p> -->
            <p>{{ comment?.author_id?._id }} 3</p>

            <div
              v-if="
                this.userData?.userFound?.isAdmin &&
                comment?.author_id?._id === userData?.userFound?._id
              "
            >
              <button v-on:click="deleteRuinComment(comment?._id)">🗑</button>
            </div>
          </div>
        </ul>
      </template>

      <li>Score: {{ ruinInfo?.score }}</li>
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

    <div v-if="this.userData.isAdmin">
      <p>Soy admin</p>
      <!-- <button v-on:click="deleteRuinById()">🗑</button> -->
      |
      <router-link :to="`/ruinUpdate/${this.idRuina}`">
        <a>Actualizar datos</a>
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
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
        prueba: '',
      },
      newComment: '',
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails', 'listOfRuinsData']),
    ...mapGetters('account', ['userData']),
    ...mapState('ruins', ['allRuinsData']),
  },
  methods: {
    ...mapActions('ruins', [
      'getRuinDetails',
      'getAllRuins',
      'deleteRuin',
      'updateRuin',
      'addRuinToFavorites',
      'addRuinToVisited',
      'addCommentToRuin',
      'deleteCommentFromRuin',
    ]),
    ...mapActions('account', ['getUserData']),

    deleteRuinById() {
      this.deleteRuin(this.ruinInfo.idRuina);
    },

    ruinFavorites() {
      this.addRuinToFavorites(this.ruinInfo.idRuina);
    },

    ruinVisited() {
      this.addRuinToVisited(this.ruinInfo.idRuina);
    },

    deleteRuinComment(id: string) {
      console.log(this.ruinInfo, ' RUIN INFO POR FAVOR');
      const payloadComment = {
        ruinId: this.ruinInfo?._id,
        commentId: id,
      };

      console.log(this.ruinInfo);

      this.deleteCommentFromRuin(payloadComment);
      console.log('MANDADO A BORRAR EL COMENTARIO', payloadComment);

      //  this.$router.go(0);
    },

    handleSubmit() {
      let idUsuario = localStorage.getItem('id');
      idUsuario = JSON.parse(idUsuario as string);
      const payload = {
        author_id: idUsuario,
        // eslint-disable-next-line no-underscore-dangle
        ruin_id: this.ruinInfo._id,
        text: this.newComment,
      };
      console.log(payload);
      this.addCommentToRuin(payload);
    },
  },

  mounted() {
    console.log(this.userData?.userFound?.isAdmin, 'SI ES ADMIN EN RUIN DATA O NO');
    console.log(this.userData, 'ID DEL MINITO');
    console.log(
      // eslint-disable-next-line no-underscore-dangle
      this.ruinDetails?.comments[11],

      'SI ES AUTOR DEL COMENTARIO EN RUIN DATA O NO',
    );

    const route = useRoute();
    const { id } = route.params;
    this.getAllRuins();
    this.getRuinDetails(id);
    console.log(this.getRuinDetails(id));

    // this.ruinInfo.prueba = this.listOfRuinsData;
    // console.log(this.ruinInfo.prueba, 'PRUEBA listof');
    // eslint-disable-next-line no-underscore-dangle
    const foundRuin = this.listOfRuinsData?.find((e: any) => e._id === id);

    this.ruinInfo = foundRuin;
  },
});
</script>
