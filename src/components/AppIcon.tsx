import styles from './AppIcon.module.css';
import Image from 'next/image';

interface AppIconProps {
    name: string;
    url: string;
    iconImage?: string; // URL or path to image
    color?: string; // Fallback color if no image
}

export default function AppIcon({ name, url, iconImage, color }: AppIconProps) {
    const backgroundColor = color || (iconImage ? '#ffffff' : '#333');
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.appIconContainer}>
            <div className={styles.icon} style={{ backgroundColor }}>
                {iconImage ? (
                    <Image src={iconImage} alt={name} width={60} height={60} className={styles.image} />
                ) : (
                    <span className={styles.initial}>{name.charAt(0)}</span>
                )}
            </div>
            <span className={styles.name}>{name}</span>
        </a>
    );
}
