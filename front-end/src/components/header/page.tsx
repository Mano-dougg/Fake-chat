import styles from "./page.module.css"
import Image from "next/image"
import moon from "./images/moon.svg"

export function Header() {
    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.h1Header}> FAKE CHAT </h1>
            </div>
            <nav className={styles.navbar}>
                <div>
                    <p className={styles.pNavBar}> Modo Escuro </p>
                </div>
                <div>
                    <Image
                        src={moon}
                        width={24}
                        height={24}
                        alt="Picture of a moon"
                    />
                </div>
            </nav>
        </header>
    )
}