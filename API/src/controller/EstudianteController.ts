import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Estudiante } from '../entity/Estudiante';
import { Matricula } from '../entity/Matricula';

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

  static update = async (req: Request, resp: Response) => {
    try {
      const { IdEstudiante, cursos } = req.body;
    
      const EstudianteRepo = AppDataSource.getRepository(Estudiante);
      const estudiante = await EstudianteRepo.findOne({
        where: { IdEstudiante },
        relations: {cursos:true}, 
      });
    
      if (!estudiante) {
        return resp
          .status(400)
          .json({ mensaje: 'El estudiante no existe en la base de datos' });
      }
    
      const matriculasToUpdate = cursos.map((curs) => {
        const matricula = estudiante.cursos.find(
          (m) => m.IdCurso === curs.IdCurso
        );
    
        if (!matricula) {
          const newMatricula = new Matricula();
          newMatricula.IdEstudiante = IdEstudiante;
          newMatricula.IdCurso = curs.IdCurso;
          return newMatricula;
        }
      });
    
      const matriculasFiltradas = matriculasToUpdate.filter(
        (matricula) => matricula !== undefined
      );

      estudiante.cursos.push(...matriculasFiltradas);
      try {
        await EstudianteRepo.save(estudiante);
        return resp.status(201).json({ mensaje: 'Cursos agregados correctamente' });
      } catch (error) {
        return resp.status(400).json({ mensaje: "Error al agregarle los cursos"});
      }

    } catch (error) {
      return resp.status(400).json({ mensaje: error.mensaje });
    }
    
  };

}

export default EstudianteController;