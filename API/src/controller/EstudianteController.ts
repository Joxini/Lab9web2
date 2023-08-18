import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Estudiante } from '../entity/Estudiante';

class EstudianteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const EstudianteRepo = AppDataSource.getRepository(Estudiante);

      const listaEstudiante= await EstudianteRepo.find({
        where: {    Estado: true }
      });

      if (listaEstudiante.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(listaEstudiante);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const IdEstudiante = parseInt(req.params['id']);

      if (!IdEstudiante) {
        return resp.status(404).json({ mensaje: 'No se indica el ID' });
      }

      const EstudianteRepo = AppDataSource.getRepository(Estudiante);

      let Est;
      try {
        Est = await EstudianteRepo.findOneOrFail({
          where: { IdEstudiante, Estado: true }
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encontro el estudiante con ese ID' });
      }

      return resp.status(200).json(Est);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

}

export default EstudianteController;