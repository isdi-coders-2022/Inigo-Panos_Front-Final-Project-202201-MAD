<template>
  <div>
    <h2>Añada una nueva localización</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name"> <input type="text" id="name" name="name" placeholder="Nombre" /> </label>
        <!-- <div v-show="submitted && !name" class="invalid-feedback">
          Es necesario que introduzca un nombre
        </div> -->
      </div>

      <div class="form-group">
        <label for="location">
          <input type="location" name="location" placeholder="Localización"
        /></label>
        <!-- <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca una localización
        </div> -->
      </div>

      <div class="form-group">
        <label for="description">
          <input type="description" name="description" placeholder="Descripción"
        /></label>
        <!-- <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca una descripción
        </div> -->
      </div>

      <div class="form-group">
        <label for="images"> <input type="images" name="images" placeholder="Imágenes" /></label>
        <!-- <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca al menos una imagen
        </div> -->
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Añadir</button>
        |
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';

export default {
  name: 'register-form',
  data() {
    return {
      ruin: {
        name: '',
        location: '',
        description: '',
        images: [],
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit() {
      this.submitted = true;
    },
  },
};
</script>
