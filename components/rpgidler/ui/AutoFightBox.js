import { useEffect, useState } from 'react';
import styles from '@styles/IdleGame.module.css';

const AutoFightBox = ({ autoFight, fightTimer }) => {
    const [timeLeft, setTimeLeft] = useState(Math.ceil(fightTimer / 1000));

    useEffect(() => {
        if (!autoFight) {
            setTimeLeft(Math.ceil(fightTimer / 1000));
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 1 ? Math.ceil(prev - 1) : Math.ceil(fightTimer / 1000)));
        }, 1000);

        return () => clearInterval(interval);
    }, [autoFight, fightTimer]);

    return (
        <div className={styles.infoBox}>
            <p>{autoFight ? `Next fight in: ${timeLeft}s` : 'Auto Fight Off'}</p>
            <div className={styles.timerProgress}>
                <div className={styles.timerBar} style={{ width: `${(timeLeft / Math.ceil(fightTimer / 1000)) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default AutoFightBox;