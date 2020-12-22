<template>
  <div class = "auth">
    <amplify-authenticator username-alias = "username">
      <amplify-sign-up
        :form-fields.prop = "signupfields"
        slot = "sign-up"
      />
      <amplify-sign-in 
        :form-fields.prop = "loginfields"
        slot = "sign-in" 
      />
    </amplify-authenticator>
  </div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
      return {
        signupfields: [
          {
            type: 'username',
            label: 'User name',
            required: true
          },
          {
            type: 'email',
            label: 'E-mail address',
            required: true
          },
          {
            type: 'password',
            label: 'Password',
            required: true
          }
        ],
        loginfields: [
          {
            type: 'username',
            label: 'User name',
            required: true
          },
          {
            type: 'password',
            label: 'Password',
            required: true
          }
        ]
      }
    }
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