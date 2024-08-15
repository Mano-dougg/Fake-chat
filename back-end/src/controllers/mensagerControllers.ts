import { Request, response, Response } from "express";
import mensagerService from "../services/mensagerServices";

class mensagerControllers {

    static async receiveText(req: Request, res: Response) {
        const { text } = req.body;

        const responseIA = await mensagerService.responseText(text)

        return res.status(200).json({ responseIA })
    }

}

export default mensagerControllers;