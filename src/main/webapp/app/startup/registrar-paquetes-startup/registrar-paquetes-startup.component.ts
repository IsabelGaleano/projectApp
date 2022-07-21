import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RegisterService } from 'app/account/register/register.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  selector: 'jhi-registrar-paquetes-startup',
  templateUrl: './registrar-paquetes-startup.component.html',
})
export class RegistrarPaquetesStartupComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    monto: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    dimensiones: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    estado: ['', [Validators.required]],
  });

  constructor(
    private translateService: TranslateService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      sessionStorage.setItem('usuarioFinalPendiente', email);
      this.registerService
        .save({ login, email, password, langKey: this.translateService.currentLang })
        .subscribe({ next: () => (this.success = true), error: response => this.processError(response) });
      this.router.navigate(['account/verificacion-codigo-usuario-final']);
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
