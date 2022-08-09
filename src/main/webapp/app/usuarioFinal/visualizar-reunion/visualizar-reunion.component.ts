import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VisualizarReunionService } from './visualizar-reunion.service';

@Component({
  selector: 'jhi-visualizar-reunion',
  templateUrl: './visualizar-reunion.component.html',
  styleUrls: ['./visualizar-reunion.component.scss'],
})
export class VisualizarReunionComponent implements OnInit {
  reunion: any;
  noEditable = true;

  constructor(private visualizarReunionService: VisualizarReunionService) {}

  ngOnInit(): void {
    const idReunion = localStorage.getItem('idReunionStorage') as string;

    this.visualizarReunionService.obtenerReunion(idReunion).subscribe((reunion: any) => {
      this.reunion = reunion;

      if (this.reunion.estado === 'Activo' || this.reunion.estado === 'Inactivo') {
        this.noEditable = true;
      } else {
        this.noEditable = false;
      }

      console.warn(this.reunion);
    });

    console.warn(idReunion);
  }
}
