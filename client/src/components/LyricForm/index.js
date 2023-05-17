import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GEN_LYRIC } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LyricForm = ({ lyricId }) => {
  const [prompt, setPromptText] = useState('');
  //   const [characterCount, setCharacterCount] = useState(0);
  const [verse, setVerse] = useState(false);
  const [preChorus, setPreChorus] = useState(false);
  const [chorus, setChorus] = useState(false);
  const [bridge, setBridge] = useState(false);
  const [genre, setGenre] = useState(false);

  console.log(prompt, verse, preChorus, chorus, bridge, genre);

  const [genLyric] = useMutation(GEN_LYRIC);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
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
    } catch (err) {
      console.log(err);
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
      {Auth.loggedIn() ? (

        
        <div>
          <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="prompt">Prompt:</label>
              <input type="text" className="form-control" id="prompt" name="prompt" value={prompt} onChange={handleChange} placeholder="Enter your prompt" />
            </div>
            <div>
              <label for="genre"> Choose a genre:</label>
              <select id="genre" name="genre" onChange={handleChange}>
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
                <input className="form-check-input" type="checkbox" id="verse" name="verse" value={verse} onChange={handleChange} />
                <label className="form-check-label" htmlFor="verse">
                  Verse
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="prechorus" name="prechorus" value={preChorus} onChange={handleChange} />
                <label className="form-check-label" htmlFor="prechorus">
                  Pre-Chorus
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="chorus" name="chorus" value={chorus} onChange={handleChange} />
                <label className="form-check-label" htmlFor="chorus">
                  Chorus
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="bridge" name="bridge" value={bridge} onChange={handleChange} />
                <label className="form-check-label" htmlFor="bridge">
                  Bridge
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Generate Lyrics
            </button>
          </form>
        </div>


  ) : (
    <p>
      You need to be logged in to generate lyrics. Please{' '}
      <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
    </p>
  )
}
    </div >
  );
};

export default LyricForm;


{// <>
  //   <form
  //     className="flex-row justify-center justify-space-between-md align-center"
  //     onSubmit={handleFormSubmit}
  //   >
  //     <div className="col-12 col-lg-9">
  //       <textarea
  //         name="prompt"
  //         placeholder="Enter your prompt..."
  //         value={prompt}
  //         className="form-input w-100"
  //         style={{ lineHeight: '1.5', resize: 'vertical' }}
  //         onChange={handleChange}
  //       ></textarea>
  //     </div>
  //     <div>
  //         <input id="verse" name="verse" type="checkbox" value="verse" onChange={handleChange}></input>
  //         <label for="verse">I want a verse</label>
  //         <input id="prechorus" name="prechorus" type="checkbox" value="prechorus" onChange={handleChange}></input>
  //         <label for="prechorus">I want a prechorus</label>
  //         <input id="chorus" name="chorus" type="checkbox" value="chorus" onChange={handleChange}></input>
  //         <label for="chorus">I want a chorus</label>
  //         <input id="bridge" name="bridge" type="checkbox" value="bridge" onChange={handleChange}></input>
  //         <label for="bridge">I want a bridge</label>
  //     </div>
  //     <div>
  //         <label for="genre"> Choose a genre:</label>
  //         <select id="genre" name="genre" onChange={handleChange}>
  //             <option value="pop">Pop</option>
  //             <option value="rap">Rap</option>
  //             <option value="edm">EDM</option>
  //         </select>
  //     </div>
  //     <div className="col-12 col-lg-3">
  //       <button className="btn btn-primary btn-block py-3" type="submit">
  //         Generate Lyric
  //       </button>
  //     </div>
  //   </form>
  // </>
}

