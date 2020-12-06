<template>
  <div>
    <div id = "surveyElement">
        <SurveyComponent />
    </div>
  </div>
</template>

<script>
  import SurveyComponent from "./components/SurveyComponent";

  export default {
    name: "App",
    components: {
      SurveyComponent
    }
  };
</script>
