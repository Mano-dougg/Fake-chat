import Image from "next/image";
import { useState, useEffect } from "react";
import imageProfile from "./images/imageMyProfile.svg"
import imageChat from "./images/imageFakeChat.svg"
import styles from "./page.module.css"

interface MensagersProps {
    myMensager: string;
    chatMensager: string;
}

export function Mensagers({ myMensager, chatMensager }: MensagersProps) {
    const [messages, setMessages] = useState<{ myMensager: string; chatMensager: string }[]>([]);

    useEffect(() => {
        if (myMensager && chatMensager) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { myMensager, chatMensager }
            ]);
        }
    }, [myMensager, chatMensager]);

    return (
        <main style={{paddingLeft: "8%", height: "590px", overflowY: "scroll"}}>
            {messages.map((message, index) => (
                <div key={index}>
                    <section className={styles.mensagers}>
                        <div>
                            <Image
                                src={imageProfile}
                                width={40}
                                height={40}
                                alt="My profile image"
                            />
                        </div>
                        <div className={styles.text}>
                            <h2> Você </h2>
                            <p> {message.myMensager} </p>
                        </div>
                    </section>
                    <section className={styles.mensagers}>
                        <div>
                            <Image
                                src={imageChat}
                                width={40}
                                height={40}
                                alt="Fake chat image"
                            />
                        </div>
                        <div className={styles.text}>
                            <h2> Fake Chat </h2>
                            <p> {message.chatMensager} </p>
                        </div>
                    </section>
                    
                </div>
            ))}
        </main>
    );
}