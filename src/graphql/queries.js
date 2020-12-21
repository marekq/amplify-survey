/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
      id
      timest
      survey
      q0
      a0
      q1
      a1
      q2
      a2
      q3
      a3
      q4
      a4
      q5
      a5
      createdAt
      updatedAt
    }
  }
`;
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        timest
        survey
        q0
        a0
        q1
        a1
        q2
        a2
        q3
        a3
        q4
        a4
        q5
        a5
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
