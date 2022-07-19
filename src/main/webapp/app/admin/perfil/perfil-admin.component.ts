import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  //styleUrls: ['./navbar.component.scss'],
})
export class PerfilAdminComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  user = false;
  usuario: any;
  error = false;
  errorInvalida = false;
  errorVacia = false;
  errorNuevasVacias = false;
  fechaFormateada: string | null | undefined;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private adminService: PerfilAdminService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
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
      if (account) {
        // eslint-disable-next-line no-console
        console.log(account);
        this.user = true;
      }
      // this.account = account;
      if (account != null) {
        this.account = account;

        this.adminService.getUsuariosByCorreoElectronico(account.email).subscribe((data: any) => {
          this.usuario = data;

          console.warn(this.usuario);

          this.formInfoBasica.controls['nombre'].setValue(this.usuario.nombre);
          this.formInfoBasica.controls['primerApellido'].setValue(this.usuario.primerApellido);
          this.formInfoBasica.controls['segundoApellido'].setValue(this.usuario.segundoApellido);
          // this.formInfoBasica.controls['cedula'].setValue(this.usuario.cedula);
          // this.formInfoBasica.controls['correoElectronico'].setValue(this.usuario.correoElectronico);
          this.formInfoBasica.controls['telefono'].setValue(this.usuario.telefono);
          this.formInfoBasica.controls['fechaNacimiento'].setValue(this.usuario.fechaNacimiento);

          this.fechaFormateada = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');

          // this.formContrasennia.controls['contrasenniaActual'].setValue(this.usuario.contrasennia);
          // this.formContrasennia.controls['nuevaContrasennia'].setValue("");
          // this.formContrasennia.controls['confirmacionNuevaContrasennia'].setValue("");
        });
      }
    });
  }
}
