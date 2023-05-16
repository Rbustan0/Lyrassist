import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import SkillsList from '../components/SkillsList';
// import SkillForm from '../components/SkillForm';
import LyricCarousel from '../components/LyricCarousel/App.js'

import { ME } from '../utils/queries';

const Profile = () => {
 
  const  profileId  = useParams();
  console.log(profileId)

  const { loading, data } = useQuery(ME, {
    variables: { _id: profileId },
  });

  const profile = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {profile.name}'s friends have endorsed these skills...
      </h2>
      <div className="card-body">
          <LyricCarousel
            // thoughts={user.thoughts}
            // title={`${user.username}'s thoughts...`}
            // showTitle={false}
            // showUsername={false}
          />
        </div>
    </div>
  );
};

export default Profile;
