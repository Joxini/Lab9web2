import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {EstudianteForm  } from 'src/app/shared/formsModels/estudianteForms';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';
import { AdminEstudiantesComponent } from './admin-estudiantes/admin-estudiantes.component';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})

export class MatriculaComponent {

  selectedStudent: Estudiante
  dataSource = new MatTableDataSource();
  constructor(
    public estudianteform: EstudianteForm,
    private srvEstudiante: EstudianteService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
  ) {}

  abrirDialog(estudiante?: Estudiante): void {
      const dialogOpen = this.dialog.open(AdminEstudiantesComponent, {
        width: '800px',
        height: '800px',
        data: { estudiante },
      });

      dialogOpen.afterClosed().subscribe((estudiante: any) => {
        if (estudiante) {
          this.selectedStudent = estudiante;
          this.cargarDatosForm();
          console.log("Principal", this.selectedStudent)
        }
      });
    } 


    cargarDatosForm() {
      this.estudianteform.baseForm.patchValue({
        IdEstudiante: this.selectedStudent.IdEstudiante,
        Nombre: this.selectedStudent.Nombre,
        Apellido1: this.selectedStudent.Apellido1,
        Apellido2: this.selectedStudent.Apellido2,
        FechaNah: formatDate(
          this.selectedStudent.FechaNah,
          'yyyy-MM-dd',
          'en'
        ),
        Genero: this.selectedStudent.Genero,
        estado: true,
      });
    }
  }
  
