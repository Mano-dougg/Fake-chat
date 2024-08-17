import { useState, useEffect } from "react";

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
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <p>Texto enviado: {message.myMensager}</p>
                    <p>Resposta do servidor: {message.chatMensager}</p>
                </div>
            ))}
        </div>
    );
}