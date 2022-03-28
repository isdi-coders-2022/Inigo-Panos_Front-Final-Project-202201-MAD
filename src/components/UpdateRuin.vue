<template>
  <div>
    <h2>Modifique la ruina {{ this.payload?.ruin?.name }} con id {{ this.payload?.idRuina }}</h2>

    <form @submit.prevent="handleSubmit" v-if="ruinDetails">
      <div class="form-group">
        <li>Nombre: {{ ruinDetails?.name }}</li>
        <label for="name">
          <input type="text" id="name" v-model="ruinDetails.name" name="name" />
        </label>
      </div>

      <div class="form-group">
        <li>Localización: {{ ruinDetails?.location }}</li>

        <label for="location">
          <input type="location" v-model="ruinDetails.location" name="location"
        /></label>
      </div>

      <div class="form-group">
        <li>Descripción: {{ ruinDetails?.description }}</li>

        <label for="description">
          <input type="description" v-model="ruinDetails.description" name="description"
        /></label>
      </div>

      <div class="ruinImage">
        <li>Imagen</li>

        <img v-bind:src="ruinDetails?.images" alt="ruin" />
        <label for="images">
          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            name="images"
            placeholder="Imágenes"
        /></label>
      </div>

      <div class="form-group">
        <li>Puntuación: {{ ruinDetails?.score }}</li>

        <label for="score"> <input type="score" v-model="ruinDetails.score" name="score" /></label>
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

      this.modifyExistingRuin(this.payload);
    },
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData']),
  },

  mounted() {
    const route = useRoute();
    const { id } = route.params;

    console.log(id, 'id en updateruin');

    this.getRuinDetails(id);

    console.log('DATOS QUE HAY EN UPDATERUIN', this.ruinDetails);
  },
});
</script>

<style lang="scss">
.ruinImage {
  width: 95%;
  height: auto;
  margin: 0 auto;

  img {
    margin: 0 auto;
    width: 50%;
    height: 50%;
  }
}
</style>
