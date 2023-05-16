const { AuthenticationError } = require('apollo-server-express');
const { Profile, Lyric } = require('../models');
const { signToken } = require('../utils/auth');

require('dotenv').config();
const apiKey = process.env.API_KEY;

// import fetch from 'node-fetch';

const fetch = require('node-fetch');



const resolvers = {
  Query: {
    // profiles: async () => {
    //   return User.find().populate('lyrics');
    // },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate('lyrics');
    },
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
   
    editLyric: async (parent, args, context) => {
      const { _id } = args;

      if (context.profile) {
        const existingLyric = await Lyric.findById(_id);

        if (!existingLyric) {
          throw new Error('Lyric not found');
        }

        const updatedLyric = await Lyric.findByIdAndUpdate(
          _id,
          {
            lyricText: args.lyricText,
            verse: args.verse,
            bridge: args.bridge,
            chorus: args.chorus,
            preChorus: args.preChorus,
            prompt: args.prompt,
          },
          { new: true }
        );

        // await Profile.findOneAndUpdate(
        //   { _id: _id },
        //   { $addToSet: { lyrics: updatedLyric._id } }
        // );

        return updatedLyric;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeLyric: async (parent, { lyricId }, context) => {
        if (context.profile) {
          const lyric = await Lyric.findOneAndDelete({
            _id: lyricId,
          });

          await Profile.findOneAndUpdate(
            { _id: context.profile._id },
            { $pull: { lyrics: lyricId } }
          );

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

        const messages = [
          { role: 'user', content: `prompt: Topic: ${prompt}` },
          { role: 'user', content: `Genre: ${genre}` },
          { role: 'user', content: `Song Structure Elements: ${elementsString}` },
          { role: 'user', content: 'Lyrics:' }
        ];

      // Make a request to the OpenAI API using node-fetch
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${apiKey}`,
            // Include any necessary headers for authentication or other requirements
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages, // THIS IS WHERE PROMPT WILL GO
            max_tokens: 1000,
            temperature: .6, })
        })
        const responseData = await response.json();
        console.log(responseData)
        console.log(responseData.choices[0].message.content)

        newLyric = responseData.choices[0].message.content;

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


