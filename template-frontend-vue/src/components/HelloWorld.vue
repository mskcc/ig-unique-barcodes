<template>
  <div class="hello">{{ quote }}{{ author }}{{ fact }}</div>
</template>

<script>
const axios = require('axios');
import { API_URL } from './../../config.js';

export default {
  name: 'HelloWorld',
  props: {},
  data: function() {
    return { author: null, quote: null, fact: null };
  },
  mounted() {
    axios
      .get(`${API_URL}/quote`)
      .then((response) => {
        console.log(response);
        this.author = response.data.data.author;
        this.quote = response.data.data.quote;
      })
      .catch((error) => console.log(error));
    axios.get(`${API_URL}/quote/cat`).then((response) => {
      console.log(response);
      this.fact = response.data.data.fact;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
