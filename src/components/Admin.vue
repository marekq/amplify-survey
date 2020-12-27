<template>
  <div class = "container">
    <h1>Admin page</h1>

    <div id = "app" v-if = "data.authgroups !== 'none'">
      <p><i>Viewing {{this.data.authgroups}} group survey responses</i></p>
      <table width = "100%">
        <thead>
          <tr>
            <th>Age</th>
            <th>Survey</th>
            <th>Satisfaction</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="`${row.id}`">
            <td>{{ row.age }}</td>
            <td>{{ row.survey }}</td>
            <td>{{ row.a1 }}</td>
            <td>{{ row.user }}</td>
          </tr>
        </tbody>
      </table>
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
  import awsconfig from '../aws-exports';
  import AWSAppSyncClient from 'aws-appsync';

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
          this.data.authgroups = usergroup.join(', ');

      } else {
          this.data.authgroups = 'none';

      }
    }
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