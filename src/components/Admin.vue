<template>
  <center>
    <div class = "main">
      <h1>Admin page</h1>
        <br /><br />
        <vuetable 
          ref = "vuetable"
          :fields = "fields"
          :api-mode = "false"
          :data = "data"
        />
    </div>
  </center>

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
  Amplify.configure(awsconfig);

  // set vuetable fields
  const fields = [
    'age',
    'survey',
    'a2',
    'a3',
    'a4'
  ]

  // default export
  export default {
    name: 'vuesurvey',
    components: {
      Vuetable
    },

    // set table return 
    data() {
      return {
        fields: fields,
        data: []
      }
    },

    // retrieve data from table
    async mounted () {        

      // get data from graphql
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
    }
  }
</script>

<style>
  .main {
    max-width: 1000px;
    margin: 2em;
  }
</style>