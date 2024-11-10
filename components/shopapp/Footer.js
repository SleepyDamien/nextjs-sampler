import styles from './Footer.module.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                    <FaTwitter />
                </a>
            </div>

            <div className={styles.pageLinks}>
                <a href="#" className={styles.pageLink}>Contact Us</a>
                <a href="#" className={styles.pageLink}>Privacy Policy</a>
                <a href="#" className={styles.pageLink}>Exchange Policies</a>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; 2024 YourCompany. All rights reserved.</p>
            </div>
        </footer>
    );
}