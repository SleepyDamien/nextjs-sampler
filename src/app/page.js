
import Link from 'next/link'
import { FaSquareGithub, FaLink } from "react-icons/fa6";

export const metadata = {
    title: 'Damien Rincon | Next.JS sandbox',
}

export default function Page() {
    return (
        <div>
                <p className="description">
                    Each app is designed with a general concept in mind. Keep in mind these are conceptual and W.I.P applications I do in my free time.
                    Feel free to reach out to me via linkedin!
                </p>
                <p>
                    <Link href="https://github.com/SleepyDamien"><FaSquareGithub /> View my GitHub!</Link>
                </p>

                <div className="miniNav">
                    Custom mini applications
                    <ul>
                        <li><Link href="shopapp"><FaLink /> Shop App Demo</Link> </li>
                        <li><Link href="RPGidler"><FaLink /> Idle RPG game Demo</Link> </li>
                    </ul>
                </div>
        </div>
    )
}