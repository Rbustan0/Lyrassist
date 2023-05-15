import React from 'react';
import { useMutation } from '@apollo/client';
import { GEN_LYRIC } from '../utils/mutations';

import LyricForm from '../components/ProfileList';

const Home = () => {
  const { loading, data } = useMutation(GEN_LYRIC);
  const lyric = data?.lyric || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <LyricForm
              lyric={lyric}
              title="Make a Song!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
