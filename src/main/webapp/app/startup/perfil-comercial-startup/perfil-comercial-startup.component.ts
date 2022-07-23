import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';

import { PerfilComercialStartupService } from './perfil-comercial-startup.service';

import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-perfil-comercial-startup',
  templateUrl: './perfil-comercial-startup.component.html',
  styleUrls: ['./perfil-comercial-startup.component.scss'],
})
export class PerfilComercialStartupComponent implements OnInit {
  user = false;
  account!: Account;

  inversionistaOAdmin = false;
  usuario = false;

  correoStartup: string | any;

  startup: any;

  constructor(
    private perfilComercialStartupService: PerfilComercialStartupService,
    private profileService: ProfileService,
    private accountService: AccountService
  ) {
    console.warn();

    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        // eslint-disable-next-line no-console
        this.user = true;
        this.account = account;

        this.perfilComercialStartupService.getUsuarioByCorreo(account.email).subscribe((usuarioLogeado: any) => {
          console.warn(usuarioLogeado.tipoUsuarioFinal);

          if (usuarioLogeado.tipoUsuarioFinal === 'Admin' || usuarioLogeado.tipoUsuarioFinal === 'Inversionista') {
            this.inversionistaOAdmin = true;
            this.usuario = false;
          } else if (usuarioLogeado.tipoUsuarioFinal === 'Usuario') {
            this.inversionistaOAdmin = false;
            this.usuario = true;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    console.warn('HOLAAAA');

    this.correoStartup = localStorage.getItem('correoStartup');

    console.warn(this.correoStartup);

    this.perfilComercialStartupService.getStartupByCorreo(this.correoStartup).subscribe((startup: any) => {
      this.startup = startup;
    });

    // this.entitiesNavbarItems = EntityNavbarItems;
    // this.profileService.getProfileInfo().subscribe(profileInfo => {
    //   this.inProduction = profileInfo.inProduction;
    //   this.openAPIEnabled = profileInfo.openAPIEnabled;
    // });
  }
}
