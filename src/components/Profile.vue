
<template>
    <center>
        <h1>Your profile</h1>
        <br />
        <table width = "80%">
            <tr><td>username </td><td> {{this.data.authuser}}</td></tr>
            <tr><td>email </td><td> {{this.data.authemail}}</td></tr>
            <tr><td>verified </td><td>{{this.data.authverified}}</td></tr>
            <tr><td>groups </td><td> {{this.data.authgroups}}</td></tr>
            <tr><td>your survey link </td><td><router-link tag = "a" to = "/survey/marek"><a>{{this.data.surveyurl}}</a></router-link></td></tr>
        </table>
    </center>
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