import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [message, setMessage] = useState("");

  function handleClick() {
    // setLuckyNumber(Math.ceil(Math.random() * 31));
    // console.log("Lucky Number is now: ", luckyNumber);

    const number = Math.ceil(Math.random() * 31); 
    setLuckyNumber(number);
    if (sortedNumbers.includes(number)) {
      setMessage("O Número " + number + " já foi sorteado!");
    } else {
      setSortedNumbers([...sortedNumbers, number]);
      setMessage("");
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? (
        <h1>Lucky Number = {luckyNumber}</h1>
      ) : (
        <h1>Lucky Number 🎲</h1>
      )}
    <div className={styles.buttons}>
      <button className={styles.button} onClick={handleClick}>
        I´m feeling lucky today!
      </button>

      <button className={styles.button} onClick={() => {
        setLuckyNumber(0);
        setSortedNumbers([]);
        setMessage("");
        }}>
            RESET🔄
      </button>
    </div>

      {message && <p className={styles.message}>{message}</p>}
      {sortedNumbers.length > 0 && (
        <div>
          <h3> Lucky Numbers Array:</h3>
          <p>[{sortedNumbers.toString()}]</p>
        </div>
      )}
      
    </div>
  );
}
