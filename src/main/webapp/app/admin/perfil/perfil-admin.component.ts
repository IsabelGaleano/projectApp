import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

import { PerfilAdminService } from './perfil-admin.service';

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
  // account: Account|null;
  account!: Account;
  entitiesNavbarItems: any[] = [];
  user = false;
  usuario: any;
  error = false;
  errorVacias = false;

  formInfoBasica = new FormGroup({
    nombre: new FormControl(),
    primerApellido: new FormControl(),
    segundoApellido: new FormControl(),
    // cedula: new FormControl(),
    // correoElectronico: new FormControl(),
    telefono: new FormControl(),
    fechaNacimiento: new FormControl(),
  });

  formContrasennia = new FormGroup({
    nuevaContrasennia: new FormControl(),
    confirmacionNuevaContrasennia: new FormControl(),
  });

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private adminService: PerfilAdminService,
    private formBuilder: FormBuilder
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

          // this.formContrasennia.controls['contrasenniaActual'].setValue(this.usuario.contrasennia);
          // this.formContrasennia.controls['nuevaContrasennia'].setValue("");
          // this.formContrasennia.controls['confirmacionNuevaContrasennia'].setValue("");
        });
      }
    });
  }

  actualizarAdmin(): void {
    const nombre = this.formInfoBasica.get(['nombre'])!.value;
    const primerApellido = this.formInfoBasica.get('primerApellido')?.value;
    const segundoApellido = this.formInfoBasica.get('segundoApellido')?.value;
    // const cedula=this.formInfoBasica.get('cedula')?.value;
    // const correoElectronico=this.formInfoBasica.get('correoElectronico')?.value;
    const telefono = this.formInfoBasica.get('telefono')?.value;
    const fechaNacimiento = this.formInfoBasica.get('fechaNacimiento')?.value;

    this.usuario.nombre = nombre;
    this.usuario.primerApellido = primerApellido;
    this.usuario.segundoApellido = segundoApellido;
    // this.usuario.cedula = cedula;
    // this.usuario.correoElectronico = correoElectronico;
    this.usuario.telefono = telefono;

    if (fechaNacimiento !== null) {
      this.usuario.fechaNacimiento = new Date(fechaNacimiento);
    } else {
      this.usuario.fechaNacimiento = new Date(this.usuario.fechaNacimiento);
    }

    console.warn(fechaNacimiento, ' ', this.usuario.fechaNacimiento);

    this.adminService
      .updateInfoBasicaUsuarios(this.usuario.correoElectronico, this.usuario)
      .subscribe(() => console.warn('usuarios actualizado'));

    // this.account.email = correoElectronico;
    this.account.firstName = nombre;
    this.account.lastName = primerApellido;

    this.adminService.updateInfoBasicaJHI(this.account).subscribe(() => {
      console.warn('usuarios actualizado');
      window.location.reload();
    });
  }

  actualizarContrasennia(): void {
    const nuevaContrasennia = this.formContrasennia.get(['nuevaContrasennia'])!.value;
    const confirmacionNuevaContrasennia = this.formContrasennia.get(['confirmacionNuevaContrasennia'])!.value;
    const contrasenniaActual = this.usuario.contrasennia;

    if (nuevaContrasennia !== confirmacionNuevaContrasennia) {
      this.error = true;
    } else {
      this.error = false;
    }

    if (nuevaContrasennia === confirmacionNuevaContrasennia && nuevaContrasennia != null && nuevaContrasennia !== '') {
      this.error = false;
      this.errorVacias = false;

      this.adminService.save(contrasenniaActual, nuevaContrasennia).subscribe();

      this.adminService
        .updateContrasenniaUsuarios(this.usuario.correoElectronico, contrasenniaActual, nuevaContrasennia)
        .subscribe(() => window.location.reload());
    }

    console.warn(contrasenniaActual);

    console.warn('nuevaContrasennia: ', nuevaContrasennia, ' confirmacion: ', confirmacionNuevaContrasennia);
  }
}
