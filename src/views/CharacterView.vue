<template>
  <main class="container search">

    <router-link to="/">

    <div class="title">
        <h2>Rick and Morty Rundown</h2> 
    </div>

    </router-link>

    <form action="return false">
        <div class="form-control">
          <input type="text" class="form-input" placeholder="Type a Character" v-model="lookSearchs">
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
        <div class="left">species</div>
        <div class="right">
          {{ especie }}
        </div>
      </div>
      <div class="info">
        <div class="left">origin</div>
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

      characters: [],
      lookSearchs: "",
    };
  },

  methods: {
    async getData(){
      let res = await axios.get("https://rickandmortyapi.com/api/character/");
      let numberPages = res.data.info.pages;

      for(let i = 0; i < numberPages; i++){
        let newRes = await axios.get("https://rickandmortyapi.com/api/character/?page=" + i);
        newRes.data.results.map(character => this.characters.push(character));
        
      }
      
    },
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

    getSearchWatch(value){
      
      let option = [];
  
      this.characters.forEach((character) => {
       
        if(character.name.toLowerCase().includes(value.toLowerCase())){
          option.push(character);
        }
        else{
          return;
        }
      })

     this.searchResult = option;

    },

    redirectCharacter(character){
      window.location.href = "/character/" + character.id;
    }

    
    
  },

  async mounted() {
    this.id = this.$route.params.id;
    await this.getInfos();
    await this.getData();
  },

  watch:{
      lookSearchs(newValue){
        console.log(newValue)
        this.getSearchWatch(newValue);
      }
  },
};
</script>

<style>
</style>