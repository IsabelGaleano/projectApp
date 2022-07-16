import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { PerfilUsuarioFinalService } from './perfil-usuario-final.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-usuario-final',
  templateUrl: './perfil-usuario-final.component.html',
  //styleUrls: ['./navbar.component.scss'],
})
export class PerfilUsuarioFinalComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  user = false;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private perfilUsuarioFinalService: PerfilUsuarioFinalService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      const nombreHeader = document.getElementById('nombreHeader') as HTMLInputElement;
      const apellidosHeader = document.getElementById('apellidosHeader') as HTMLInputElement;
      const correoSidebar = document.getElementById('correoSidebar') as HTMLInputElement;
      const telefonoSidebar = document.getElementById('telefonoSidebar') as HTMLInputElement;
      const cedulaSidebar = document.getElementById('cedulaSidebar') as HTMLInputElement;
      const estadoSidebar = document.getElementById('estadoSidebar') as HTMLInputElement;
      const monederoEstadoSidebar = document.getElementById('monederoEstadoSidebar') as HTMLInputElement;
      if (account) {
        // eslint-disable-next-line no-console
        console.warn(account);
        this.user = true;
        this.perfilUsuarioFinalService.getUsersByMail(account.email).subscribe((dataUsuario: any) => {
          console.warn(dataUsuario);
          nombreHeader.insertAdjacentText('beforeend', dataUsuario.nombre);
          apellidosHeader.insertAdjacentText('beforeend', dataUsuario.primerApellido.concat(dataUsuario.segundoApellido));
          correoSidebar.insertAdjacentText('beforeend', dataUsuario.correoElectronico);
          telefonoSidebar.insertAdjacentText('beforeend', dataUsuario.telefono);
          cedulaSidebar.insertAdjacentText('beforeend', dataUsuario.cedula);
          estadoSidebar.insertAdjacentText('beforeend', dataUsuario.estado);
          monederoEstadoSidebar.insertAdjacentText('beforeend', dataUsuario.idMonedero.estado);
        });
      }
      this.account = account;
    });
  }
}
