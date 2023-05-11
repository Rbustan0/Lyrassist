const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    #TODO: CHANGE ADDSKILL AND REMOVESKILL
    
    addSkill(profileId: ID!, skill: String!): Profile

    removeProfile(profileId: ID!): Profile

    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
