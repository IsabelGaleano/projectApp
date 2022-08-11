import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { ListaReunionesService } from './lista-reuniones.service';

@Component({
  selector: 'jhi-lista-reuniones',
  templateUrl: './lista-reuniones.component.html',
  styleUrls: ['./lista-reuniones.component.scss'],
})
export class ListaReunionesComponent implements OnInit {
  account: any;
  reuniones: Array<any> = [];
  sinReuniones = true;

  constructor(private listaReunionesService: ListaReunionesService, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
        this.listaReunionesService.obtenerIdUsuarioPorEmail(this.account.email).subscribe((data: any) => {
          this.listaReunionesService.obtenerReuniones(data.id).subscribe((reuniones: any) => {
            if (!reuniones) {
              this.sinReuniones = true;
            } else {
              this.sinReuniones = false;
              for (let i = 0; i < reuniones.length; i++) {
                if (reuniones[i].estado !== 'SolicitadoI') {
                  if (reuniones[i].estado === 'SolicitadoS') {
                    reuniones[i].estado = 'Solicitado';
                  }

                  if (!reuniones[i].fechaReunion) {
                    reuniones[i].fechaReunion = 'No acordada';
                  }

                  this.reuniones.push(reuniones[i]);
                }
              }
            }
          });
        });
      }
    });
  }

  aceptarReunion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    this.listaReunionesService.aceptarReunion(value, 'Activo').subscribe(() => window.location.reload());

    console.warn(value, ' id?? Aceptar');
  }

  rechazarReunion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    this.listaReunionesService.actualizarEstadoReunion(value, 'Inactivo').subscribe(() => window.location.reload());

    console.warn(value, ' id?? Rechazar');
  }

  verReunion(idReunion): void {
    localStorage.setItem('idReunionStorage', idReunion);

    this.router.navigate(['/usuario-final/visualizar-reunion']);
  }
}
