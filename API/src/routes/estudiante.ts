import { Router } from "express";
import EstudianteController from "../controller/EstudianteController";

const routes = Router();

routes.get("" ,EstudianteController.getAll);
routes.get("/:id", EstudianteController.getById);
export default routes;