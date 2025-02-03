import { useEffect, useState } from 'react';
import styles from '@styles/IdleGame.module.css';

const IdleBox = ({ goldTimer }) => {
    const [timeLeft, setTimeLeft] = useState(Math.ceil(goldTimer / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 1 ? Math.ceil(prev - 1) : Math.ceil(goldTimer / 1000)));
        }, 1000);

        return () => clearInterval(interval);
    }, [goldTimer]);

    return (
        <div className={styles.infoBox}>
            <p>Next gold in: {timeLeft}s</p>
            <div className={styles.timerProgress}>
                <div className={styles.timerBar} style={{ width: `${(timeLeft / Math.ceil(goldTimer / 1000)) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default IdleBox;