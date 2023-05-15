const { AuthenticationError } = require('apollo-server-express');
const { Profile, Lyric } = require('../models');
const { signToken } = require('../utils/auth');

// import fetch from 'node-fetch';

const fetch = require('node-fetch');



const resolvers = {
  Query: {
    // profiles: async () => {
    //   return User.find().populate('lyrics');
    // },

    // profile: async (parent, { profileId }) => {
    //   return Profile.findOne({ _id: profileId }).populate('lyrics');
    // },
    me: async (parent, args, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id }).populate('lyrics');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    lyric: async (parent, { lyricId }) => {
      return Lyric.findOne({_id: lyricId})
    },
  },

  Mutation: {

    addLyric: async (parent, args, context) => {
      let {_id} = context.profile
      if(_id){
      const lyric = await Lyric.create({
        lyricText: args.lyricText,
        verse: verse,
        bridge: args.bridge,
        chorus: args.chorus,
        preChorus: args.preChorus,
        prompt: args.prompt,
      })

      await Profile.findOneAndUpdate(
        {_id: _id}, 
        { $addToSet: {lyrics: lyric._id }})

      return lyric;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
   

    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

   
    genLyric: async (parent, { verse, bridge, chorus, preChorus, prompt, genre }, context) => {
      if (prompt) {
        // Construct the input text for the OpenAI API based on the provided sections
        let inputText = '';
        let elements = [];
        let newLyric = '';

        if (verse) {
          elements.push('verse');
        }

        if (preChorus) {
          elements.push('preChorus');
        }

        if (chorus) {
          elements.push('chorus');
        }

        if (bridge) {
          elements.push('bridge');
        }

        const elementsString = elements.join('-');
   


        inputText = `prompt: Topic: ${prompt}\n Genre: ${genre}\n Song Structure Elements: ${elementsString}\nLyrics: `;
      

      // Make a request to the OpenAI API using node-fetch
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer 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",
            // Include any necessary headers for authentication or other requirements
          },
          body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: inputText, // THIS IS WHERE PROMPT WILL GO
            max_tokens: 100,
            temperature: .6, })
        })
        const responseData = await response.json();

        console.log(responseData)

        newLyric = responseData.generated_lyrics;
        // Process the response and extract the generated lyrics
        let {_id} = context.profile
        if(_id){
          const lyric = await Lyric.create({
            lyricText: newLyric,
            verse: verse,
            bridge: bridge,
            chorus: chorus,
            preChorus: preChorus,
            prompt: prompt,
            genre: genre,
          })

          await Profile.findOneAndUpdate(
            {_id: _id}, 
            { $addToSet: {lyrics: lyric._id }})

          return lyric;
          }
        throw new AuthenticationError('You need to be logged in!');
      }
      // Return the generated lyrics as the result

      // Return an appropriate value or error message if no prompt is provided
      throw new Error('A prompt is required to generate lyrics.');
    }
  },
};

module.exports = resolvers;


  // Make a request to the OpenAI API using your API utility function or Axios
        // const response = await fetchFromOpenAI('lyric-generation', {
        //   method: 'POST',
        //   headers: {
        //     // Include any necessary headers for authentication or other requirements
        //   },
        //   body: JSON.stringify({ input: inputText })
        // });

        // // Process the response and extract the generated lyrics
        // const { lyrics } = await response.json();

        // // Return the generated lyrics as the result
        // return lyrics;
        // Propmise then/catch block
        // Make request
        // fetch('https://jsonplaceholder.typicode.com/posts/1', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     id: 1,
        //     title: 'fun',
        //     body: 'bar',
        //     userId: 1,
        //   }),
        //   headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        //   },
        // })
          // Parse JSON data
          // .then((response) => response.json())

          // Showing response
          // .then((json) => console.log(json))
          // .catch(err => console.log(err))

