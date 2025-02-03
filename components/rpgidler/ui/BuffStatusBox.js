import styles from '@styles/IdleGame.module.css';

const BuffStatusBox = ({ buffs }) => {
    return (
        <div className={styles.infoBox}>
            <h3>Active Buffs</h3>
            {buffs.length > 0 ? (
                <ul>
                    {buffs.map((buff, index) => (
                        <li key={index}>
                            {buff.name} (Expires in {Math.ceil(buff.duration)}s)
                            <div className={styles.timerProgress}>
                                <div className={styles.timerBar} style={{ width: `${(Math.ceil(buff.duration) / buff.maxDuration) * 100}%` }}></div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No active buffs</p>
            )}
        </div>
    );
};

export default BuffStatusBox;