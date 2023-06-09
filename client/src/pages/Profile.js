import React from 'react';
import EditModal from '../components/LyricCarousel/Modal';

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
  console.log(profile)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header, text-center">
        Here are your songs {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}: 
      </h2>
      <br></br>
      <div className="card-body"> 
          <LyricCarousel
            lyrics={profile.lyrics}
            // title={`${user.username}'s thoughts...`}
            // showTitle={false}
            // showUsername={false}
          />
        </div>
    </div>
  );
};

export default Profile;
