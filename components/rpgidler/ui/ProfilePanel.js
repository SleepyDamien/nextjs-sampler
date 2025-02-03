import { FaShieldAlt, FaCoins, FaTrophy, FaStar } from 'react-icons/fa';
import styles from '@styles/IdleGame.module.css';

const ProfilePanel = ({ player }) => {
    const expPercentage = (player.exp / (100 * player.level)) * 100;

    return (
        <div className={styles.profilePanel}>
            <div className={styles.profileStats}>
                <div className={styles.profileClassAndLevel}>
                    <span>
                        <FaTrophy /> {player.className || "Not Selected"} | {player.level}
                    </span>
                </div>
                <div className={styles.profileClassAndLevel}>
                    <span>
                        <FaShieldAlt /> {player.health}
                    </span>
                </div>
                <div className={styles.profileClassAndLevel}>
                    <span>
                        <FaCoins /> {player.gold}
                    </span>
                </div>
            </div>
            <FaStar /> Exp: {player.exp}
            <div className={styles.expBarContainer}>
                <div className={styles.expBar} style={{ width: `${expPercentage}%` }}></div>
            </div>
        </div>
    );
};

export default ProfilePanel;