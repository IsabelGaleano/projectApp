import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { VerificacionCodigoUsuarioFinalService } from './verificacion-codigo-usuario-final.service';

@Component({
  selector: 'jhi-verificacion-codigo-usuario-final',
  templateUrl: './verificacion-codigo-usuario-final.component.html',
})
export class VerificacionCodigoUsuarioFinalComponent implements OnInit {
  usuarioPendiente = null;
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  fail = false;
  codigoReenviado = false;
  loading = false;
  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  constructor(
    private verificacionCodigoUsuarioService: VerificacionCodigoUsuarioFinalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.warn(this.usuarioPendiente);
  }
  verificarCodigo(): void {
    const router = this.router;
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const codigoVerificacionDigitado = this.registerForm.get(['login'])!.value;
    this.verificacionCodigoUsuarioService.getUsersByMail(sessionStorage.getItem('usuarioFinalPendiente')).subscribe((dataUsuario: any) => {
      this.verificacionCodigoUsuarioService.getCodesById(dataUsuario.id).subscribe((dataCodigo: any) => {
        for (let i = 0; i < Object.keys(dataCodigo).length; i++) {
          if (dataCodigo[i].codigo === codigoVerificacionDigitado && dataCodigo[i].estado === 'Activo') {
            console.warn('Es el código');
            dataUsuario.estado = 'Activo';
            dataCodigo[i].estado = 'Inactivo';
            this.verificacionCodigoUsuarioService.updateUsers(dataUsuario.id, dataUsuario).subscribe((dataUsuarioActualizado: any) => {
              console.warn(dataUsuarioActualizado);
            });
            this.verificacionCodigoUsuarioService.updateCodes(dataCodigo[i].id, dataCodigo[i]).subscribe((dataCodigoActualizado: any) => {
              console.warn(dataCodigoActualizado);
              this.success = true;
              window.setTimeout(function () {
                router.navigate(['login']);
              }, 3000);
            });
          } else {
            this.error = true;
          }
        }
      });
    });
  }
  reenviarCodigo(): void {
    this.verificacionCodigoUsuarioService.getUsersByMail(sessionStorage.getItem('usuarioFinalPendiente')).subscribe((dataUsuario: any) => {
      this.verificacionCodigoUsuarioService.getCodesById(dataUsuario.id).subscribe((dataCodigo: any) => {
        for (let i = 0; i < Object.keys(dataCodigo).length; i++) {
          if (dataCodigo[i].estado === 'Activo') {
            dataCodigo[i].estado = 'Inactivo';
            this.verificacionCodigoUsuarioService.updateCodes(dataCodigo[i].id, dataCodigo[i]).subscribe((dataCodigoActualizado: any) => {
              console.warn(dataCodigoActualizado);
            });
          }
        }
      });
      this.verificacionCodigoUsuarioService.reenviarCodes(dataUsuario.id).subscribe((dataCodigoReenvidado: any) => {
        console.warn(dataCodigoReenvidado);
        this.codigoReenviado = true;
        setTimeout(() => {
          this.codigoReenviado = false;
        }, 3000);
      });
    });
  }
}
