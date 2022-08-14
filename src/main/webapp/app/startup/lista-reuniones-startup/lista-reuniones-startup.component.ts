import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { ListaReunionesStartupService } from './lista-reuniones-startup.service';

@Component({
  selector: 'jhi-lista-reuniones-startup',
  templateUrl: './lista-reuniones-startup.component.html',
  styleUrls: ['./lista-reuniones-startup.component.scss'],
})
export class ListaReunionesStartupComponent implements OnInit {
  account: any;
  reuniones: Array<any> = [];
  sinReuniones = true;
  reunionActualizada = false;
  busqueda: string;
  reunionesTmp: any[] = [];

  timeLeft = 5;
  interval;

  constructor(private listaReunionesService: ListaReunionesStartupService, private accountService: AccountService, private router: Router) {
    this.busqueda = '';
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
        this.listaReunionesService.obtenerIdStartupPorEmail(this.account.email).subscribe((data: any) => {
          this.listaReunionesService.obtenerReuniones(data.id).subscribe((reuniones: any) => {
            if (!reuniones) {
              this.sinReuniones = true;
            } else {
              this.sinReuniones = false;
              for (let i = 0; i < reuniones.length; i++) {
                if (reuniones[i].estado !== 'SolicitadoS') {
                  if (reuniones[i].estado === 'SolicitadoI') {
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
          this.reunionesTmp = this.reuniones;
        });

        const reunionActualizada = localStorage.getItem('reunionActualizada');

        if (reunionActualizada) {
          this.reunionActualizada = true;
          this.startTimer();
        }
      }
    });
  }

  aceptarReunion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    this.listaReunionesService.aceptarReunion(value, 'Aceptada').subscribe(() => window.location.reload());

    console.warn(value, ' id?? Aceptar');
  }

  rechazarReunion(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    this.listaReunionesService.actualizarEstadoReunion(value, 'Rechazada').subscribe(() => window.location.reload());

    console.warn(value, ' id?? Rechazar');
  }

  verReunion(idReunion): void {
    localStorage.setItem('idReunionStorage', idReunion);
    this.router.navigate(['/startup/visualizar-reunion-startup']);
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.warn(this.timeLeft);
      } else {
        this.pauseTimer();
      }
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.interval);

    this.reunionActualizada = false;
    localStorage.removeItem('reunionActualizada');
  }

  searchByName(): void {
    try {
      if (!this.busqueda) {
        this.reuniones = this.reunionesTmp;
      } else {
        this.listaReunionesService.findByNombre(this.busqueda).subscribe((reuniones: any) => {
          if (!reuniones) {
            this.sinReuniones = true;
          } else {
            this.reuniones = [];
            this.sinReuniones = false;
            for (let i = 0; i < reuniones.length; i++) {
              if (reuniones[i].estado !== 'SolicitadoS') {
                if (reuniones[i].estado === 'SolicitadoI') {
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
      }
    } catch (e) {
      console.error('hola', e);
    }
  }

  clearSearch(): void {
    if (!this.busqueda) {
      this.reuniones = this.reunionesTmp;
    }
  }
}
