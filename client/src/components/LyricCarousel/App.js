import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import React, {useState, useEffect} from 'react';

import Carousel from "./Carousel";


function LyricCarousel({lyrics}) {
    const [cards, setCards] = useState([]);
    const newCards = '';
    // const [lyricContent, setLyricContent] = useState(lyric.lyricText);
    useEffect(() => {
        const tempLyrics = lyrics.map((lyric) => {
            return {
                    key: uuidv4(),
                    text: lyric.lyricText,
                    content: (
                        <Card text={lyric.lyricText} id={lyric._id} title={lyric.prompt}/>
                    )
            }
        })
        console.log(tempLyrics);
        setCards(tempLyrics.reverse());
    }, [])

    useEffect(() => {
        console.log(cards)
    }, [cards]) 


  return (
    <div className="">
        
        {cards.length ? (
            <Carousel
                cards={cards}
                height="500px"
                width="50%"
                margin="0 auto"
                offset={3}
                showArrows={false}
            />    
        ):(
            <div></div>
        )}
      
    </div>
  );
}

export default LyricCarousel;
