import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EstudianteForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      IdEstudiante: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido1: ['', [Validators.required]],
      Apellido2: ['', [Validators.required]],
      FechaNah:[
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      Genero: ['', [Validators.required]],
      Estado: [true],
    });
  }
}
