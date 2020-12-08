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
  import fetch from "node-fetch";
  import awsconfig from './aws-exports';

  // get api gw endpoint
  const apigwurl = awsconfig.aws_cloud_logic_custom.[0].endpoint;
  console.log(apigwurl);

  export default {
    name: 'vuesurvey',
    components: {
      FlowForm
    },

    data() {
      return {
        language: new LanguageModel({}),
        questions: [
          new QuestionModel({
            title: 'Welcome to the survey',
            type: QuestionType.SectionBreak
          }),
          new QuestionModel({
            title: 'Multiple choice',
            type: QuestionType.MultipleChoice,
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
            type: QuestionType.MultipleChoice,
            multiple: true,
            helpText: 'Pick all that apply',
            required: true,
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
            required: false
          })
        ]
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

      // send data onSubmit
      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        this.onSendData();
      },

      // run onSendData
      onSendData() {

        // set submitted form status to true
        this.$refs.flowform.submitted = true;
        this.submitted = true;

        /* eslint-disable-next-line no-unused-vars */
        const data = this.getData();

        // set the api gw endpoint url 
        const posturl = apigwurl + '/survey/'
        console.log('sending post to ' + posturl);
        console.log(data);

        // post the survey results to the api gw endpoint
        fetch(posturl, {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
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