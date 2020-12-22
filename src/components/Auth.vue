<template>
  <div class = "auth">
    <amplify-authenticator>
      <amplify-sign-up
        username-alias = "email" 
        slot = "sign-up"
        :form-fields.prop = "formFields" 
      />
      <amplify-sign-in         
        username-alias = "email" 
      />
    </amplify-authenticator>  
  </div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
      return {
        formFields: [
          {
            type: "username",
            placeholder: "Username",
            required: true
          },
          {
            type: "password",
            placeholder: "Password",
            required: true
          },
          {
            type: "email",
            placeholder: "Email Address",
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