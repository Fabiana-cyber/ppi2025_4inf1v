import styles from './MyGrid.module.css';

export function MyGrid() {
    return (
        <div className={styles.container}>
            <header className={styles.header1}/>
            <header className={styles.header1}/>
            <aside className={styles.aside}/>
            <div className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>Card 1</h2>
                        <p>This is my firt card</p>