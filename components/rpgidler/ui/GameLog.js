import styles from '@styles/IdleGame.module.css';

const GameLog = ({ gameLog, logEndRef }) => (
    <div className={styles.gameLogArea}>
        {gameLog.map((log, index) =>
            <span className={styles.logMessageStyle}>
                <p key={index}>{log}</p>
            </span>
        )}
        <div ref={logEndRef}></div>
    </div>
);

export default GameLog;