import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListarInscripcionesAdminService } from './listar-inscripciones-admin.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'jhi-listar-inscripciones-admin',
  templateUrl: './listar-inscripciones-admin.component.html',
})
export class ListarInscripcionesAdminComponent implements OnInit {
  inscripciones: any[] = [];
  busqueda: string;
  inscripcionesTmp: any[] = [];
  // show:boolean;

  constructor(private listadoService: ListarInscripcionesAdminService, private router: Router) {
    this.busqueda = '';
  }

  ngOnInit(): void {
    this.listadoService.ListarInscripcionesAdmin().subscribe((data: any) => {
      /* eslint-disable no-console */
      console.log(data);
      if (data != null) {
        data.forEach((inscripcion: any) => {
          inscripcion.beneficios = inscripcion.beneficios.split(/\s*\-\s*/g); // eslint-disable-line
          inscripcion.beneficios = inscripcion.beneficios.filter(e => e.length > 0);
          /* eslint-disable no-console */
          console.log(inscripcion.beneficios); // eslint-disable-line
          this.inscripciones.push(inscripcion);
        });
      }
      this.inscripcionesTmp = this.inscripciones;
    });
  }

  activarInscripcion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Inactivo') {
      this.listadoService.updateInscripcionesEstado(idXestado[0], 'Activo').subscribe(() => {
        window.location.reload();
      });
    }
  }

  desactivarInscripcion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Activo') {
      this.listadoService.updateInscripcionesEstado(idXestado[0], 'Inactivo').subscribe(() => {
        window.location.reload();
      });
    }
  }

  searchByName(): void {
    try {
      this.listadoService.findByNombre(this.busqueda).subscribe(

        (response: any) => {

          if (response) {

            this.inscripciones = response;

          } else {
            this.inscripciones = [];
          }

        },
        (err: any) => {

          this.inscripciones = [];
        }
      );
    } catch (e) {
      console.error('hola', e);
    }
  }

  clearSearch() : void {
    if (!this.busqueda) {
      this.inscripciones = this.inscripcionesTmp;
    }
  }
}
