<template>
  <div>
    <h2>Añada una nueva localización</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">
          <input type="text" id="name" v-model="ruin.name" name="name" placeholder="Nombre" />
        </label>
        <div v-show="submitted && !name" class="invalid-feedback">
          Es necesario que introduzca un nombre
        </div>
      </div>

      <div class="form-group">
        <label for="location">
          <input type="location" v-model="ruin.location" name="location" placeholder="Localización"
        /></label>
        <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca una localización
        </div>
      </div>

      <div class="form-group">
        <label for="description">
          <input
            type="description"
            v-model="ruin.description"
            name="description"
            placeholder="Descripción"
        /></label>
        <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca una descripción
        </div>
      </div>

      <div class="form-group">
        <label for="images">
          <input type="images" v-model="ruin.images" name="images" placeholder="Imágenes"
        /></label>
        <div v-show="submitted && !password" class="invalid-feedback">
          Es necesario que introduzca al menos una imagen
        </div>
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
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'register-form',
  data() {
    return {
      ruin: {
        id: '',
        name: '',
        location: '',
        description: '',
        images: [],
        comments: [],
        score: 0,
      },
      isAdmin: false,
      id: '',
      idRuina: '',
      submitted: false,
    };
  },

  methods: {
    ...mapActions('ruins', ['createNewRuin']),

    handleSubmit() {
      this.submitted = true;
      console.log(this.ruin, ' creado en CreateRuin');

      if (
        (this.ruin.name && this.ruin.location && this.ruin.description && this.ruin.images) !==
        undefined
      ) {
        this.createNewRuin(this.ruin);
        console.log('Se llama a createNewRuin desde el componente CreateRuin.vue');
      } else {
        console.log(`Algún campo no está rellenado`);
      }
    },
  },

  computed: {
    ...mapGetters('ruins', ['ruinDetails']),
    ...mapGetters('account', ['userData']),
  },

  mounted() {
    if (this.userData.isAdmin) {
      this.isAdmin = true;
    }

    const route = useRoute();
    const { id } = route.params;
    this.idRuina = id as string;

    console.log(this.userData, 'info de USUARIO EN RUIN DETAILS');
  },
});
</script>
