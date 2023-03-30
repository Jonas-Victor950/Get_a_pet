import styles from "./Message.module.css";
import bus from "../../utils/bus"
import { useState, useEffect } from "react";

const Message = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setTipe] = useState("");

  useEffect(() => {

    bus.addListener("flash", ({message, type}) => {

      setVisibility(true)
      setMessage(message)
      setTipe(type)

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })
  }, [])

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
};

export default Message;
