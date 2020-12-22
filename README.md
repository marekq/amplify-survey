amplify-survey
--------------

Create a custom online survey webpage using AWS Amplify. This repository contains the Amplify frontend code written in Vue and the backend which consists of a GraphQL endpoint and a DynamoDB table to view survey results. This solution stores all data in your AWS account and there is no tracking of userdata whatsoever. 

You can deploy the project using Amplify by adding this repo or a fork to Amplify. 


<img align = "center" src = "./docs/website.png" height = "500px">


Take a look at a live demo here; https://survey.marek.rocks/. 


Roadmap
-------

- [X] Limit backend admin access by Cognito group permissions. 
- [X] Add GraphQL @auth authorization based on Cognito groups to get retrieve survey results in admin portal.
- [X] Add the capability to add surveys with different questions based on URL path (i.e. /survey/feedback/).
- [X] Add user profile page which shows user details and permissions. 
- [X] Add timestamp parsing to admin view. 
- [X] Add GraphQL API to submit survey results to DynamoDB. 
- [X] Add Admin portal to review survey results. 

Contact
-------

In case you have any suggestions, questions or remarks, please raise an issue or reach out to @marekq.
