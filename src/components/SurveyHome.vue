<template>
    <div class = "container" v-bind:style = '{textAlign: "center"}'>
        <h1>Survey Home</h1>
        <br />
        <div id = "main">
          You can try the <router-link tag = "a" to = "/survey/demo"><a>demo</a></router-link> or <router-link tag = "a" to = "/survey/questionaire"><a>questionaire</a>.</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'homesurvey'
  }
</script>

<style>
  .main {
    max-width: 600px;
    margin: 2em;
  }
</style>
