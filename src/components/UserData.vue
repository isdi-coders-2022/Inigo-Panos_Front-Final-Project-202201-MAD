<template>
  <div>
    <h1>Detalles del usuario</h1>
  </div>
  <main>
    <h4>Bienvenido, user</h4>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters, useStore } from 'vuex';

export default {
  name: 'user-data',

  data() {
    return {
      userName: '',
      favorites: [''],
      comments: [''],
      visited: [''],
    };
  },

  computed: {
    ...mapGetters('account', ['userInfo']),
  },

  mounted() {
    console.log(this.userInfo.userId, ' userid en UserData');
    this.getUserData(this.userInfo.userId);
  },
  methods: {
    ...mapActions('account', ['getUserData']),
  },
};
</script>
