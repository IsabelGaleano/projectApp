import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListarPaquetesStartupService } from './listar-paquetes-startup.service';
import {IPaquetes} from "../../entities/paquetes/paquetes.model";
import {PaquetesDeleteDialogComponent} from "../../entities/paquetes/delete/paquetes-delete-dialog.component";
import {HttpResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-listar-paquetes-startup',
  templateUrl: './listar-paquetes-startup.component.html',
})
export class ListarPaquetesStartupComponent implements OnInit {
  paquetes: any[] = [];
  isLoading = false;
  // show:boolean;

  constructor(private listadoService: ListarPaquetesStartupService, private router: Router,  protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.listadoService.listarPaquetesStartups(sessionStorage.getItem("startupLogin")).subscribe({
      next: (res: HttpResponse<IPaquetes[]>) => {
        this.isLoading = false;
        this.paquetes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.listadoService.listarPaquetesStartups(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
      // this.usuarios = data;
      if (data != null) {
        data.forEach((paquete: any) => {
          this.paquetes.push(paquete);
        });
      }
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
}
