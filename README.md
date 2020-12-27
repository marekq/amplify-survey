amplify-survey
--------------

Create a custom online survey webpage using AWS Amplify with a private backend. This repository contains the Amplify frontend code written in Vue and the backend which consists of a GraphQL endpoint and a DynamoDB table to store survey results. On the backend, you can also review the response results for the surveys that your profile has access to. 

You can deploy the project using Amplify by adding this repo or a fork to Amplify. All the frontend and backend components will automatically be set up for you and after a few minutes, you can get started hosting your own surveys. 


<img align = "center" src = "./docs/website.png" height = "500px">


Take a look at a live demo here; https://survey.marek.rocks/. 


Roadmap
-------

- [X] Limit admin access to Cognito groups. 
- [X] Add GraphQL @auth Cognito authorization to get all survey results in admin portal.
- [X] Add Cognito IAM authentication for public create calls to AppSync. 
- [X] Add the capability to add surveys with different questions based on URL path.
- [X] Add user profile page with user details. 
- [X] Add relative timestamp parsing to admin view. 
- [X] Add GraphQL API to submit public survey results to DynamoDB. 
- [X] Add Admin portal to review survey results. 

Contact
-------

In case you have any suggestions, questions or remarks, please raise an issue or reach out to @marekq.
