const { AuthenticationError } = require('apollo-server-express');
const { Profile, Lyric } = require('../models');
const { signToken } = require('../utils/auth');



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
        verse: args.verse,
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
          const thought = await Lyric.findOneAndDelete({
            _id: lyricId,
          });

          await User.findOneAndUpdate(
            { _id: context.profile._id },
            { $pull: { lyrics: lyric._id } }
          );

          return lyric;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
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

    // TODO: CHANGE TO LYRICS?
    // addThought: async (parent, { thoughtText }, context) => {
    //   // change to profile
    //   if (context.user) { 
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // ! TODO: add mutatuon for removeProile
    // removeProfile: async (parent, { profileId }) => {
    //   return Profile.findOneAndDelete({ _id: profileId });
    // },


    // TODO: CHANGE TO LYRICS?
    // change to profile
    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
