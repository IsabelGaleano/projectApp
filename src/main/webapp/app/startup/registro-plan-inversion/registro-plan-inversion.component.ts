import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PlanesInversion } from './registro-plan-inversion.model';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegistroPlanInversionService } from './registro-plan-inversion.service';

@Component({
  selector: 'jhi-registro-plan-inversion',
  templateUrl: './registro-plan-inversion.component.html',
})
export class RegistroPlanInversionComponent implements OnInit {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  planRegistrado = false;
  usuario = ' ';
  emailUsuario = '';

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    monto: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    beneficios: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    porcentajeEmpresarial: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
  });

  constructor(
    private accountService: AccountService,
    private registroPlanInversionService: RegistroPlanInversionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.emailUsuario = account.email;
      }
    });
    console.warn('test');
  }
  registrarPlanInversion(): void {
    const router = this.router;

    const nombreForm = <HTMLInputElement>document.getElementById('nombre');
    console.warn(nombreForm.value);

    const montoForm = <HTMLInputElement>document.getElementById('monto');
    console.warn(montoForm.value);

    const descripcionForm = <HTMLInputElement>document.getElementById('descripcion');
    console.warn(descripcionForm.value);

    const beneficiosForm = <HTMLInputElement>document.getElementById('beneficios');
    console.warn(beneficiosForm.value);

    const porcentajeEmpresarialForm = <HTMLInputElement>document.getElementById('porcentajeEmpresarial');
    console.warn(porcentajeEmpresarialForm.value);

    this.registroPlanInversionService.getStartupsByMail(this.emailUsuario).subscribe(data => {
      this.usuario = data.id;
    });
    const plan: PlanesInversion = new PlanesInversion(
      nombreForm.value,
      montoForm.value as unknown as number,
      descripcionForm.value,
      beneficiosForm.value
    );
    this.registroPlanInversionService.savePlanInversion(this.emailUsuario, porcentajeEmpresarialForm.value, plan).subscribe(data => {
      router.navigate(['startup/lista-planes-inversion']);
    });
  }
}
