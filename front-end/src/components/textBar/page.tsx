"use client"
import { useState } from "react"
import styles from "./page.module.css"
import Image from "next/image";
import submitWhite from "./images/submit white.svg"

interface TextBarProps {
    onSubmit: (text: string) => void;
}

export function TextBar({ onSubmit }: TextBarProps) {

    const [text, setText] = useState<string>("");

    const handleSubmit = () => {
            onSubmit(text);
            setText("");
    };

    return(
        <main className={styles.textBar}>
            <section className={styles.textBarUpper}>
                <input 
                    className={styles.inputTextBar} 
                    placeholder="Digite aqui"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Image
                    className={styles.imageButton}
                    src={submitWhite}
                    width={40}
                    height={40}
                    alt="Picture of a sent button"
                    onClick={handleSubmit}
                />
            </section>  
            <section className={styles.textBarDown}>
                <p className={styles.pTextBarDown}> FakeChat can make mistakes. Check important info. </p>
            </section>

        </main> 
    )
}