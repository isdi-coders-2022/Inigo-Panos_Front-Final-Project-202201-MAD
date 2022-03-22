<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="userName">
          <input
            type="text"
            id="userName"
            v-model="userName"
            name="userName"
            class="form-control"
            :class="{ 'is-invalid': submitted && !userName }"
          />userName</label
        >
        <div v-show="submitted && !userName" class="invalid-feedback">userName is required</div>
      </div>
      <div class="form-group">
        <label for="password">
          <input
            id="password"
            type="password"
            v-model="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />Password
        </label>
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Login</button>
        <!-- v-if="!isLoggedIn" to="/login"><button>Login</button> -->

        <router-link to="/register" class="btn btn-link">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login-form',
  data() {
    return {
      userName: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit(e) {
      this.submitted = true;
      const { userName, password } = this;
      if (userName && password) {
        this.login({ userName, password });
        console.log('this.login 1');
      }
    },
  },
};
</script>
