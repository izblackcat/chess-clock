// src/hooks/useChessGame.ts
import { useState, useEffect } from 'react';
import type { Player } from '../types';
import { useWakeLock } from './useWakeLock'; // Assuming you created this from previous advice

export const useChessGame = () => {
    // CONFIG
    const [initialTime, setInitialTime] = useState<number>(600);
    const [increment, setIncrement] = useState<number>(0);

    // STATE
    const [whiteTime, setWhiteTime] = useState<number>(600);
    const [blackTime, setBlackTime] = useState<number>(600);
    const [activeTurn, setActiveTurn] = useState<Player>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const { requestWakeLock, releaseWakeLock } = useWakeLock();

    useEffect(() => {
        let interval: number | undefined;

        if (activeTurn && !isPaused) {
            requestWakeLock();
            interval = setInterval(() => {
                if (activeTurn === 'white') {
                    setWhiteTime((prev) => Math.max(0, prev - 1));
                } else {
                    setBlackTime((prev) => Math.max(0, prev - 1));
                }
            }, 1000);
        } else {
            releaseWakeLock();
        }

        return () => {
            clearInterval(interval);
            releaseWakeLock();
        };

    }, [activeTurn, isPaused, requestWakeLock, releaseWakeLock]);

    // ACTIONS
    const switchTurn = (player: 'white' | 'black') => {
        if (isPaused) {
            setIsPaused(false);
            return;
        }

        if (!activeTurn) {
            setActiveTurn(player === 'white' ? 'black' : 'white');
            return;
        }

        if (player === activeTurn) {
            if (player === 'white') setWhiteTime((t) => t + increment);
            else setBlackTime((t) => t + increment);
            setActiveTurn(player === 'white' ? 'black' : 'white');
        }
    };

    const togglePause = () => {
        if (!activeTurn) return;
        setIsPaused((prev) => !prev);
    };

    const resetGame = () => {
        setIsPaused(false);
        setActiveTurn(null);
        setWhiteTime(initialTime);
        setBlackTime(initialTime);
    };

    const configureGame = (minutes: number, inc: number) => {
        const seconds = minutes * 60;
        setInitialTime(seconds);
        setIncrement(inc);
        setWhiteTime(seconds);
        setBlackTime(seconds);
        setActiveTurn(null);
        setIsPaused(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return {
        whiteTime,
        blackTime,
        activeTurn,
        isPaused,
        switchTurn,
        togglePause,
        resetGame,
        configureGame,
        formatTime,
    };
};