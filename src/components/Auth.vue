<template>
  <div class = "auth">
    <amplify-authenticator hideSignUp>
      <amplify-signup hideSignUp />
    </amplify-authenticator>      
  </div>
</template>

<script>
  export default {
    name: 'auth'
  }
</script>

<style>
  .auth {
    margin: 0 auto;
    width: 460px;
  }

  amplify-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 4;
    height: 100vh;
    color: purple;
  }
</style>