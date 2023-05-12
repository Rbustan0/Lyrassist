const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    lyrics: [Lyric]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Lyric {
    _id: ID
    lyricText: String
    verse: Boolean
    bridge: Boolean
    chorus: Boolean
    preChorus: Boolean
    prompt: String
  }

  type Query {
    #profiles: [Profile]!
    #profile(profileId: ID!): Profile
    lyric(lyricId: ID!): Lyric
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLyric(lyricText: String!, verse: Boolean, bridge: Boolean, chorus: Boolean, prompt: String): Lyric

    #TODO: CHANGE ADDSKILL AND REMOVESKILL
    
    #addSkill(profileId: ID!, skill: String!): Profile

    removeProfile(profileId: ID!): Profile

    #removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
