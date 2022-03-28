<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit" class="register-card">
      <div class="form-group">
        <label for="userName">
          <input type="text" v-model="user.userName" id="userName" name="userName" />Username
        </label>
        <div v-show="submitted && !userName" class="invalid-feedback">userName is required</div>
      </div>

      <div class="form-group">
        <label for="password">
          <input type="password" v-model="user.password" name="password" />Password</label
        >
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Register</button>
        |
        <router-link to="/login" class="btn btn-link">Login</router-link> |
        <router-link to="/" class="btn btn-link">Cancel</router-link>
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
      console.log(this.user.userName, this.user.password);
      if (this.user.userName !== undefined && this.user.password !== undefined) {
        this.register(this.user);
        console.log('Se llama a register');
      } else {
        console.log(
          `UserName (${this.user.userName}) o password (${this.user.password}) incorrecto`,
        );
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
  margin: 0;
  padding: 0;
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
