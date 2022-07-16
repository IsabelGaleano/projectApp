import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { VerificacionStartupService } from './verificacion-startup.service';

@Component({
  selector: 'jhi-verificacion-startup',
  templateUrl: './verificacion-startup.component.html',
})
export class VerificacionStartupComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  codigoReenviado = false;
  codigoIncorrecto = false;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  constructor(
    private translateService: TranslateService,
    private verificacionService: VerificacionStartupService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  verificarCuenta(): void {
    const router = this.router;
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const login = this.registerForm.get(['login'])!.value;

    this.verificacionService.verificarCuenta(sessionStorage.getItem('startupPendiente'), login).subscribe((verificacion: any) => {
      console.warn(verificacion);
      if (verificacion) {
        this.success = true;
        window.setTimeout(function () {
          router.navigate(['login']);
        }, 5000);
      } else {
        this.codigoIncorrecto = true;
      }
    });
  }

  reenviarCodigo(): void {
    const login = this.registerForm.get(['login'])!.value;

    this.verificacionService.reenviarCodigo(sessionStorage.getItem('startupPendiente')).subscribe((result: any) => {
      console.warn(result);
      this.codigoReenviado = true;
    });
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
