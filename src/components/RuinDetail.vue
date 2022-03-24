<template>
  <div>
    <h1>Detalles de la ruina</h1>
  </div>
  <main>
    <ul v-if="this.ruinDetails">
      <li>Nombre: {{ this.ruinDetails.name }}</li>
      <li>Localización: {{ this.ruinDetails.location }}</li>
      <li>Imágenes: {{ this.ruinDetails.images }}</li>
      <li>Descripción: {{ this.ruinDetails.description }}</li>
      <li>Comentarios: {{ this.ruinDetails.comments }}</li>
      <li>Score: {{ this.ruinDetails.score }}</li>
    </ul>
    <!-- <router-link @click="this.resetStorage()" to="/login" class="btn btn-link">Logout</router-link> -->
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'user-data',

  data() {
    return {
      id: '',
      name: '',
      location: '',
      description: '',
      images: '',
      score: '',
      comments: [],
    };
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;

    this.getRuinDetails(id);
    console.log('Se ha llamado a getRuinDetails con la id: ', id);
  },

  methods: {
    ...mapActions('ruins', ['getRuinDetails']),

    resetStorage() {
      this.userData = {};
      this.logout();
    },
  },
});
</script>
