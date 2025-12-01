"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';

const COMMANDS = {
    help: `Available commands:
  Info: resume, skills, contact, github, linkedin, about, whoami
  Files: ls, pwd
  Actions: open <app>
  Utils: help, man <cmd>, history, echo <text>, clear, date
  System: uname [-a], uptime, id, who, ps`,
    whoami: 'gaurav.sh.jpr@gmail.com',
    ls: 'MissAnime  CaFinder  CrunchySkip',
    about: 'Full-stack developer (kinda - Backend first full-stack) passionate about building interactive web experiences. Welcome to my digital playground!',
    skills: 'Java, Python, Node.js, React, Spring, ExpressJS, AWS (S3, Lambda, Step Functions, SQS, SNS, API Gateway), MySQL, MongoDB, Distributed Systems, Microservices, Serverless, Caching, Asynchronous Queues, CI/CD, Agile/Scrum',
    contact: 'Email: gaurav.sh.jpr@gmail.com\nLinkedIn: https://www.linkedin.com/in/gauravsh92/',
    pwd: '/home/gaurav/unplay.me/apps',
    github: 'https://github.com/gaurav-sharma-gs',
    linkedin: 'https://www.linkedin.com/in/gauravsh92/',
    resume: `
╔════════════════════════════════════════════════════════════════╗
║                        GAURAV SHARMA                           ║
║     Toronto, ON │ gaurav.sh.jpr@gmail.com │ (647)-819-1407    ║
║              linkedin.com/in/gauravsh92                        ║
╚════════════════════════════════════════════════════════════════╝

SUMMARY
─────────────────────────────────────────────────────────────────
Experienced in building scalable backend systems and distributed
cloud platforms for e-commerce and supply chain, with deep
technical expertise complemented by MBA-driven leadership.

SKILLS
─────────────────────────────────────────────────────────────────
Java, Python, Node.js, React, Spring, ExpressJS
AWS (S3, Lambda, Step Functions, SQS, SNS, API Gateway)
MySQL, MongoDB, Distributed Systems, Microservices
Serverless, Caching, Asynchronous Queues, CI/CD, Agile/Scrum

EDUCATION
─────────────────────────────────────────────────────────────────
Schulich School of Business                        2019 - 2020
Master of Business Administration, Marketing

Vellore Institute of Technology                    2010 - 2014
Bachelor of Technology, Computer Science and Engineering

EXPERIENCE
─────────────────────────────────────────────────────────────────
Amazon Development Centre                   May 2023 – Dec 2024
Senior Software Development Engineer

• Led migration from proprietary Bufo storage to Amazon S3
  across five backend services with dual-write architecture
• Onboarded Cradle jobs for C3+ and CCVS to Maestro platform
• Enhanced C3+ Portal with cost analysis features

Commerce Fabric (Fabric Inc.)                May 2021 – Jun 2022
Senior Software Development Engineer

• Developed Vendor Management System within PIM
• Improved PIM scalability to support 1M SKUs
• Migrated Node.js microservices from Serverless to ECS
• Increased item import throughput from 6K to 100K items/hour

Flipkart Internet Private Limited            Jul 2016 – Jun 2018
Senior Software Development Engineer

• Re-architected monolithic warehouse management app
• Redesigned Intra-Warehouse Transfer system (500 → 50K items)
• Integrated Quality Check Service into WMS

Software Development Engineer                May 2015 – Jan 2016

• Consolidated multi-seller shipments, saved $5M+ annually
• Reduced turnaround time of requests by 40%
• Optimized packing algorithms, reduced packaging cost by 10%

HomeShop18 (Reliance Retail)                 Jun 2014 – May 2015
Trainee Software Engineer

• Built internal tools for archived data retrieval
• Enabled bulk static table processing for Customer Service
`,
};

const APPS = {
    missanime: 'https://www.missanime.com/',
    cafinder: 'https://cafinder.vercel.app/',
    crunchyskip: 'https://chromewebstore.google.com/detail/crunchy-skip/gkkblgjjgfbddmpaehhicpfaapiepopj?authuser=0&hl=en-GB',
};

const APP_INFO = {
    missanime: `MissAnime - Anime Streaming Platform
A comprehensive anime streaming website providing users with access to a vast library of anime content.`,
    cafinder: `CaFinder - Coffee Shop Finder
A web application that helps users discover and locate coffee shops in their area with detailed information and reviews.`,
    crunchyskip: `Crunchy-Skip - Chrome Extension
A Chrome extension that automatically skips intros and outros on Crunchyroll, enhancing the anime watching experience.`,
};

const SYSTEM_INFO = {
    uname: 'Darwin unplay.me 24.0.0 Darwin Kernel Version 24.0.0: Mon Dec 1 00:00:00 PST 2025; root:xnu-10000.0.0~1/RELEASE_ARM64_T6000 arm64',
    uptime: ' 10:00:00 up 1 day, 1 user, load averages: 1.41 1.56 1.57',
    id: 'uid=501(gaurav) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),80(admin),98(_lpadmin),701(com.apple.sharepoint.group.1)',
    who: 'gaurav   console  Dec 1 09:00',
    ps: `  PID TTY           TIME CMD
 1337 ttys000    0:00.05 /bin/zsh
 2025 ttys000    0:00.01 ./unplay-os`,
};

const MAN_PAGES = {
    help: 'Display available commands grouped by category',
    resume: 'Display full resume with experience, education, and skills',
    skills: 'List technical skills and technologies',
    contact: 'Show contact information (email and LinkedIn)',
    github: 'Open GitHub profile in a new tab',
    linkedin: 'Open LinkedIn profile in a new tab',
    about: 'Display brief professional summary',
    whoami: 'Show email address',
    ls: 'List available projects/applications',
    pwd: 'Print current working directory path',
    open: 'Open a specific app in a new tab. Usage: open <app_name>',
    man: 'Display manual page for a command or app. Usage: man <command|app>',
    history: 'Show command history from current session',
    echo: 'Print text to terminal. Usage: echo <text>',
    clear: 'Clear the terminal screen',
    date: 'Display current date and time',
    uname: 'Print system information',
    uptime: 'Show how long system has been running',
    id: 'Print user and group IDs',
    who: 'Show who is logged on',
    ps: 'Report a snapshot of the current processes',
};

export default function Terminal() {
    const [history, setHistory] = useState<string[]>(['Welcome to unplay.me terminal v1.0.0', 'Type "help" for available commands.']);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
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

        // Add to command history
        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = '';

        switch (command) {
            case 'help':
            case 'whoami':
            case 'ls':
            case 'about':
            case 'skills':
            case 'contact':
            case 'pwd':
            case 'resume':
                output = COMMANDS[command];
                break;
            case 'uname':
                output = args.includes('-a') ? SYSTEM_INFO.uname : 'Darwin';
                break;
            case 'uptime':
            case 'id':
            case 'who':
            case 'ps':
                output = SYSTEM_INFO[command];
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'echo':
                output = args.join(' ');
                break;

            case 'history':
                output = history.filter(h => h.startsWith('>')).join('\n');
                break;
            case 'man':
                if (args.length === 0) {
                    output = 'What manual page do you want?\nUsage: man <command|app_name>';
                } else {
                    const query = args[0].toLowerCase();
                    // Check MAN_PAGES first, then APP_INFO
                    if (MAN_PAGES[query as keyof typeof MAN_PAGES]) {
                        output = `${args[0].toUpperCase()}\n${'─'.repeat(40)}\n${MAN_PAGES[query as keyof typeof MAN_PAGES]}`;
                    } else if (APP_INFO[query as keyof typeof APP_INFO]) {
                        output = APP_INFO[query as keyof typeof APP_INFO];
                    } else {
                        output = `No manual entry for '${args[0]}'`;
                    }
                }
                break;

            case 'github':
            case 'linkedin':
                output = `Opening ${command}...`;
                window.open(COMMANDS[command], '_blank');
                break;
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
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;

            const newIndex = historyIndex + 1;

            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput('');
            } else {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
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
                    <span className={styles.prompt}>gaurav@unplay.me ~ %</span>
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
