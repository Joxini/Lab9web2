import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Estudiante } from './Estudiante';
import { Cursos } from './Curso';

@Entity()
export class Matricula {
  @PrimaryColumn()
  @IsNotEmpty({
    message:
      'Debes de indicar el Id de Matricula',
  })
  IdMatricula: number;

  @Column({ nullable: false })
  @IsNotEmpty({
    message:
      'Debes de indicar el Id de Estudiante',
  })
  IdEstudiante: number;

  @Column({ nullable: false })
  @IsNotEmpty({
    message: 'Debes de indicar el Id de Curso',
  })
  IdCurso: number;

  @Column({ nullable: false })
  FechaMatricula: Date;

  
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas)
  @JoinColumn({ name: 'IdEstudiante' })
  estudiante: Estudiante;

  @ManyToOne(() => Cursos, (curso) => curso.matriculas)
  @JoinColumn({ name: 'IdCurso' })
  curso: Cursos;
}
