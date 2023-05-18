import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import {ME} from '../../utils/queries'
import { GEN_LYRIC } from '../../utils/mutations';
import { useNavigate } from "react-router-dom";
import Profile from "../../pages/Profile";

import Auth from '../../utils/auth';




const LyricForm = ({ lyricId }) => {
  const [prompt, setPromptText] = useState('');
  //   const [characterCount, setCharacterCount] = useState(0);
  const [verse, setVerse] = useState(false);
  const [preChorus, setPreChorus] = useState(false);
  const [chorus, setChorus] = useState(false);
  const [bridge, setBridge] = useState(false);
  const [genre, setGenre] = useState(null);
  // const {id} = useQUery(ME, {
  //   variabes: {_}
  // })
  // const [setMe] = useQuery(ME);
  // const profileIdGenerate= async() => { 
  //   const token = await setMe;
  //    const Id = token.data.me._id;
  //    return Id;
  // }
  // const profileId = profileIdGenerate();
  const navigate = useNavigate();
  // console.log(prompt, verse, preChorus, chorus, bridge, genre);

  const [genLyric] = useMutation(GEN_LYRIC);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('subButton');
    if( genre === null) {
      btn.innerHTML = "Select a Genre and submit again";
      return console.log("You must select a genre!");
    }
    try {
      btn.innerHTML = "Generating Lyrics...";
      const { data } = await genLyric({
        variables: {
          verse,
          lyricId,
          prompt,
          preChorus,
          chorus,
          bridge,
          genre,
        },
      });
      setPromptText('');
      setGenre(genre);
      navigate(`/profile/${Auth.getProfile().data._id}`, {replace: true});
      Profile();
      console.log("Success! Your Lyrics are generating!")
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'prompt' && value.length <= 280) {
      setPromptText(value);
    };

    if (name === 'verse' && value === "verse") {
      setVerse(true);
    };

    if (name === 'prechorus' && value === "prechorus") {
      setPreChorus(true);
    };
    if (name === 'chorus' && value === "chorus") {
      setChorus(true);
    };
    if (name === 'bridge' && value === "bridge") {
      setBridge(true);
    };
    if (name === 'genre' && value !== "genre") {
      setGenre(value);
    };
    if (name === 'genre' && value === "genre") {
      setGenre(null);
    };
  }

  return (
    <div>
      {Auth.loggedIn() ? (

        
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="prompt">Prompt:</label>
              <input type="text" className="form-control" id="prompt" name="prompt" value={prompt} onChange={handleChange} placeholder="Enter your prompt" />
            </div>

            <div className='mb-3'>
              <label htmlFor="genre"> Choose a genre: &nbsp;&nbsp;</label>

              <select id="genre" name="genre" onChange={handleChange}>
                <option value="genre">Genre</option>
                <option value="pop">Pop</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="edm">EDM</option>
                <option value="country">Country</option>
                <option value="rock">Rock</option>
                <option value="R&B">R&B</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="checkboxes">Structure your lyrics:</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="verse" name="verse" value="verse" onChange={handleChange} />
                <label className="form-check-label" htmlFor="verse">
                  Verse
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="prechorus" name="prechorus" value="prechorus" onChange={handleChange} />
                <label className="form-check-label" htmlFor="prechorus">
                  Pre-Chorus
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="chorus" name="chorus" value="chorus" onChange={handleChange} />
                <label className="form-check-label" htmlFor="chorus">
                  Chorus
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="bridge" name="bridge" value="bridge" onChange={handleChange} />
                <label className="form-check-label" htmlFor="bridge">
                  Bridge
                </label>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <button id="subButton" type="submit" className="btn btn-primary" style={{ backgroundColor: '#cf23cf', borderColor: '#cf23cf' }}>
              Generate Lyrics
            </button>
            </div>
          </form>
        </div>


  ) : (
    <p>
      You need to be logged in to generate lyrics. Please{' '}
            <Link to="/login" style={{ color: 'cyan' }}>login</Link> or <Link to="/signup" style={{ color: 'cyan' }} >signup.</Link>
    </p>
  )
}
    </div >
  );
};

export default LyricForm;

