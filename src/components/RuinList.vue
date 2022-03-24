<template>
  <div>
    <h1>Lista de ruinas</h1>
  </div>
  <main>
    <ul v-if="listOfRuinsData">
      <li v-for="ruin in listOfRuinsData" :key="ruin._id">
        <router-link :to="`/ruinDetails/${ruin._id}`">
          <a>{{ ruin.name }}</a>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
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
});
</script>
