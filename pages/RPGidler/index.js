import Head from 'next/head'
import Header from '@components/rpgidler/Header'
import Footer from '@components/rpgidler/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShieldAlt, FaCoins, FaTrophy, FaStar } from 'react-icons/fa';  // React Icons
import styles from '@styles/IdleGame.module.css';

const Game = () => {
    const [player, setPlayer] = useState({
        level: 1,
        health: 100,
        gold: 0,
        exp: 0,
    });

    const [gameLog, setGameLog] = useState([]);

    // Fetch player data from the API
    const fetchPlayerData = async () => {
        try {
            const res = await axios.get('/api/gameApi/player', { params: { player } });
            setPlayer(res.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    // Handle fight action (battle with monster)
    const handleFight = async () => {
        // Add the animation class to the button
        const fightButton = document.getElementById('fightButton');
        fightButton.classList.add(styles.shakeButton);

        try {
            const response = await axios.post('/api/gameApi/fight', { player });

            // Compare the level to determine level up was sent
            if (player.level < response.data.level) {
                setGameLog((prevLog) => [
                    ...prevLog,
                    `You leveled up!`,
                ]);
            }

            setPlayer(response.data);
            // Log the fight result
            setGameLog((prevLog) => [
                ...prevLog,
                `Fought a monster and now have ${response.data.exp} EXP and ${response.data.gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during fight:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred during the fight.']);
        }

        // Remove the animation class after the animation completes
        setTimeout(() => {
            fightButton.classList.remove(styles.shakeButton);
        }, 500); // Duration of the shake animation
    };

    // Handle idle action (gain gold over time)
    const handleIdle = async () => {
        // Add the glow effect to indicate idling
        const idleButton = document.getElementById('idleButton');
        idleButton.classList.add(styles.glowButton);

        try {
            const response = await axios.post('/api/gameApi/idle', { player });
            setPlayer(response.data);

            // Log the idle action result
            setGameLog((prevLog) => [
                ...prevLog,
                `Idled and gained ${response.data.gold} gold.`,
            ]);
        } catch (error) {
            console.error('Error during idle:', error);
            setGameLog((prevLog) => [...prevLog, 'An error occurred while idling.']);
        }

        // Remove the glow effect after a while
        setTimeout(() => {
            idleButton.classList.remove(styles.glowButton);
        }, 1000); // Duration of the glow effect
    };

    // Calculate EXP bar width (percentage)
    const expPercentage = (player.exp / (100 * player.level)) * 100; // Assuming 100 EXP per level

    useEffect(() => {
        fetchPlayerData();
    }, []);

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
                    <p>No game events yet. Start playing!</p>
                ) : (
                    gameLog.map((log, index) => <p key={index}>{log}</p>)
                )}
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
                    id="idleButton"
                    className={styles.gameButton}
                    onClick={handleIdle}
                >
                    Skill for Gold
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Game;