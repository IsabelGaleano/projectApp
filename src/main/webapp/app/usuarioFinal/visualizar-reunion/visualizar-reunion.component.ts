/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { VisualizarReunionService } from './visualizar-reunion.service';

@Component({
  selector: 'jhi-visualizar-reunion',
  templateUrl: './visualizar-reunion.component.html',
  styleUrls: ['./visualizar-reunion.component.scss'],
})
export class VisualizarReunionComponent implements OnInit {
  reunion: any;
  noEditable = true;
  urlReunion = false;
  aceptada = false;
  reunionActualizada = false;

  formReunion = new FormGroup({
    fechaSolicitada: new FormControl(),
    descripcion: new FormControl(),
  });

  constructor(private visualizarReunionService: VisualizarReunionService, private router: Router) {}

  ngOnInit(): void {
    const idReunion = localStorage.getItem('idReunionStorage') as string;

    this.visualizarReunionService.obtenerReunion(idReunion).subscribe((reunion: any) => {
      this.reunion = reunion;

      this.reunion.fechaSolicitada = this.reunion.fechaSolicitada as string;

      if (this.reunion.estado === 'Aceptada' || this.reunion.estado === 'Rechazada') {
        this.noEditable = true;

        if (this.reunion.url) {
          this.urlReunion = true;
        } else {
          this.urlReunion = false;
        }

        if (this.reunion.estado === 'Aceptada') {
          this.aceptada = true;
        } else {
          this.aceptada = false;
        }
      } else {
        this.noEditable = false;

        if (this.reunion.estado === 'SolicitadoS') {
          this.reunion.estado = 'Solicitado';
        }
      }

      console.warn(this.reunion);
    });

    console.warn(idReunion);
  }

  redireccionarHaciaReunion(): void {
    window.open(this.reunion.url);
  }

  actualizarReunion(): void {
    console.warn();

    const fechaSolicitada = this.formReunion.get(['fechaSolicitada'])!.value;
    const descripcion = this.formReunion.get(['descripcion'])!.value;

    this.reunion.fechaSolicitada = this.subtractTimeFromDate(new Date(fechaSolicitada), 6);
    this.reunion.descripcion = descripcion;
    this.reunion.estado = 'SolicitadoI';

    this.visualizarReunionService.actualizarReunion(this.reunion.id, this.reunion).subscribe(
      () => {
        let reunionActualizada = 'reunionActualizada';
        localStorage.setItem('reunionActualizada', reunionActualizada);
      },
      err => {
        console.error(err);
      },
      () => {
        window.history.back();
      }
    );

    // this.visualizarReunionService.actualizarReunion(this.reunion.id, this.reunion).subscribe({
    //   next() {
    //     window.history.back();
    //   }
    // });
  }

  subtractTimeFromDate(objDate, intHours): Date {
    let numberOfMlSeconds = objDate.getTime();
    let addMlSeconds = intHours * 60 * 60 * 1000;
    let newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

    return newDateObj;
  }
}
