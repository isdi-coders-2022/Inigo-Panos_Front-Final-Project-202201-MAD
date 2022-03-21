<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="userName">
          <input
            type="text"
            v-model="user.userName"
            id="userName"
            v-validate="'required'"
            name="userName"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('userName') }"
          />First Name
        </label>
        <div v-if="submitted && errors.has('userName')" class="invalid-feedback">
          {{ errors.first('userName') }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">
          <input
            type="password"
            v-model="user.password"
            v-validate="{ required: true, min: 6 }"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('password') }"
          />Password</label
        >

        <div v-if="submitted && errors.has('password')" class="invalid-feedback">
          {{ errors.first('password') }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.registering">Register</button>
        <img alt="imageRegister" v-show="status.registering" src="" />
        <router-link to="/login" class="btn btn-link">Cancel</router-link>
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
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.register(this.user);
        }
      });
    },
  },
};
</script>
