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
    genre: String
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

    addLyric(lyricText: String!, verse: Boolean, bridge: Boolean, chorus: Boolean, prompt: String, genre: String): Lyric

    genLyric(verse: Boolean, bridge: Boolean, chorus: Boolean, preChorus: Boolean, prompt: String!, genre: String): Lyric
    editLyric(_id: ID!, lyricText: String!, verse: Boolean, bridge: Boolean, chorus: Boolean, prompt: String): Lyric
    removeLyric(lyricId: ID!) : Lyric
  }
`;

module.exports = typeDefs;
