"use client";

import styles from './StatusBar.module.css';
import { useEffect, useState } from 'react';

export default function StatusBar() {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.statusBar}>
            <div className={styles.left}>
                <span className={styles.time}>{time}</span>
            </div>
            <div className={styles.right}>
                <span className={styles.date}>{date}</span>
                {/* Add more status icons here (wifi, battery, etc.) if needed */}
            </div>
        </div>
    );
}
