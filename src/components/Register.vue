<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit" class="register-card">
      <div class="form-group">
        <label for="userName">
          <input type="text" v-model="user.userName" id="userName" name="userName" />Nombre de
          usuario
        </label>
        <div v-show="submitted && !userName" class="invalid-feedback">Campo requerido</div>
      </div>

      <div class="form-group">
        <label for="password">
          <input type="password" v-model="user.password" name="password" />Contraseña</label
        >
        <div v-show="submitted && !password" class="invalid-feedback">Campo requerido</div>
      </div>

      <div class="form-group">
        <label for="isAdmin">
          <input type="text" v-model="user.isAdmin" id="isAdmin" name="isAdmin" />Administrador
        </label>
        <div v-show="submitted && !isAdmin" class="invalid-feedback">Campo requerido</div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Registro</button>
        |
        <router-link to="/login" class="btn btn-link">Login</router-link> |
        <router-link to="/" class="btn btn-link">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'register-form',
  data() {
    return {
      user: {
        userName: '',
        password: '',
        isAdmin: false,
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
      if (this.user.userName !== undefined && this.user.password !== undefined) {
        this.register(this.user);
      }
    },
  },
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  text-decoration: none;
  list-style-type: none;
  // width: 100%;
  // height: 100%;
}

.register-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
