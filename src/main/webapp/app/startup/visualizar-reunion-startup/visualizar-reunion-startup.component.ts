/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { VisualizarReunionStartupService } from './visualizar-reunion-startup.service';

@Component({
  selector: 'jhi-visualizar-reunion-startup',
  templateUrl: './visualizar-reunion-startup.component.html',
  styleUrls: ['./visualizar-reunion-startup.component.scss'],
})
export class VisualizarReunionStartupComponent implements OnInit {
  reunion: any;
  noEditable = true;
  urlReunion = false;
  urlGuardado = false;
  aceptada = true;
  fechaSolicitadaFormateada: any;
  fechaReunionFormateada: any;

  formURL = new FormGroup({
    URL: new FormControl(),
  });

  formReunion = new FormGroup({
    fechaSolicitada: new FormControl(),
    descripcion: new FormControl(),
  });

  constructor(private visualizarReunionStartupService: VisualizarReunionStartupService) {}

  ngOnInit(): void {
    const idReunion = localStorage.getItem('idReunionStorage') as string;

    this.visualizarReunionStartupService.obtenerReunion(idReunion).subscribe((reunion: any) => {
      this.reunion = reunion;

      if (this.reunion.fechaSolicitada) {
        this.fechaSolicitadaFormateada = new Date(this.reunion.fechaSolicitada).toLocaleString();
      }

      if (this.reunion.fechaReunion) {
        this.fechaReunionFormateada = new Date(this.reunion.fechaReunion).toLocaleString();
      } else {
        this.fechaReunionFormateada = 'No asignada';
      }

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

        if (this.reunion.estado === 'SolicitadoI') {
          this.reunion.estado = 'Solicitado';
        }
      }

      console.warn(this.reunion);

      if (this.reunion.url) {
        this.formURL.controls['URL'].setValue(this.reunion.url);
      }
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
    this.reunion.estado = 'SolicitadoS';

    this.visualizarReunionStartupService.actualizarReunion(this.reunion.id, this.reunion).subscribe(
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

    // this.visualizarReunionStartupService.actualizarReunion(this.reunion.id, this.reunion).subscribe({
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

  agregarURL(): void {
    const url = this.formURL.get(['URL'])!.value;

    this.visualizarReunionStartupService.agregarURLReunion(this.reunion.id, url).subscribe(() => {
      this.urlGuardado = true;
    });
  }
}
