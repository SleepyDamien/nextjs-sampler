import Head from 'next/head';
import Header from '@components/rpgidler/Header';
import Footer from '@components/rpgidler/Footer';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaShieldAlt, FaCoins, FaTrophy, FaStar } from 'react-icons/fa';
import styles from '@styles/IdleGame.module.css';

const Game = () => {
    const [player, setPlayer] = useState({
        level: 1,
        health: 100,
        gold: 0,
        exp: 0,
    });

    const [gameLog, setGameLog] = useState([]);
    const [autoFight, setAutoFight] = useState(false); // Auto-fight toggle
    const logEndRef = useRef(null);
    const playerRef = useRef(player); // Use ref to hold player state persistently

    // Update player ref whenever state changes
    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    // Shared function to update player state
    const updatePlayer = (updates) => {
        console.log("Updating Player with: " + JSON.stringify(updates));
        setPlayer((prev) => ({
            ...prev,
            ...updates, // Merge the updates with the current player state
        }));
    };

    // Fetch player data from the API
    const fetchPlayerData = async () => {
        try {
            const res = await axios.get('/api/gameApi/player', { params: { player: playerRef.current } });
            updatePlayer(res.data);
            console.log("Player fetched.")
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const handleFight = async () => {
        try {
            const response = await axios.post('/api/gameApi/fight', { player: playerRef.current });
            const { exp, gold, level } = response.data;

            updatePlayer({
                exp, // Update exp
                gold, // Update gold
                level, // Update level if it changes
            });

            if (player.level < level) {
                setGameLog((prevLog) => [...prevLog, `You leveled up!`]);
            }

            setGameLog((prevLog) => [
                ...prevLog,
                `Fought a monster and now have ${exp} EXP and ${gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during fight:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred during the fight.']);
        }
    };

    const handleIdle = async () => {
        try {
            const response = await axios.post('/api/gameApi/idle', { player: playerRef.current });
            const { gold } = response.data;

            updatePlayer({ gold }); // Only update gold

            setGameLog((prevLog) => [
                ...prevLog,
                `Idled and now have ${gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during idle:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred while idling.']);
        }
    };

    // Auto-fight interval
    useEffect(() => {
        if (!autoFight) return;

        const fightTimer = 15000 / player.level * 1;
        const intervalFight = setInterval(() => {
            handleFight();
        }, fightTimer); // Interval for auto-fight

        return () => clearInterval(intervalFight);
    }, [autoFight]);

    // Idle gold interval
    useEffect(() => {
        const goldTimer = 12000 / player.level * 1;
        const intervalGold = setInterval(() => {
            handleIdle();
        }, goldTimer); // Interval for idle gold

        return () => clearInterval(intervalGold);
    }, []); // Runs independently of `autoFight` or `player`

    // Automatically scroll to the bottom of the game log when a new entry is added
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gameLog]);

    useEffect(() => {
        fetchPlayerData();
    }, []);

    const expPercentage = (player.exp / (100 * player.level)) * 100;

    return (
        <div className={styles.gameContainer}>
            <Head>
                <title> RPG Idle Game | Fight. Loot. Survive.</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="RPG Idle Sample" />

            {/* Profile Panel */}
            <div className={styles.profilePanel}>
                <div className={styles.profileHeader}>
                    <h2>Player Profile</h2>
                </div>

                <div className={styles.profileStats}>
                    <div className={styles.statItem}>
                        <FaTrophy className={styles.icon} />
                        <p>Level: {player.level}</p>
                    </div>
                    <div className={styles.statItem}>
                        <FaShieldAlt className={styles.icon} />
                        <p>Health: {player.health}</p>
                    </div>
                    <div className={styles.statItem}>
                        <FaCoins className={styles.icon} />
                        <p>Gold: {player.gold}</p>
                    </div>
                    <div className={styles.statItem}>
                        <FaStar className={styles.icon} />
                        <p>Exp: {player.exp}</p>
                    </div>
                </div>

                {/* EXP Bar */}
                <div className={styles.expBarContainer}>
                    <div className={styles.expBar} style={{ width: `${expPercentage}%` }}></div>
                </div>
            </div>

            <div id="logArea" className={styles.gameLogArea}>
                {gameLog.length === 0 ? (
                    <p>Your journey begins now.</p>
                ) : (
                    gameLog.map((log, index) => <p key={index}>{log}</p>)
                )}
                {/* Scroll to the latest log entry */}
                <div ref={logEndRef}></div>
            </div>

            <div id="controlArea">
                <button
                    id="fightButton"
                    className={styles.gameButton}
                    onClick={handleFight}
                >
                    Fight Monsters
                </button>
                <button
                    id="toggleAutoFight"
                    className={`${styles.gameButton} ${autoFight ? styles.activeButton : ''}`}
                    onClick={() => setAutoFight((prev) => !prev)}
                >
                    {autoFight ? 'Stop Auto-Fight' : 'Start Auto-Fight'}
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Game;