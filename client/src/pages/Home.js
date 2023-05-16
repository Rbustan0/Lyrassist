import React from 'react';


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
              <h2 className="text-center">Submit Your Lyrics</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="checkboxes">Choose Elements:</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="verse" />
                    <label className="form-check-label" htmlFor="verse">
                      Verse
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="chorus" />
                    <label className="form-check-label" htmlFor="chorus">
                      Chorus
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="bridge" />
                    <label className="form-check-label" htmlFor="bridge">
                      Bridge
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="prompt">Prompt:</label>
                  <input type="text" className="form-control" id="prompt" placeholder="Enter your prompt" />
                </div>
                <button type="submit" className="btn btn-primary">Generate Lyrics</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



export default Home;
