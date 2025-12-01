"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';

const COMMANDS = {
    help: 'Available commands: help, ls, open <app_name>, clear, whoami, date',
    whoami: 'guest@unplay.me',
    ls: 'MissAnime  CaFinder  CrunchySkip',
};

const APPS = {
    missanime: 'https://www.missanime.com/',
    cafinder: 'https://cafinder.vercel.app/',
    crunchyskip: 'https://chromewebstore.google.com/detail/crunchy-skip/gkkblgjjgfbddmpaehhicpfaapiepopj?authuser=0&hl=en-GB',
};

export default function Terminal() {
    const [history, setHistory] = useState<string[]>(['Welcome to unplay.me terminal v1.0.0', 'Type "help" for available commands.']);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = '';

        switch (command) {
            case 'help':
            case 'whoami':
            case 'ls':
                output = COMMANDS[command];
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'open':
                if (args.length === 0) {
                    output = 'Usage: open <app_name>';
                } else {
                    const appName = args[0].toLowerCase();
                    const url = APPS[appName as keyof typeof APPS];
                    if (url) {
                        output = `Opening ${args[0]}...`;
                        window.open(url, '_blank');
                    } else {
                        output = `App not found: ${args[0]}. Type "ls" to see available apps.`;
                    }
                }
                break;
            default:
                output = `Command not found: ${command}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            <div className={styles.header}>
                <div className={styles.trafficLights}>
                    <div className={`${styles.light} ${styles.red}`}></div>
                    <div className={`${styles.light} ${styles.yellow}`}></div>
                    <div className={`${styles.light} ${styles.green}`}></div>
                </div>
                <span className={styles.title}>Terminal</span>
            </div>
            <div className={styles.content}>
                {history.map((line, i) => (
                    <div key={i} className={styles.line}>{line}</div>
                ))}
                <div className={styles.inputLine}>
                    <span className={styles.prompt}>{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
