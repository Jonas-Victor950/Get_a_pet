import styles from "./Message.module.css";
import { useState } from "react";

const Message = () => {
  const [type, setTipe] = useState("");
  return (
    <div className={`${styles.message} ${styles[type]}`}>Minha mensagem</div>
  );
};

export default Message;
