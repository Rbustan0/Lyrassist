import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import React, {useState, useEffect} from 'react';

import Carousel from "./Carousel";

function LyricCarousel({lyrics}) {
    const [cards, setCards] = useState([]);

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
        setCards(tempLyrics);
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
                width="30%"
                margin="0 auto"
                offset={2}
                showArrows={false}
            />    
        ):(
            <div></div>
        )}
      
    </div>
  );
}

export default LyricCarousel;
