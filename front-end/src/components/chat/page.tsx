"use client"
import { useState } from "react";
import { Mensagers } from "../mensagers/page";
import { TextBar } from "../textBar/page";
import functions from "../functions";

export function Chat() {

    const [myMensager, setMyMensager] = useState("");
    const [chatMensager, setChatMensager] = useState("");

    async function submit(text: string) {

        setMyMensager(text)
        
        const response = await functions.submit(text)

        setChatMensager(response)
    }


    return (
        <main>
            <Mensagers myMensager= {myMensager} chatMensager={chatMensager}/>
            <TextBar onSubmit={submit} />
        </main>
    )
}