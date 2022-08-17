import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { RegistroAdminService } from './registro-admin.service';
import { RegistroAdmin } from './registro-admin.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  selector: 'jhi-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss'],
})
export class RegistroAdminComponent implements OnInit {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  formInfoAdmin = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    primerApellido: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    segundoApellido: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    cedula: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
    ]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    genero: new FormControl('F', [Validators.required]),
    correoElectronico: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(191)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    contrasennia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    confirmacionContrasennia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
  });

  // usuario!:RegistroAdmin;
  // monedero!:Monedero;

  constructor(
    private formBuilder: FormBuilder,
    private registroAdminService: RegistroAdminService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    console.warn('');
  }

  registrarAdmin(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    // const nombre = this.formInfoAdmin.get(['contrasennia'])!.value;
    // const primerApellido = this.formInfoAdmin.get(['contrasennia'])!.value;
    // const segundoApellido = this.formInfoAdmin.get(['contrasennia'])!.value;
    // const cedula = this.formInfoAdmin.get(['contrasennia'])!.value;
    // const contrasennia = this.formInfoAdmin.get(['contrasennia'])!.value;
    // const contrasennia = this.formInfoAdmin.get(['contrasennia'])!.value;
    const contrasennia = this.formInfoAdmin.get(['contrasennia'])!.value;

    if (contrasennia !== this.formInfoAdmin.get(['confirmacionContrasennia'])!.value) {
      this.doNotMatch = true;
    } else {
      const nombre = this.formInfoAdmin.get(['nombre'])!.value;
      const primerApellido = this.formInfoAdmin.get(['primerApellido'])!.value;
      const segundoApellido = this.formInfoAdmin.get(['segundoApellido'])!.value;
      const cedula = this.formInfoAdmin.get(['cedula'])!.value;
      const fechaNacimiento = this.formInfoAdmin.get(['fechaNacimiento'])!.value;
      const genero = this.formInfoAdmin.get(['genero'])!.value;
      const correoElectronico = this.formInfoAdmin.get(['correoElectronico'])!.value;
      const telefono = this.formInfoAdmin.get(['telefono'])!.value;

      const monedero: any = {
        id: null,
        tipo: null,
        saldo: null,
        estado: null,
      };

      const admin = new RegistroAdmin(
        nombre,
        cedula,
        primerApellido,
        segundoApellido,
        correoElectronico,
        genero,
        telefono,
        new Date(fechaNacimiento),
        ' ',
        ' ',
        // 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        'https://res.cloudinary.com/moonsoft/image/upload/v1658635377/profile_qfn6i1.png',
        'Admin',
        contrasennia,
        'Activo',
        monedero,
        2
      );
      this.registroAdminService.save(admin).subscribe({
        next() {
          window.history.back();
        },
        error: response => this.processError(response),
      });
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
