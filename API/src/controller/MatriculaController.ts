import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Estudiante } from '../entity/Estudiante';
import { Matricula } from '../entity/Matricula';

class MatriculaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const MatriuculaRepo = AppDataSource.getRepository(Matricula);

      const Matriculas= await MatriuculaRepo.find();

      if (Matriculas.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(Matriculas);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

}

export default MatriculaController;