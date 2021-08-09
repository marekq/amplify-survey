
<template>
    <div class = "container" v-bind:style = '{textAlign: "center"}'>
        <h1>Your profile</h1>
        <br />
        <table width = "80%">
            <tr><td>your username </td><td> {{this.data.authuser}}</td></tr>
            <tr><td>e-mail </td><td> {{this.data.authemail}}</td></tr>
            <tr><td>account verified </td><td>{{this.data.authverified}}</td></tr>
            <tr><td>permission groups </td><td> {{this.data.authgroups}}</td></tr>
        </table>
    </div>
</template>

<script>
    import { Auth, Hub } from 'aws-amplify';

    export default {
        name: 'profile',
        data () {
            return {
                data: {
                    authgroups: [],
                    authuser: '',
                    authverified: '',
                    surveyurl: ''
                }
            }
        },

        async beforeCreate() {

            // get the cognito user name 
            const authuser = await Auth.currentAuthenticatedUser();
            const session = await Auth.currentSession();

            // set the base survey url for profile page
            this.data.surveyurl = window.location.origin + '/survey/' + authuser.username + '/'

            // refresh the cognito tokens once
            authuser.refreshSession(session.refreshToken, (err, session) => {
                console.log('refreshing session', err, session);
                const { idToken, refreshToken, accessToken } = session;
            });

            // get email and verified status
            this.data.authemail = authuser.attributes.email;
            this.data.authverified = authuser.attributes.email_verified;
            this.data.authuser = authuser.username;

            // get the cognito group user value or set to none if missing
            if ( authuser.signInUserSession.idToken.payload["cognito:groups"] ) {

                const usergroup = authuser.signInUserSession.idToken.payload["cognito:groups"];
                this.data.authgroups = usergroup.join(', ');

            } else {
                this.data.authgroups = 'none';

            }
        }
    }
</script>

<style>
    .main {
        max-width: 600px;
        margin: 2em;
    }

</style>