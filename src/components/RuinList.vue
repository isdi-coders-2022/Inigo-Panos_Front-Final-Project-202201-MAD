<template>
  <div>
    <h1>Lista de ruinas</h1>
  </div>
  <main>
    <ul v-if="listOfRuinsData">
      <li v-for="ruin in listOfRuinsData" :key="ruin._id">
        <div class="ruin-list__card">
          <router-link :to="`/ruinDetails/${ruin._id}`">
            <a>{{ ruin.name }}</a>
          </router-link>
        </div>
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
<style lang="scss">
ul {
  list-style-type: none;
}

.ruin-list__card {
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-right: 2rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  & :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  & :focus {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
