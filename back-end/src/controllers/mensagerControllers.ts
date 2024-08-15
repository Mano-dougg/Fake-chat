import { Request, Response } from "express";
import mensagerService from "../services/mensagerServices";

class mensagerControllers {

    static async receiveText(req: Request, res: Response) {
        const { text } = req.body;

        // const responseIA = mensagerService.responseText(text)

        const responseIA = "teste"

        return res.status(200).json( { msg: "sucesso" } )
    }

    static async hello() {
        return "hello world"
    }

}

export default mensagerControllers;