import { Router } from "express";
import mensagerControllers from "./controllers/mensagerControllers";

const router = Router()

router.post("/request", mensagerControllers.receiveText)

export { router }