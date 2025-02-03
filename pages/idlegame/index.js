import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '@components/rpgidler/Header';
import Footer from '@components/rpgidler/Footer';
import ClassSelection from '@components/rpgidler/ui/ClassSelection';
import ProfilePanel from '@components/rpgidler/ui/ProfilePanel';
import Controls from '@components/rpgidler/ui/GameControls';
import AutoFightBox from '@components/rpgidler/ui/AutoFightBox';
import IdleBox from '@components/rpgidler/ui/IdleBox';
import BuffStatusBox from '@components/rpgidler/ui/BuffStatusBox';
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

    const [autoFight, setAutoFight] = useState(false);
    const [isChoosingClass, setIsChoosingClass] = useState(true);
    const [buffs, setBuffs] = useState([]); // New Buff State
    const playerRef = useRef(player);

    const fightTimer = 15000 / player.level;
    const goldTimer = 12000 / player.level;

    useEffect(() => { playerRef.current = player; }, [player]);

    const updatePlayer = (updates) => setPlayer((prev) => ({ ...prev, ...updates }));

    const fetchPlayerData = async (className = player.className) => {
        try {
            const res = await axios.get('/api/gameApi/player', { params: { level: playerRef.current.level, className } });
            updatePlayer(res.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const handleClassSelect = async (selectedClass, stats) => {
        updatePlayer({ className: selectedClass, stats });
        setIsChoosingClass(false);
    };

    const handleFight = async () => {
        if (!player.className) return;
        try {
            const response = await axios.post('/api/gameApi/fight', { player: playerRef.current });
            updatePlayer(response.data);
        } catch (error) {
            console.error('Error during fight:', error);
        }
    };

    const handleIdle = async () => {
        if (!player.className) return;
        try {
            const response = await axios.post('/api/gameApi/idle', { player: playerRef.current });
            updatePlayer({ gold: response.data.gold });
        } catch (error) {
            console.error('Error during idle:', error);
        }
    };

    useEffect(() => {
        if (!player.className || !autoFight) return;
        const interval = setInterval(handleFight, fightTimer);
        return () => clearInterval(interval);
    }, [autoFight, player.className]);

    useEffect(() => {
        if (!player.className) return;
        const interval = setInterval(handleIdle, goldTimer);
        return () => clearInterval(interval);
    }, [player.className]);

    useEffect(() => {
        if (!player.className) return;
        fetchPlayerData();
    }, [player.className]);

    return (
        <div className={styles.gameContainer}>
            <Head>
                <title>RPG Idle Game | Fight. Loot. Survive.</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="RPG Idle Sample" />
            {isChoosingClass ? (
                <ClassSelection handleClassSelect={handleClassSelect} />
            ) : (
                <>
                        <ProfilePanel player={player} />
                        <Controls handleFight={handleFight} autoFight={autoFight} setAutoFight={setAutoFight} />
                    <div className={styles.infoBoxes}>
                        <AutoFightBox autoFight={autoFight} fightTimer={fightTimer} />
                        <IdleBox goldTimer={goldTimer} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;