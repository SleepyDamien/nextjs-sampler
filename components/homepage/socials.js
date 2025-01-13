import Link from 'next/link'
import styles from '@styles/HomePage.module.css'
import { FaSquareGithub, FaLinkedin, FaSquareInstagram, FaYoutube } from "react-icons/fa6";

export default function SocialLinks() {
    return (
        <div className={styles.socialLinksContainer}>
            <Link href="https://github.com/SleepyDamien"><FaSquareGithub /></Link> 
            <Link href="https://linkedin.com/in/damien-rincon"><FaLinkedin /></Link> 
            <Link href="https://instagram.com/1024kb.dev"><FaSquareInstagram /></Link> 
        </div>
    );
}
