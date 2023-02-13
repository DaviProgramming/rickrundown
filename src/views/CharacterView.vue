<template>
  <main class="container search">

    <form action="return false">
        <div class="form-control">
          <input type="text" class="form-input" placeholder="Type a Character" v-model="lookSearch">
          <div class="input-options" v-if="searchResult != '' ">
                 <div class="option" v-bind:key="index" v-for="(character, index) in searchResult" v-on:click="redirectCharacter(character)">
                  {{ character.name }}
                 </div>
          </div>
         
        </div>
        <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>

    <div class="card">
      <div class="card-image">
        <img v-bind:src="image" alt="character" />
      </div>
      <div class="card-name">
        {{ name }}
      </div>
    </div>

    <div class="infos">
      <div class="info">
        <div class="left">Specie</div>
        <div class="right">
          {{ especie }}
        </div>
      </div>
      <div class="info">
        <div class="left">Origem</div>
        <div class="right">
          {{ origem.name }}
        </div>
      </div>
      <div class="info">
        <div class="left">Status</div>
        <div class="right">
          {{ status }}
        </div>
      </div>
      
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "CharacterView",

  data() {
    return {
      id: "",
      name: "",
      image: "",
      searchResult: "",
      status: "",
      especie: "",
      origem: "",
    };
  },

  methods: {
    async getInfos() {
      let response = await axios.get(
        "https://rickandmortyapi.com/api/character/" + this.id
      );
      this.image = response.data.image;
      this.name = response.data.name;
     
      this.status = response.data.status;
      this.especie = response.data.species;
      this.origem = response.data.origin;

      console.log(response.data);
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getInfos();
  },
};
</script>

<style>
</style>