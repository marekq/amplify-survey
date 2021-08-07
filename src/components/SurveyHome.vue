
<template>
    <center>
        <h1>Survey Home</h1>
        <br />
        <div id = "main">
          You can visit a demo survey <router-link tag = "a" to = "/survey/demo"><a>here</a></router-link> or <router-link tag = "a" to = "/survey/questionaire"><a>here</a>.</router-link>
        </div>
    </center>
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
