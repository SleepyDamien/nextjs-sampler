import Link from 'next/link'
import styles from '@styles/HomePage.module.css'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdGamepad } from "react-icons/md";
import { SiNextdotjs } from "react-icons/si";
import { BsFiletypeJson } from "react-icons/bs";
import { RiJavascriptFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";


export default function MicroSiteSection() {


    return (
    <div className={styles.miniNav}>
        <ul>
           <li>
            <Link href="shopapp">
               <div className={styles.micrositeTile}>
                   <div className={styles.leftTileSection}>
                       <div className={styles.tileIconContainer}>
                          <AiOutlineShoppingCart className={styles.tileIcon} />
                       </div>
                   </div>
                   <div className={styles.rightTileSection}>
                                <span className={styles.tileTitle}>Shop Demo
                                    <div className={styles.techstackIcons}>
                                        <SiNextdotjs /> <BsFiletypeJson /> <RiJavascriptFill /> <TbApi />
                                    </div>
                                </span>
                       <span className={styles.tileDescription}>This project focuses on searching and utilizing API for item cards.</span>

                   </div>
               </div>
            </Link>
                </li>
                <li>
                    <Link href="idlegame">
                        <div className={styles.micrositeTile}>
                            <div className={styles.leftTileSection}>
                                <div className={styles.tileIconContainer}>
                                    <MdGamepad className={styles.tileIcon} />
                                </div>
                            </div>
                            <div className={styles.rightTileSection}>
                                <span className={styles.tileTitle}>Game Demo
                                    <div className={styles.techstackIcons}>
                                        <SiNextdotjs /> <BsFiletypeJson /> <RiJavascriptFill /> <TbApi />
                                    </div>
                                </span>
                                <span className={styles.tileDescription}>This project focuses on API calls and session states</span>
                            </div>
                        </div>
                    </Link>
                </li>
        </ul>
    </div>
    );
}
