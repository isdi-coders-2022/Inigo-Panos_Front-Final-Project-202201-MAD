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
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-right: 2rem;
  margin-left: 2rem;
  // margin: 3rem, 2rem, 3rem, 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: rgba(243, 208, 208, 1);
  opacity: 0.8;

  border-radius: 50px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  & :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  & :focus {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  text-decoration: none;
  font-size: 30px;
  text-align: center;
}
</style>
