<template>
  <div class = "auth">
    <amplify-authenticator>
      <amplify-sign-up
        username-alias = "email" 
        slot = "sign-up"
        :form-fields.prop = "registerFields" 
      />
    </amplify-authenticator>  
  </div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
      return {
        registerFields: [
          {
            type: "preferred_username",
            placeholder: " ",
            label: "Username",
            required: true
          },
          {
            type: "email",
            placeholder: " ",
            label: "E-mail",
            required: true
          },
          {
            type: "password",
            placeholder: " ",
            label: "Password",
            required: true
          }
        ],
        loginFields: [
          {
            type: "preferred_username",
            placeholder: " ",
            label: "Username",
            required: true
          },
          {
            type: "password",
            placeholder: " ",
            label: "Password",
            required: true
          }
        ]
      }
    },
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