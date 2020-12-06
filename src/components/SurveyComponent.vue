<template>
    <survey :survey="survey" />
</template>

<script>
    import * as Survey from "survey-vue";
    import "survey-vue/modern.css";
    Survey.StylesManager.applyTheme("modern");

    export default {
        name: "surveyjs-component",
        data() {
            var surveyJSON = { surveyId: '1394268a-9fbc-419f-bdd4-e59547dc7cfe', surveyPostId: 'c07003ed-4399-4a53-8d4c-eca4589b2155'};
            const survey = new Survey.Model(surveyJSON);

            return {
                survey: survey
            };
        }
    };
</script>

<style scoped>
</style>
