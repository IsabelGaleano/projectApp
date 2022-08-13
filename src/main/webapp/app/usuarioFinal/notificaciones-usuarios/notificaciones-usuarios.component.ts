/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { NotificacionesUsuariosService } from './notificaciones-usuarios.service';

@Component({
  selector: 'jhi-notificaciones-usuarios',
  templateUrl: './notificaciones-usuarios.component.html',
  styleUrls: ['./notificaciones-usuarios.component.scss'],
})
export class NotificacionesUsuariosComponent implements OnInit {
  user: any;
  notificaciones: any[] = [];
  usuario: any;

  constructor(private accountService: AccountService, private notificacionService: NotificacionesUsuariosService) {
    this.accountService.identity().subscribe();

    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.user = account;
      }
    });
  }

  ngOnInit(): void {
    if (this.user !== null) {
      if (this.user.authorities[0] === 'ROLE_USER') {
        this.notificacionService.getUsuariosByCorreoElectronico(this.user.email).subscribe((data: any) => {
          this.usuario = data;
          //Get notificaciones
          this.notificacionService.getNotificacionesUsuario(this.user.email).subscribe((result: any) => {
            const reversed = result.reverse();
            for (let i = 0; i < reversed.length; i++) {
              const fechatemp = new Date(reversed[i].fecha);
              reversed[i].fecha = fechatemp.toLocaleString();
              this.notificaciones.push(reversed[i]);
            }
            console.warn(this.notificaciones);
          });
        });
      } else if (this.user.authorities[0] === 'ROLE_STARTUP') {
        this.notificacionService.getStartupLogin(this.user.email).subscribe((data: any) => {
          this.usuario = data;
          this.notificacionService.getNotificacionesStartup(this.user.email).subscribe((resultS: any) => {
            const reversedS = resultS.reverse();
            for (let i = 0; i < reversedS.length; i++) {
              const fechat = new Date(reversedS[i].fecha);
              reversedS[i].fecha = fechat.toLocaleString();
              this.notificaciones.push(reversedS[i]);
            }
          });
        });
      }
    }
  }
}
