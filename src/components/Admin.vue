<template>
  <div id = "app">
    <center>
      <h1>Admin page</h1>
        <vuetable ref = "vuetable"
          :fields = "fields"
          :api-mode = "false"
          :data = "data"
        />
    </center>
  </div>
</template>

<script>  
  // import vuetable
  import Vuetable from 'vuetable-2';

  // import graphql queries
  import { listSurveys } from '../graphql/queries';

  // import awsconfig and configure amplify
  import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

  // set vuetable fields
  const fields = [
    'timest',
    'a0',
    'a1',
    'a2',
    'a3',
    'a4',
    'q1'
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
      const data = await API.graphql({ query: listSurveys });

      console.log(data.data.listSurveys);
      this.data = data.data.listSurveys.items;
    }
  }
</script>
