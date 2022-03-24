<template>
  <div>
    <h2>Modifique la ruina {{ this.payload.idRuina }}</h2>
    <p>{{ this.ruinDetails }}</p>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <li>Nombre: {{ ruinDetails.name }}</li>
        <label for="name">
          <input
            type="text"
            id="name"
            v-model="ruinDetails.name"
            name="name"
            placeholder="{{ ruinDetails.name }}"
          />
        </label>
      </div>

      <div class="form-group">
        <li>Localización: {{ ruinDetails.location }}</li>

        <label for="location">
          <input
            type="location"
            v-model="ruinDetails.location"
            name="location"
            placeholder="`${{ ruinDetails.location }}`"
        /></label>
      </div>

      <div class="form-group">
        <li>Descripción: {{ ruinDetails.description }}</li>

        <label for="description">
          <input
            type="description"
            v-model="ruinDetails.description"
            name="description"
            placeholder="{{ ruinDetails.description }}"
        /></label>
      </div>

      <div class="form-group">
        <li>Imágenes: {{ ruinDetails.images }}</li>

        <label for="images">
          <input
            type="images"
            v-model="ruinDetails.images"
            name="images"
            placeholder="{{ ruinDetails.images }}"
        /></label>
      </div>

      <div class="form-group">
        <li>Puntuación: {{ ruinDetails.score }}</li>

        <label for="score">
          <input
            type="score"
            v-model="ruinDetails.score"
            name="score"
            placeholder="{{ ruinDetails.score }}"
        /></label>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Actualizar</button>
        |
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'update-form',
  data() {
    return {
      payload: {
        ruin: {
          name: '',
          location: '',
          description: '',
          images: [],
          score: 5,
        },
        idRuina: '',
      },

      isAdmin: false,
      id: '',
      submitted: false,
    };
  },

  methods: {
    ...mapActions('ruins', ['modifyExistingRuin', 'getRuinDetails']),

    handleSubmit() {
      this.submitted = true;
      this.payload.ruin = this.ruinDetails;

      console.log(this.payload, 'PAYLOAD EN UPDATERUIN');

      this.modifyExistingRuin(this.payload);
      console.log('Se llama a createNewRuin desde el componente CreateRuin.vue');
    },
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData']),
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.payload.idRuina = id as string;

    this.getRuinDetails(id);

    console.log('DATOS QUE HAY EN UPDATERUIN', this.ruinDetails);
  },
});
</script>
