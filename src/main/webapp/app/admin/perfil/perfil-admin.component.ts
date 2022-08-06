/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  faEdit,
  faEnvelope,
  faPhone,
  faLink,
  faCalendarDays,
  faWallet,
  faUserCheck,
  faIdCard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

import { PerfilAdminService } from './perfil-admin.service';
import { HttpErrorResponse } from '@angular/common/http';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  //styleUrls: ['./navbar.component.scss'],
  styleUrls: ['./perfil-admin.component.scss'],
})
export class PerfilAdminComponent implements OnInit {
  movimientos: any[] = [];
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
  errorInvalida = false;
  errorVacia = false;
  errorNuevasVacias = false;
  fechaFormateada: string | null | undefined;
  imagenActualizada = true;

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLink = faLink;
  faCalendarDays = faCalendarDays;
  faWallet = faWallet;
  faUserCheck = faUserCheck;
  faIdCard = faIdCard;
  faUser = faUser;

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
    contrasenniaActual: new FormControl(),
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
        this.user = true;
      }
      // this.account = account;
      if (account !== null) {
        this.account = account;
        this.adminService.getUsuariosByCorreoElectronico(account.email).subscribe((data: any) => {
          this.usuario = data;

          this.usuario.idMonedero.tipo = this.usuario.idMonedero.tipo.toLowerCase();
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          this.usuario.idMonedero.tipo = this.usuario.idMonedero.tipo.charAt(0).toUpperCase() + this.usuario.idMonedero.tipo.slice(1);

          this.adminService.getMovimientosByIdMonedero(data.idMonedero.id).subscribe((dataMovimientos: any) => {
            dataMovimientos.forEach((movimiento: any) => {
              movimiento.tipo = movimiento.tipo.toLowerCase();
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              movimiento.tipo = movimiento.tipo.charAt(0).toUpperCase() + movimiento.tipo.slice(1);

              this.movimientos.push(movimiento);
            });
          });

          this.formInfoBasica.controls['nombre'].setValue(this.usuario.nombre);
          this.formInfoBasica.controls['primerApellido'].setValue(this.usuario.primerApellido);
          this.formInfoBasica.controls['segundoApellido'].setValue(this.usuario.segundoApellido);
          // this.formInfoBasica.controls['cedula'].setValue(this.usuario.cedula);
          // this.formInfoBasica.controls['correoElectronico'].setValue(this.usuario.correoElectronico);
          this.formInfoBasica.controls['telefono'].setValue(this.usuario.telefono);
          this.formInfoBasica.controls['fechaNacimiento'].setValue(this.formatDate(new Date(this.usuario.fechaNacimiento)));

          this.fechaFormateada = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');

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

    this.adminService
      .updateInfoBasicaUsuarios(this.usuario.correoElectronico, this.usuario)
      .subscribe(() => console.warn('usuarios actualizado'));

    // this.account.email = correoElectronico;
    this.account.firstName = nombre;
    this.account.lastName = primerApellido;

    this.adminService.updateInfoBasicaJHI(this.account).subscribe(() => {
      console.warn('usuarios actualizado');
      // window.location.reload();
    });
  }

  actualizarContrasennia(): void {
    const contrasenniaActual = this.formContrasennia.get(['contrasenniaActual'])!.value;
    const nuevaContrasennia = this.formContrasennia.get(['nuevaContrasennia'])!.value;
    const confirmacionNuevaContrasennia = this.formContrasennia.get(['confirmacionNuevaContrasennia'])!.value;

    if (nuevaContrasennia !== confirmacionNuevaContrasennia) {
      this.error = true;
    } else {
      this.error = false;
    }

    if (contrasenniaActual === '' || contrasenniaActual == null) {
      this.errorVacia = true;
    } else {
      this.errorVacia = false;
    }

    if (
      nuevaContrasennia === '' ||
      nuevaContrasennia == null ||
      confirmacionNuevaContrasennia === '' ||
      confirmacionNuevaContrasennia == null
    ) {
      this.errorNuevasVacias = true;
    } else {
      this.errorNuevasVacias = false;
    }

    if (
      nuevaContrasennia === confirmacionNuevaContrasennia &&
      nuevaContrasennia != null &&
      nuevaContrasennia !== '' &&
      contrasenniaActual != null &&
      contrasenniaActual !== '' &&
      contrasenniaActual !== nuevaContrasennia
    ) {
      this.error = false;

      this.adminService.save(contrasenniaActual, nuevaContrasennia).subscribe(
        () => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          this.errorInvalida = true;
        }
      );

      // this.adminService
      //   .updateContrasenniaUsuarios(this.usuario.correoElectronico, contrasenniaActual, nuevaContrasennia)
      //   .subscribe(() => window.location.reload());
    }
  }

  actualizarImagen(event: any): void {
    const imageFormData = new FormData();
    //imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('file', event.target.files[0]);
    imageFormData.append('upload_preset', 'eqakakzu');
    this.adminService.subirImagen(imageFormData).subscribe(
      (cloudinaryData: any) => {
        const imgPerfilStartup = <HTMLInputElement>document.getElementById('imgPerfil');
        // imgPerfilStartup.src = cloudinaryData.url;
        this.adminService.actualizarImagen(this.account.email, cloudinaryData.url).subscribe(() => {
          this.imagenActualizada = true;
          window.location.reload();
        });
      },
      err => {
        this.imagenActualizada = false;
      }
    );
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
