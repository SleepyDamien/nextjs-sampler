import Link from 'next/link'
import styles from '@styles/HomePage.module.css'

export default function About() {
    return (
        <div className={styles.aboutSection}>
            <span>
                <p>I am a full stack dev with 9 years of experience, who is constantly looking to expand their skillset!</p>
                <p>Feel free to check out the micro-sites below, or view the code directly on GitHub!</p>
                <p>Check out my blog if you want some of my knowledge share.</p>
                <Link href="https://blog.1024kb.dev">blog.1024kb.dev</Link>
            </span>
        </div>
    );
}
