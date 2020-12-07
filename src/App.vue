<template>
  <flow-form v-bind:questions="questions" v-bind:language="language" />
</template>

<script>
  // Import necessary components and classes
  import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm
    },
    data() {
      return {
        language: new LanguageModel({}),
        questions: [
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
                label: 'Answer one'
              }),
              new ChoiceOption({
                label: 'Answer two'
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
              }),
              new ChoiceOption({
                label: 'Answer 3'
              }),
              new ChoiceOption({
                label: 'Answer 4'
              })
            ]
          }),
          new QuestionModel({
            title: 'Any other comments?',
            type: QuestionType.LongText
          })
        ]
      }
    }
  }
</script>

<style>
  /* Import Vue Flow Form base CSS */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  /* Import one of the Vue Flow Form CSS themes (optional) */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css';
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css'; */
</style>