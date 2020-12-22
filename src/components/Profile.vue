
<template>
    <center>
        <h1>Your profile</h1>
        <br />
        <table width = "80%">
            <tr><td>username </td><td> {{this.data.authuser}}</td></tr>
            <tr><td>verified </td><td>{{this.data.authverified}}</td></tr>
            <tr><td>groups </td><td> {{this.data.authgroups.join(', ')}}</td></tr>
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
                    authverified: ''
                }
            }
        },

        async beforeCreate() {

            // get the cognito user name 
            const authuser = await Auth.currentAuthenticatedUser();
            this.data.authuser = authuser.attributes.email;
            this.data.authattrib = authuser.attributes;
            this.data.authverified = authuser.attributes.email_verified;

            // get the cognito group user value or set to none
            if ( authuser.signInUserSession.idToken.payload["cognito:groups"] ) {

                const usergroup = authuser.signInUserSession.idToken.payload["cognito:groups"];
                this.data.authgroups = usergroup;

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