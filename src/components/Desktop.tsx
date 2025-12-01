import styles from './Desktop.module.css';
import SafariBar from './SafariBar';
import AppIcon from './AppIcon';
import Terminal from './Terminal';

const apps = [
    {
        id: 1,
        name: 'MissAnime',
        url: 'https://www.missanime.com/',
        category: 'Entertainment',
        iconImage: '/icons/missanime.png',
    },
    {
        id: 2,
        name: 'CaFinder',
        url: 'https://cafinder.vercel.app/',
        category: 'Utility',
        iconImage: '/icons/cafinder.svg',
    },
    {
        id: 3,
        name: 'Crunchy-Skip',
        url: 'https://chromewebstore.google.com/detail/crunchy-skip/gkkblgjjgfbddmpaehhicpfaapiepopj?authuser=0&hl=en-GB',
        category: 'Utility',
        iconImage: '/icons/crunchyskip.png',
    },
];

export default function Desktop() {
    return (
        <div className={styles.desktop}>
            <SafariBar />
            <div className={styles.appGrid}>
                {apps.map((app) => (
                    <AppIcon
                        key={app.id}
                        name={app.name}
                        url={app.url}
                        iconImage={app.iconImage}
                    />
                ))}
            </div>
            <div className={styles.terminalContainer}>
                <Terminal />
            </div>
        </div>
    );
}
