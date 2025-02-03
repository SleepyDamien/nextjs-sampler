import styles from '@styles/IdleGame.module.css';

const Controls = ({ handleFight, autoFight, setAutoFight }) => (
    <div className={styles.controlArea}>
        <button onClick={handleFight} className={styles.gameButton}>Fight Monsters</button>
        <button onClick={() => setAutoFight((prev) => !prev)}
            className={`${styles.gameButton} ${autoFight ? styles.activeButton : ''}`}>
            {autoFight ? 'Stop Auto-Fight' : 'Start Auto-Fight'}
        </button>
    </div>
);

export default Controls;