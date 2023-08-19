import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-estudiantes',
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['./admin-estudiantes.component.scss']
})
export class AdminEstudiantesComponent {

  titulo = 'SELECCIONE EL ESTUDIANTE';
  displayedColumns: string[] = [
    'IdEstudiante',
    'Nombre',
    'Apellido1',
    'Apellido2',
    'FechaNah',
    'Genero',
    'acciones'
  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvEstudiantes: EstudianteService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private dialogRef: MatDialogRef<AdminEstudiantesComponent>
  ) {}
  ngOnInit() {
    this.cargarlista()
  }

  cargarlista(){
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {
        // console.log(datos);
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seleccionar(student: any): void {
    this.dialogRef.close(student);
  }


  

}
