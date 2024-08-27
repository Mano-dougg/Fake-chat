import Image from "next/image";
import { useState, useEffect } from "react";
import imageProfile from "./images/imageMyProfile.svg";
import imageChat from "./images/imageFakeChat.svg";
import styles from "./page.module.css";

interface MensagersProps {
    myMensager: string;
    chatMensager: string | [string, string] | null; // Permite string, array ou null
}

export function Mensagers({ myMensager, chatMensager }: MensagersProps) {
    const [messages, setMessages] = useState<{ myMensager: string; chatMensager: string | [string, string] | null }[]>([]);

    useEffect(() => {
        if (myMensager) {
            // Exibe instantaneamente a mensagem do usuário
            setMessages((prevMessages) => [
                ...prevMessages,
                { myMensager, chatMensager: null } // chatMensager é nulo inicialmente
            ]);
        }
    }, [myMensager]); // Depende apenas de myMensager

    useEffect(() => {
        if (chatMensager) {
            // Atualiza a última mensagem com a resposta automática
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].chatMensager = chatMensager;
                return updatedMessages;
            });
        }
    }, [chatMensager]); // Depende de chatMensager

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
                    {message.chatMensager && (
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
                                {Array.isArray(message.chatMensager) ? (
                                    <>
                                        <p> {message.chatMensager[0]} </p>
                                        <p>
                                            Link para a notícia verdadeira:{" "}
                                            <a href={message.chatMensager[1]} target="_blank" rel="noopener noreferrer">
                                                {message.chatMensager[1]}
                                            </a>
                                        </p>
                                    </>
                                ) : (
                                    <p> {message.chatMensager} </p>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            ))}
        </main>
    );
}
