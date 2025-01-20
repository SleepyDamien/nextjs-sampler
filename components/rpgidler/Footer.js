import styles from './Footer.module.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks}>
                <a href="https://github.com/SleepyDamien" className={styles.socialLink} aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://github.com/SleepyDamien" className={styles.socialLink} aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
            </div>

            <div className={styles.pageLinks}>
                <a href="https://github.com/SleepyDamien" className={styles.pageLink}>Contact Us</a>
                <a href="https://damien-sandbox.netlify.app/privacy" className={styles.pageLink}>Privacy Policy</a>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; 2024 sleepyDamien. All rights reserved.</p>
            </div>
        </footer>
    );
}
