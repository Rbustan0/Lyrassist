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
    lyric: async (parent, args) => {
      return Lyric.findOne({_id: lyric.Id})
    },
  },

  Mutation: {
    addLyric: async (parent, args, context) => {
      if(context.profile){
      const lyric = await Lyric.create({
        lyricText: args.lyricText,
        verse: args.verse,
        bridge: args.bridge,
        chorus: args.chorus,
        preChorus: args.preChorus,
        prompt: args.prompt,
      })};

      await Profile.findOneAndUpdate({_id: context.profile._id}, 
        { $addToSet: {lyrics: lyric._id }})

      return lyric;
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
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
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
