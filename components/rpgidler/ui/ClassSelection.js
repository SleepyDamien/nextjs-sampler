import useSWR from 'swr';
import styles from '@styles/IdleGame.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ClassSelection = ({ handleClassSelect }) => {
    const classNames = ["warrior", "mage", "rogue"];
    const { data, error } = useSWR(() => `/api/gameApi/classes`, fetcher);

    if (error) return <p>Error loading class stats...</p>;
    if (!data) return <p>Loading class stats...</p>;

    return (
        <div className={styles.classSelection}>
            <h2>Choose Your Class</h2>
            {classNames.map((className) => {
                const stats = data[className]; // Get stats for each class
                return (
                    <div key={className} onClick={() => handleClassSelect(className, stats)} className={`${styles.classCardContainer} ${styles[`${className}CardContainer`]}`}>
                        <div className={`${styles.classCardContentContainer} ${styles[`${className}CardContentContainer`]}`}>
                            <div className={styles.classCardImageContainer}></div>
                            <div className={styles.classCardDescription}>
                                <span><b>{stats.className}</b></span>
                                <ul>
                                    {Object.entries(stats).map(([key, value]) =>
                                        key !== "className" ? <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li> : null
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ClassSelection;