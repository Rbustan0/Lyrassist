import React from 'react';
import LyricForm from '../components/LyricForm';
import { useQuery } from '@apollo/client';
import {ME} from '../utils/queries'


const Home = () => {

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 my-3">
            <h1 className="text-center">Welcome to Lyrassist!</h1>
            <p className="text-center">
              Lyrassist is an innovative platform that empowers songwriters and musicians to create captivating lyrics effortlessly. With our AI-powered lyric generator, you can unleash your creativity and explore endless possibilities. Whether you're seeking inspiration or looking to overcome writer's block, Lyrassist is your go-to tool for crafting unique and meaningful lyrics. Get started today and let your musical journey begin!
            </p>
            <div className="p-4">
              <h2 className="text-center">Generate Your Lyrics</h2>
              < LyricForm  />
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



export default Home;
