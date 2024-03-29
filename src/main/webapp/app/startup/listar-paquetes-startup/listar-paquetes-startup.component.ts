import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListarPaquetesStartupService } from './listar-paquetes-startup.service';
import { IPaquetes } from '../../entities/paquetes/paquetes.model';
import { PaquetesDeleteDialogComponent } from '../../entities/paquetes/delete/paquetes-delete-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePaqueteStartupComponent } from '../actualizar-paquete-startup/actualizar-paquete-startup.component';

@Component({
  selector: 'jhi-listar-paquetes-startup',
  templateUrl: './listar-paquetes-startup.component.html',
})
export class ListarPaquetesStartupComponent implements OnInit {
  paquetes: any[] = [];
  isLoading = false;
  // show:boolean;

  constructor(private listadoService: ListarPaquetesStartupService, private router: Router, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.listadoService.listarPaquetesStartups(sessionStorage.getItem('startupLogin')).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.paquetes = res ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.listadoService.listarPaquetesStartups(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
      if (data != null) {
        data.forEach((paquete: any) => {
          this.paquetes.push(paquete);
        });
      }
    });
  }
  cambiarEstado(paquete: any): void {
    if (paquete.estado !== 'Activo') {
      paquete.estado = 'Activo';
      this.actualizarEstado(paquete);
    } else if (paquete.estado !== 'Inactivo') {
      paquete.estado = 'Inactivo';
      this.actualizarEstado(paquete);
    }
  }

  actualizarEstado(paquete: any): void {
    this.listadoService.updatePaquetesStartups(paquete, paquete.id).subscribe((data: any) => {
      location.reload();
    });
  }

  delete(paquetes: IPaquetes): void {
    const modalRef = this.modalService.open(PaquetesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paquetes = paquetes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  showEditModal(paquetes: IPaquetes): void {
    const modalRef = this.modalService.open(UpdatePaqueteStartupComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paquetes = paquetes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'updated') {
        this.loadAll();
      }
    });
  }
}
