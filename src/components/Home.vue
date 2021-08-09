
<template>
    <div class = "container"  v-bind:style = '{textAlign: "center"}'>
        <h1>Home</h1>
        <div class = "main">
            Welcome to the Amplify Survey Website. You can respond to surveys on this page or access the admin portal to see results and create new surveys.
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home'
    }
</script>


<style>
    .main {
        max-width: 600px;
        margin: 2em;
    }

</style>