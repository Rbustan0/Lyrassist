import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GEN_LYRIC } from '../../utils/mutations';

import Auth from '../../utils/auth';

const PromptForm = () => {
  const [prompt, setPromptText] = useState('');
//   const [characterCount, setCharacterCount] = useState(0);
    const [verse, setVerse] = useState(false);
    const [preChorus, setPreChorus] = useState(false);
    const [chorus, setChorus] = useState(false);
    const [bridge, setBridge] = useState(false);
    const [genre, setGenre] = useState(false);

  const [genLyric] = useMutation(GEN_LYRIC);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await genLyric({
        variables: {
          verse,
          prompt,
          preChorus,
          chorus,
          bridge,
          genre,
        },
      });
    
      setPromptText('');
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'prompt' && value.length <= 280) {
      setPromptText(value);
    //   setCharacterCount(value.length);
    };

    if (name === 'verse' && value === "verse") {
        setVerse(true);
      //   setCharacterCount(value.length);
      };
    
      if (name === 'prechorus' && value === "prechorus") {
        setPreChorus(true);
      //   setCharacterCount(value.length);
      }
      if (name === 'chorus' && value === "chorus") {
        setChorus(true);
      //   setCharacterCount(value.length);
      }
      if (name === 'bridge' && value === "bridge") {
        setBridge(true);
      //   setCharacterCount(value.length);
      }
      if (name === 'genre') {
        setGenre(value);
      }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="prompt"
                placeholder="Enter your prompt..."
                value={prompt}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
                <input id="verse" name="verse" type="checkbox" value="verse" onChange={handleChange}></input>
                <label for="verse">I want a verse</label>
                <input id="prechorus" name="prechorus" type="checkbox" value="prechorus" onChange={handleChange}></input>
                <label for="prechorus">I want a prechorus</label>
                <input id="chorus" name="chorus" type="checkbox" value="chorus" onChange={handleChange}></input>
                <label for="chorus">I want a chorus</label>
                <input id="bridge" name="bridge" type="checkbox" value="bridge" onChange={handleChange}></input>
                <label for="bridge">I want a bridge</label>
            </div>
            <div>
                <label for="genre"> Choose a genre:</label>
                <select id="genre" name="genre" onChange={handleChange}>
                    <option value="pop">Pop</option>
                    <option value="rap">Rap</option>
                    <option value="edm">EDM</option>
                </select>
            </div>
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Generate Lyric
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PromptForm;
