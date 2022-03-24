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
      <li>Comentarios: {{ ruinDetails.comments }}</li>
      <li>Score: {{ ruinDetails.score }}</li>
    </ul>

    <div v-if="isAdmin">
      <button v-on:click="deleteRuinById()">🗑</button>
      |
      <router-link :to="`/ruinUpdate/${this.idRuina}`">
        <a>Actualizar datos</a>
      </router-link>
    </div>
    <!-- <router-link @click="this.resetStorage()" to="/login" class="btn btn-link">Logout</router-link> -->
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
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData']),
  },
  methods: {
    ...mapActions('ruins', ['getRuinDetails', 'deleteRuin', 'updateRuin']),

    deleteRuinById() {
      console.log(1, this.idRuina);
      this.deleteRuin(this.idRuina);
      console.log('Se ha llamado a la acción borrar Ruina');
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
