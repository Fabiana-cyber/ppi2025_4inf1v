import { useState } from "react";
import styles from "./LuckyNumber.module.css";


export function LuckyNumber() {
    const [luckyNumber, setLuckyNumber] = useState(0);

    function handleClick() {
        setLuckyNumber(Math.ceil(Math.random() * 31));
        // console.log("Lucky Number is now: ", luckyNumber);
    }

    return(
        <div className={styles.container}>
            {luckyNumber ? (
                <h1>Lucky Number = {luckyNumber}</h1>
            ): (
                <h1>Lucky Number 🎲</h1>
            )}
            
            <button className={styles.button} onClick={handleClick}> I´m feeling lucky today!</button>
            {}
        </div>
    )
}
