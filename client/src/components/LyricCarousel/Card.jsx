import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";
import EditModal from "./Modal";
import { useMutation } from "@apollo/client";
import { REMOVE_LYRIC } from "../../utils/mutations";

function Card({ text, id }) {
  const [show, setShow] = useState(false);
  const [removeLyric] = useMutation(REMOVE_LYRIC);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show ? "0 20px 25px rgb(0 0 0 / 25%)" : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  const handleDelete = async () => {
    try {
      await removeLyric({
        variables: {
          _id: id,
        },
      });
    } catch (error) {
      console.error("Error deleting lyric:", error);
    }
  };

  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <h2>Title</h2>
      <p>{text}</p>
      <div className={Styles.btnn}>
        <Button text="Edit" onClick={() => setShow(true)} />
        <Button text="Delete" onClick={handleDelete} />
      </div>
      {show && <EditModal lyrics={{ text, id }} />}
    </animated.div>
  );
}

export default Card;
