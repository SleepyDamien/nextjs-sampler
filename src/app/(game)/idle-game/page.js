import Head from 'next/head';
import Header from 'src/app/(components)/game/Header';
import Footer from 'src/app/(components)/game/Footer';
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
        className: null,
        stats: {},
    });

    const [gameLog, setGameLog] = useState([]);
    const [autoFight, setAutoFight] = useState(false);
    const [isChoosingClass, setIsChoosingClass] = useState(true);
    const logEndRef = useRef(null);
    const playerRef = useRef(player);

    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    const updatePlayer = (updates) => {
        setPlayer((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    const fetchPlayerData = async (className = player.className) => {
        try {
            const res = await axios.get('/api/gameApi/player', { params: { level: playerRef.current.level, className } });
            const { stats, ...rest } = res.data;
            updatePlayer({ stats, ...rest });
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const handleClassSelect = async (selectedClass) => {
        updatePlayer({ className: selectedClass });
        await fetchPlayerData(selectedClass);
        setIsChoosingClass(false);
        setGameLog((prevLog) => [...prevLog, `You chose the path of the ${selectedClass}.`]);
    };

    const handleFight = async () => {
        if (!player.className) return;
        try {
            const response = await axios.post('/api/gameApi/fight', { player: playerRef.current });
            const { exp, gold, level } = response.data;

            updatePlayer({ exp, gold, level });

            if (player.level < level) {
                setGameLog((prevLog) => [...prevLog, `You leveled up!`]);
            }

            setGameLog((prevLog) => [
                ...prevLog,
                `You fight off some bandits and now have ${exp} EXP and ${gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during fight:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred during the fight.']);
        }
    };

    const handleIdle = async () => {
        if (!player.className) return;
        try {
            const response = await axios.post('/api/gameApi/idle', { player: playerRef.current });
            const { gold } = response.data;

            updatePlayer({ gold });

            setGameLog((prevLog) => [
                ...prevLog,
                `You do work around town and now have ${gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during idle:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred while idling.']);
        }
    };

    useEffect(() => {
        if (!player.className || !autoFight) return;

        const fightTimer = 15000 / player.level * 1;
        const intervalFight = setInterval(() => {
            handleFight();
        }, fightTimer);

        return () => clearInterval(intervalFight);
    }, [autoFight, player.className]);

    useEffect(() => {
        if (!player.className) return;

        const goldTimer = 12000 / player.level * 1;
        const intervalGold = setInterval(() => {
            handleIdle();
        }, goldTimer);

        return () => clearInterval(intervalGold);
    }, [player.className]);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gameLog]);

    useEffect(() => {
        if (!player.className) return;
        fetchPlayerData();
    }, [player.className]);

    const expPercentage = (player.exp / (100 * player.level)) * 100;

    return (
        <div className={styles.gameContainer}>
            <Head>
                <title>RPG Idle Game | Fight. Loot. Survive.</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="RPG Idle Sample" />

            {/* Character Class Selection */}
            {isChoosingClass ? (
                <div className={styles.classSelection}>
                    <h2>Choose Your Class</h2>
                    <button onClick={() => handleClassSelect('warrior')} className={styles.classButton}>Warrior</button>
                    <button onClick={() => handleClassSelect('mage')} className={styles.classButton}>Mage</button>
                    <button onClick={() => handleClassSelect('rogue')} className={styles.classButton}>Rogue</button>
                </div>
            ) : (
                <>
                    {/* Profile Panel */}
                    <div className={styles.profilePanel}>
                        <div className={styles.profileHeader}>
                            <h2>Player Profile</h2>
                        </div>

                        <div className={styles.profileStats}>
                            <div className={styles.statItem}>
                                <FaTrophy className={styles.icon} />
                                <p>Class: {player.className || "Not Selected"}</p>
                            </div>
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

                    {/* Game Log */}
                    <div className={styles.gameLogArea}>
                        {gameLog.map((log, index) => <p key={index}>{log}</p>)}
                        <div ref={logEndRef}></div>
                    </div>

                    {/* Controls */}
                    <div id="controlArea">
                        <button onClick={handleFight} className={styles.gameButton}>Fight Monsters</button>
                        <button onClick={() => setAutoFight((prev) => !prev)}
                            className={`${styles.gameButton} ${autoFight ? styles.activeButton : ''}`}>
                            {autoFight ? 'Stop Auto-Fight' : 'Start Auto-Fight'}
                        </button>
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
};

export default Game;