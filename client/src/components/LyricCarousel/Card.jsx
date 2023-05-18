import Styles from "./Card.module.css";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
// import Button from "./Button";
import EditModal from "./Modal";
import { useMutation } from "@apollo/client";
import { REMOVE_LYRIC } from "../../utils/mutations";
import { QUERY_SINGLE_LYRIC } from "../../utils/queries";
import Styles1 from "./Button.module.css";

function Card({ text, id, title }) {
    const [show, setShow] = useState(true);
    const [removeLyric] = useMutation(REMOVE_LYRIC);
    // const updateLyric = useQuery(QUERY_SINGLE_LYRIC);
 

    const props3 = useSpring({
        transform: show ? "scale(1.03)" : "scale(1)",
        boxShadow: show ? "0 20px 25px rgb(0 0 0 / 25%)" : "0 2px 10px rgb(0 0 0 / 8%)",
    });

    const handleDelete = async () => {
        console.log("clicked")
        try {
        await removeLyric({
            variables: {
            lyricId: id,
            },
        });
        } catch (error) {
        console.error("Error deleting lyric:", error);
        }
    };

    // const handleUpdate = async() => {
    //     await updateLyric({
    //         variables: {
    //             lyricId: id,
    //         }
    //     })
    // }

    // const handleUpdate

    return (
        <animated.div
            className={Styles.card}
            style={props3}
        >
            <h2>{title}</h2>
            <p>{text}</p>
            <div className={Styles.btnn}>
                {/* <Button text="Edit" onClick={() => setShow(true)} /> */}
                <button text="Delete" className={Styles1.btn} onClick={handleDelete}  style={{ backgroundColor: '#cf23cf', borderColor: '#cf23cf' }}>Delete</button>
                {<EditModal lyrics={{ text, id, title }}/>}
            </div>
        </animated.div>
    );
}


export default Card;
