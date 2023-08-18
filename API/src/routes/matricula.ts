import { Router } from "express";
import MatriculaController from "../controller/MatriculaController";


const routes = Router();

routes.get("" ,MatriculaController.getAll);
routes.get("/:id", MatriculaController.getById);
routes.post("/:id", MatriculaController.Add);

export default routes;