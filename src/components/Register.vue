<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="userName">
          <input type="text" v-model="user.userName" id="userName" name="userName" />Username
        </label>
      </div>

      <div class="form-group">
        <label for="password">
          <input type="password" v-model="user.password" name="password" />Password</label
        >
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Register</button>
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        |
        <router-link to="/login" class="btn btn-link">Login</router-link> |
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'register-form',
  data() {
    return {
      user: {
        userName: '',
        password: '',
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit(e) {
      if (this.userName === undefined || this.password === undefined) {
        console.log('Error, ha introducido un valor incorrecto', this.userName, this.password);
      } else {
        this.submitted = true;
        this.register(this.user);
      }
    },
  },
};
</script>
