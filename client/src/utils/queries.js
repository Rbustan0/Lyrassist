import { gql } from '@apollo/client';


export const QUERY_PROFILES = gql`
  query Query($profileId: ID!) {
  profile(profileId: $profileId) {
    email
    _id
    lyrics {
      _id
      bridge
      chorus
      genre
      lyricText
      preChorus
      prompt
      verse
    }
    name
    password
  }
}
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($_id: ID!) {
    profile(_id: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_LYRIC = gql`
  query singleLyric($lyricId: ID!) {
    lyric(lyricId: $lyricId) {
      _id
      verse
      bridge
      chorus
      preChorus
      prompt
    }
  }
`

export const ME = gql`
  query Query {
  me {
    _id
    email
    lyrics {
      _id
      bridge
      chorus
      genre
      lyricText
      preChorus
      prompt
      verse
    }
    name
    password
  }
}
`

// Query Lyrics and single lyric

