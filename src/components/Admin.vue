<template>
  <div class = "container">
    <center>
      <h1>Admin page</h1>
    </center>
    <div id = "app" v-if = "authgroups !== 'none'">
      <p>
        <center>
          <i>Viewing {{this.authgroups}} group survey responses</i>
        </center>
      </p>
        <vuetable
          ref = "vuetable"
          :api-mode = "false"
          :data = "data"
          :fields = "[
            
            {
              name: 'age',
              title: 'Age'
            },
            {
              name: 'survey', 
              title: 'Survey'
            },
            {
              name: 'user', 
              title: 'User'
            },
            {
              name: 'a1',
              title: 'Rating'
            },
            {
              name: 'a2',
              title: 'Services'
            },
            {
              name: 'a3',
              title: 'Content'
            },
            {
              name: 'a4',
              title: 'Comments'
            }
          ]"
        />
    </div>
    <div id = "app" v-if = "data.authgroups === 'none'">
      <br />
      <p><b>Acccess denied</b></p>
      <p>You do not have any admin group permissions assigned, check your user profile page.</p>
    </div>
  </div>
</template>

<script>  

  // import vuetable
  import Vuetable from 'vuetable-2';
  import prettyMilliseconds from 'pretty-ms';

  // import graphql queries
  import { listSurveys } from '../graphql/queries';

  // import awsconfig and configure amplify
  import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
  import AWSAppSyncClient from 'aws-appsync/lib/client';

  // setup amplify config
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

  // create client to retrieve
  const client = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
      type: awsconfig.aws_appsync_authenticationType
    }
  });

  // default export
  export default {
    name: 'vuesurvey',
    components: {
      Vuetable
    },

    // set table return 
    data() {
      return {
        data: [],
        authgroups: 'none'
      }
    },

    // retrieve data from table
    async mounted () {        

      // get data from graphql using cognito auth
      var data = await API.graphql({ query: listSurveys });
      var tmp = data.data.listSurveys.items;
  		var now = new Date().getTime();

      // convert the unix timestamp of every blog to a timediff string
      tmp.map(function(survey, index){
                
        // get the time difference in seconds
        var timestamp = now - (survey.timest * 1000);

        // get the time difference string and set it in data
        var timediff = prettyMilliseconds(timestamp, {compact: true});
        survey.age = timediff;

      });

      // set data to listSurvey items, sort by most recent timestamp value 
      this.data = data.data.listSurveys.items.sort(function(a, b){return b.timest-a.timest});
      
      // get cognito user details
      const authuser = await Auth.currentAuthenticatedUser();

      // get the cognito group user value or set to none if missing
      if ( authuser.signInUserSession.idToken.payload["cognito:groups"] ) {

          const usergroup = authuser.signInUserSession.idToken.payload["cognito:groups"];
          this.authgroups = usergroup.join(', ');

      } else {
          this.authgroups = 'none';

      }
    },
  }
</script>

<style>
  .main {
    max-width: 1000px;
    margin: 2em;
  },
  td {
    padding: 10px;
  }
</style>