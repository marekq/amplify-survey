<template>
  <div class = "auth">
    <amplify-authenticator username-alias = "email">
      <amplify-sign-up
        :form-fields.prop = "formFields"
        slot = "sign-up"
        username-alias = "email"
      />
      <amplify-sign-in 
        :form-fields.prop = "formFields"
        slot = "sign-in" 
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
          type: 'email',
          label: 'E-mail address',
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