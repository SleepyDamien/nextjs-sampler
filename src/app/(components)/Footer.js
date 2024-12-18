'use client';

import Link from 'next/link'
import styles from './Footer.module.css'
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks}>
                <Link href="https://github.com/SleepyDamien" className={styles.socialLink} aria-label="Instagram">
                      <FaGithub />
                </Link>
            </div>

            <div className={styles.pageLinks}>
                <Link href="https://github.com/SleepyDamien" className={styles.pageLink}>Contact Me</Link>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; 2024 SleepyDamien. All rights reserved.</p>
            </div>
        </footer>
    );
}
