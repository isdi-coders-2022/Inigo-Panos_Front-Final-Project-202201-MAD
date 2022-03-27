/* eslint-disable no-underscore-dangle */
<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>

  <main>
    <ul v-if="this.ruinInfo">
      <!-- <p>{{ ruinInfo?._id }}</p> -->
      <li><span class="bold">Nombre:</span> {{ ruinInfo?.name }}</li>
      <li><span class="bold">Localización:</span> {{ ruinInfo?.location }}</li>
      <li class="ruinImage">
        <span class="bold">Imágenes:</span>
        <img v-bind:src="ruinInfo?.images" alt="" />
      </li>
      <li><span class="bold">Descripción:</span> {{ ruinInfo?.description }}</li>

      <template v-if="this.ruinDetails">
        <span class="bold"> Comentarios:</span>
        <ul class="ruin-details__comment-card-container">
          <div
            v-for="comment in ruinDetails?.comments"
            :key="comment.text"
            class="ruin-details__comment-card-container__div"
          >
            <li class="ruin-details__comment-card-container__div__userName">
              <img
                class="ruin-details__comment-card-container__div__image"
                src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/user%20(2).png?alt=media&token=fde454b9-e3e9-474e-aced-4f12108acc91"
                alt="user icon"
              />
              {{ comment?.author_id?.userName }} :
            </li>
            <li>
              <img
                class="ruin-details__comment-card-container__div__image"
                src="https://firebasestorage.googleapis.com/v0/b/inig-panos-pfinal.appspot.com/o/comment%20(1).png?alt=media&token=4aaba2c6-e20c-4f14-ac25-37184a4a478c"
                alt=""
              />
              {{ comment?.text }}
            </li>
            -- | --

            <div v-if="comment?.author_id?._id === userData?.userFound?._id">
              <button v-on:click="deleteRuinComment(comment?._id)">🗑</button>
            </div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="comment">
                <input type="comment" v-model="this.newComment" name="comment" /> |
                <button type="button" v-on:click="handleSubmit">Enviar comentario</button>
              </label>
            </div>
          </form>
        </ul>
      </template>

      <li>Score: {{ ruinInfo?.score }}</li>
    </ul>

    <div>| <button v-on:click="ruinFavorites()">❤</button> |</div>
    <div>| <button v-on:click="ruinVisited()">📍</button> |</div>

    <div v-if="this.userData?.isAdmin">
      <p>Soy admin</p>
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
      this.deleteRuin(this.ruinInfo._id);
    },

    ruinFavorites() {
      this.addRuinToFavorites(this.ruinInfo._id);
      console.log(this.ruinInfo._id, ' mandado a fruinFavorites desde <ruinDetails></ruinDetails>');
    },

    ruinVisited() {
      this.addRuinToVisited(this.ruinInfo._id);
      console.log(this.ruinInfo._id, ' mandado a fruinFavorites desde <ruinDetails></ruinDetails>');
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
      this.ruinDetails?.comments[11],

      'SI ES AUTOR DEL COMENTARIO EN RUIN DATA O NO',
    );

    const route = useRoute();
    const { id } = route.params;
    this.getAllRuins();
    this.getRuinDetails(id);
    console.log(this.getRuinDetails(id));

    const foundRuin = this.listOfRuinsData?.find((e: any) => e._id === id);

    this.ruinInfo = foundRuin;
  },
});
</script>
<style lang="scss">
h1 {
  font-size: 25px;
  margin: 0 auto;
  text-align: center;
}
.bold {
  font-weight: bold;
}
.ruinImage {
  width: 95%;
  height: auto;
  margin: 0 auto;

  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
.ruin-details {
  &__comment-card-container {
    background-color: rgb(165, 158, 158);

    width: 90%;
    margin: 10px auto;
    padding-top: 3rem;
    padding-bottom: 3rem;

    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &__div {
      background-color: rgb(197, 188, 188);
      border-color: black 10px;

      padding: 0.5rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      width: 90%;
      margin: 0 auto;
      margin-bottom: 1rem;
      &__userName {
        font-weight: bold;
      }

      &__image {
        height: 15px;
        width: 15px;
      }
    }
  }
}
</style>
