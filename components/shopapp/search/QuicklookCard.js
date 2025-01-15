import styles from './Footer.module.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
export default function QuicklookCard(quicklookItem) {
    return (
        <div className={styles.quicklookStyling} id="quicklookWindow">
            <span className={styles.quicklookClose} onClick={handleQuicklookClose}><IoIosCloseCircle /></span>
            <div className={styles.quicklookImageFrame}>
                <img
                    src={quicklookItem.image}
                    alt={quicklookItem.name}
                    className={styles.productImage}
                />
            </div>
            <div className={styles.productDetails}>
                <div className={styles.productTitle}><strong>{quicklookItem.name}</strong></div>
                <div className={styles.price}>{quicklookItem.price}</div>
                <div>
                    <TiStarFullOutline />
                    <TiStarFullOutline />
                    <TiStarFullOutline />
                    <TiStarFullOutline />
                    <TiStarHalfOutline />
                    <span><strong>({Math.floor(Math.random() * 5)})</strong></span>
                </div>

            </div>
        </div>
    );
}
