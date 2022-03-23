<template>
  <div>
    <h1>Lista de ruinas</h1>
  </div>
  <main>
    <ul v-if="this.listOfRuinsData">
      <li v-for="ruin in listOfRuinsData" :key="ruin._id">
        {{ ruin.name }}
      </li>
    </ul>

    <router-link to="/login" class="btn btn-link">Logout</router-link>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ruins-list',

  data() {
    return {
      name: '',
    };
  },

  computed: {
    ...mapGetters('ruins', ['listOfRuinsData']),
  },

  mounted() {
    this.getAllRuins();
    console.log(this.listOfRuinsData, 'ALLRUINSDATA EN RUINS LIST');
  },

  methods: {
    ...mapActions('ruins', ['getAllRuins']),
  },
};
</script>
