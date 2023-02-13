<template>
  <main class="container start">
    <div class="title">
        <h2>Rick and Morty Rundown</h2> 
        <h3>Find your favorites rick and morty characters</h3>
    </div>

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

    

    



  </main>
</template>

<script>
import axios from 'axios';

export default {

  name: "HomeView",

  data(){
    return{
      characters: [],
      searchResult: "",
      lookSearch: "",
    }
  },

  methods:{
    async getData(){
      let res = await axios.get("https://rickandmortyapi.com/api/character/");
      let numberPages = res.data.info.pages;

      for(let i = 0; i < numberPages; i++){
        let newRes = await axios.get("https://rickandmortyapi.com/api/character/?page=" + i);
        newRes.data.results.map(character => this.characters.push(character));
      }
      
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

  watch:{
      lookSearch(newValue){
        console.log(newValue)
        this.getSearchWatch(newValue);
      }
  },

  created(){
    this.getData();
  }




}
</script>

