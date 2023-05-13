import { gql } from '@apollo/client';


export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
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

// Query Lyrics and single lyric

