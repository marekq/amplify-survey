<template>
  <flow-form v-bind:questions="questions" v-bind:language="language" />
</template>

<script>
  // Import necessary components and classes
  import FlowForm, { QuestionModel, QuestionType, ChoiceOption } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm
    },
    data() {
      return {
        
        questions: [
          new QuestionModel({
            title: 'Question one',
            type: QuestionType.MultipleChoice,
            options: [
              new ChoiceOption({
                label: 'Answer one'
              }),
              new ChoiceOption({
                label: 'Answer two'
              }),
            ]
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