<template>
  <div id = "app">
    <h1>Admin page</h1>
    <template>
      <vuetable ref = "vuetable"
        :fields = "fields"
        :api-mode = "false"
        :data = "data"
      ></vuetable>
    </template>
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
    'q1',
    'q2',
    'q3',
    'q4'
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
