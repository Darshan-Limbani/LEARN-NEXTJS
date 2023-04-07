import Search from "@/components/Search";
import AuthContext from "@/context/AuthContext";
import styles from '@/styles/Header.module.css';
import Link from "next/link";
import {useContext} from "react";
import {FaSignInAlt} from "react-icons/fa";

export default function Header() {

    const {user, logOut} = useContext(AuthContext);


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={'/'}> DJ Events</Link>
            </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href={'/events'}>
                            Events
                        </Link>
                    </li>
                    {user ? <>
                        <li>
                            <Link href={'/events/add'}>
                                Add Event
                            </Link>
                        </li>
                        <li>
                            <Link href={'/account/dashboard'}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => logOut} className={'btn-secondary btn-icon'}>
                                Logout
                            </button>
                        </li>
                    </> : <>
                        <li>
                            <Link href={'/account/login'} className={'btn-secondary btn-icon'}>
                                <FaSignInAlt/> Login
                            </Link>
                        </li>
                    </>}


                </ul>
            </nav>

        </header>
    );
}