<template>
  <div>
    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
    >
     <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Thank you!</span>
            <span class="f-section-text">
              The survey is completed, please feel free to reach out with any questions to @marekq!
            </span>
          </p>
        </div>  
      </template>

      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button 
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit"
          >
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>
      </template>
    </flow-form>
  </div>
</template>

<script>
  import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form';
  
  // import graphql mutations
  import { createSurvey } from '../graphql/mutations';

  // import awsconfig
  import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

  export default {
    name: 'vuesurvey',
    components: {
      FlowForm
    },

    data() {
      return {
        signedIn: false,
        submitted: false,
        language: new LanguageModel({}),
        questions: [
          new QuestionModel({
            title: 'Welcome to the survey',
            type: QuestionType.SectionBreak,
            tagline: "Start"
          }),
          new QuestionModel({
            title: 'Multiple choice',
            type: QuestionType.MultipleChoice,
            tagline: "Question One",
            required: false,
            options: [
              new ChoiceOption({
                label: 'Answer one'
              }),
              new ChoiceOption({
                label: 'Answer two'
              }),
            ]
          }),
          new QuestionModel({
            title: 'Dropdown',
            type: QuestionType.Dropdown,
            tagline: "Question Two",
            required: false,
            options: [
              new ChoiceOption({
                label: 'Answer three'
              }),
              new ChoiceOption({
                label: 'Answer four'
              }),
            ]
          }),
          new QuestionModel({
            id: 'multiple_choices',
            title: 'Multiple choice',
            tagline: "Question Three",
            type: QuestionType.MultipleChoice,
            multiple: true,
            required: false,
            helpText: 'Pick all that apply',
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
              })
            ]
          }),
          new QuestionModel({
            title: 'Any other comments?',
            type: QuestionType.LongText,
            tagline: "Final Question",
            required: false
          })
        ]
      }
    },

    beforeCreate() {
      Hub.listen('auth', data => {
        console.log('data:', data)
        const { payload } = data
        
        if (payload.event === 'signIn') {
          this.signedIn = true
          this.$router.push('/profile')
        }

        if (payload.event === 'signOut') {
          this.$router.push('/auth')
          this.signedIn = false
        }
    
      Auth.currentAuthenticatedUser()
        .then(() => {
          this.signedIn = true
        })
        .catch(() => this.signedIn = false)
    })},

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

        // create survey json
        const survey = {'timest': now };

      // add survey questions and answers to dict
        var i;
        for (i = 0; i < data['questions'].length; i++) {

          survey['q' + i] = String(data['questions'][i]) + ", " + String(data['answers'][i])
        }

        // send survey to graphql
        await API.graphql(graphqlOperation(createSurvey, { input: survey }));
      },

      // send data onSubmit
      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        this.onSendData();
      },

      // run onSendData
      onSendData() {

        // set submitted form status to true
        this.$refs.flowform.submitted = true;

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
            if (typeof answer === "object") {
              answer = answer.join(", ");
            }
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
        }
      }
    }
  }
</script>

<style>
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css';
</style>