<template>
  <div>
    <flow-form
      id = "app"
      v-on:complete = "onComplete"
      v-on:submit = "onSubmit"
      v-bind:questions = "questions"
      v-bind:language = "language"
    >
     <template v-slot:complete>
        <div class = "f-section-wrap">
          <p>
            <span class = "fh2">Thank you!</span>
            <span class = "f-section-text">
              The survey is completed, please feel free to reach out with any questions to us!
            </span>
          </p>
        </div>  
      </template>

      <template v-slot:completeButton>
        <div class = "f-submit" v-if = "!submitted">
  
        </div>
      </template>
    </flow-form>
  </div>
</template>

<script>
  import FlowForm, { LanguageModel } from '@ditdot-dev/vue-flow-form';
  import questions from './questions'

  // import graphql mutations
  import { createSurvey } from '../graphql/mutations';

  // import awsconfig
  import Amplify, { API, graphqlOperation } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

  export default {
    name: 'vuesurvey',
    components: {
      FlowForm
    },

    // get survey name from url path
    beforeCreate() {
      const survey = this.$route.path;
      this.survey = survey.substring(survey.lastIndexOf('/') + 1);
    },

    // get survey data
    data() {
      return {
        submitted: false,
        language: new LanguageModel({}),
        questions: questions
      }
    },

    mounted() {
      document.addEventListener('keyup', this.onKeyListener)
    },

    beforeDestroy() {
      document.removeEventListener('keyup', this.onKeyListener)
    },

    methods: {
      // send data onComplete
      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        this.onSendData();
      },

      async createNewSurvey(data) {

        // get unix timestamp
        const now = Math.round(new Date() / 1000);

        // create survey json with timest and group name
        const survey = {'timest': now, 'group': this.survey, 'survey': this.survey };

        // add survey questions and answers to dict
        var i;
        for (i = 0; i < data['questions'].length; i++) {

          survey['q' + i] = String(data['questions'][i]) 
          survey['a' + i] = String(data['answers'][i])
        }

        // send survey to graphql
        await API.graphql(graphqlOperation(createSurvey, { input: survey }));
        console.log('submitted survey with input data ' + JSON.stringify(survey));
      },

      // send data onSubmit
      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        this.onSendData();
      },

      // run onSendData
      onSendData() {

        /* eslint-disable-next-line no-unused-vars */
        const data = this.getData();

        // send data 
        this.createNewSurvey(data)

      },

      // get the question data
      getData() {
        const data = {
          questions: [],
          answers: [],
        };
        this.questions.forEach((question) => {
          if (question.title) {
            let answer = question.answer;
            data.questions.push(question.title);
            data.answers.push(answer);
          }
        });
        return data;
      },

      // set key listener event for enter to send data
      onKeyListener($event) {
        if ($event.key === "Enter" && this.completed && !this.submitted) {
          this.onSendData();
          this.submitted = true;
        }
      }
    }
  }
</script>

<style>
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  .flow-container {
    margin: 0 25px; 
    padding-top: 20px;
  }
  .f-selected {
    background-color: lightgray;
  }
</style>
