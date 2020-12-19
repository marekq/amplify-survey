<template>
    <div id = 'app'>
      <div class = 'nav'>
        <router-link tag = "p" to = "/">
          <a>Home</a>
        </router-link>
        <router-link tag = "p" to = "/survey">
          <a>Survey</a>
        </router-link>
        <router-link tag = "p" to = "/admin" v-if = "signedIn">
          <a>Admin</a>
        </router-link>
        <router-link tag = "p" to = "/auth" v-if = "!signedIn">
          <a>Login</a>
        </router-link>
      </div>
      <router-view></router-view>
      <br /><br />
      <div class = 'sign-out' sticky = "bottom">
        <amplify-sign-out v-if="signedIn"></amplify-sign-out>
      </div>
    </div>
</template>

<script>
import { Auth, Hub } from 'aws-amplify';

export default {
  name: 'app',
  data() {
    return {
      signedIn: false
    }
  },
  beforeCreate() {
    Hub.listen('auth', data => {
      console.log('data:', data)
      const { payload } = data
      if (payload.event === 'signIn') {
        this.signedIn = true
        this.$router.push('/admin')
      }
      if (payload.event === 'signOut') {
        this.$router.push('/auth')
        this.signedIn = false
      }
    })
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.signedIn = true
      })
      .catch(() => this.signedIn = false)
  }
}
</script>

<style>
.nav {
  display: flex;
  text-align: center;
}
.nav p {
  padding: 4em 4em 0 6em;
  font-size: 18px;
  color: #000;
}
.nav p:hover {
  opacity: .7;
}
.nav p a {
  text-decoration: none;
}
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>