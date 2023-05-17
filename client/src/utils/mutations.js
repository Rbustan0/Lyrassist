import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// export const ADD_SKILL = gql`
//   mutation addSkill($profileId: ID!, $skill: String!) {
//     addSkill(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// ! ADD LYRIC
export const GEN_LYRIC = gql`
 mutation Mutation($verse: Boolean, $bridge: Boolean, $chorus: Boolean, $preChorus: Boolean, $prompt: String!, $genre: String) {
  genLyric(verse: $verse, bridge: $bridge, chorus: $chorus, preChorus: $preChorus, prompt: $prompt, genre: $genre) {
    _id
    lyricText
  }
}
`;

export const REMOVE_LYRIC = gql `
  mutation Mutation($lyricId: ID!) {
  removeLyric(lyricId: $lyricId) {
    _id
  }
}
`;


