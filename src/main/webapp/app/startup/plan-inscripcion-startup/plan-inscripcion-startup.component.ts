import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { Inscripciones } from './plan-inscripcion-startup.model';
import { PlanInscripcionStartupService } from './plan-inscripcion-startup.service';

@Component({
  selector: 'jhi-plan-inscripcion-startup',
  templateUrl: './plan-inscripcion-startup.component.html',
})
export class PlanInscripcionStartupComponent {
  constructor(private planInscripcionService: PlanInscripcionStartupService, private router: Router, private fb: FormBuilder) {}

  registrarPlanInscripcionMensual(): void {
    const router = this.router;

    this.planInscripcionService.registrarInscripcion(sessionStorage.getItem('startupLogin'), 'Mensual').subscribe((result: any) => {
      console.warn(result);
      this.router.navigate(['startup/pago-inscripcion-startup']);
    });
    const producto = {
      descripcion: 'Pago de la inscripción mensual',
      precio: '8.00',
      tipo: 'Mensual',
    };

    sessionStorage.setItem('productInscripcion', JSON.stringify(producto));
  }

  registrarPlanInscripcionAnual(): void {
    const router = this.router;

    this.planInscripcionService.registrarInscripcion(sessionStorage.getItem('startupLogin'), 'Anual').subscribe((result: any) => {
      console.warn(result);
      this.router.navigate(['startup/pago-inscripcion-startup']);
    });
    const producto = {
      descripcion: 'Pago de la inscripción anual',
      precio: '65.00',
      tipo: 'Anual',
    };

    sessionStorage.setItem('productInscripcion', JSON.stringify(producto));
  }
}
