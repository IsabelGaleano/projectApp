import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { ActualizarPlanInversionService } from './actualizar-plan-inversion.service';
import { PlanesInversion } from './actualizar-plan-inversion.model';
@Component({
  selector: 'jhi-actualizar-plan-inversion',
  templateUrl: './actualizar-plan-inversion.component.html',
})
export class ActualizarPlanInversionComponent implements OnInit {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  id = 0;
  usuario: any;
  emailUsuario = ' ';
  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    monto: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    beneficios: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    porcentajeEmpresarial: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
  });

  constructor(
    private route: ActivatedRoute,
    private actualizarPlanInversionService: ActualizarPlanInversionService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.emailUsuario = account.email;
      }
    });
    this.actualizarPlanInversionService.getPlanById(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.id = data.id;

      const nombreForm = <HTMLInputElement>document.getElementById('nombre');
      nombreForm.value = data.nombre;

      const montoForm = <HTMLInputElement>document.getElementById('monto');
      montoForm.value = data.monto;

      const descripcionForm = <HTMLInputElement>document.getElementById('descripcion');
      descripcionForm.value = data.descripcion;

      const beneficiosForm = <HTMLInputElement>document.getElementById('beneficios');
      beneficiosForm.value = data.beneficios;

      const porcentajeEmpresarialForm = <HTMLInputElement>document.getElementById('porcentajeEmpresarial');
      porcentajeEmpresarialForm.value = data.porcentajeEmpresarial;
    });
  }
  actualizarPlanInversion(): void {
    const router = this.router;
    const nombreForm = <HTMLInputElement>document.getElementById('nombre');
    const montoForm = <HTMLInputElement>document.getElementById('monto');
    const descripcionForm = <HTMLInputElement>document.getElementById('descripcion');
    const beneficiosForm = <HTMLInputElement>document.getElementById('beneficios');
    const porcentajeEmpresarialForm = <HTMLInputElement>document.getElementById('porcentajeEmpresarial');

    const plan: PlanesInversion = new PlanesInversion(
      this.id,
      nombreForm.value,
      montoForm.value as unknown as number,
      descripcionForm.value,
      beneficiosForm.value
    );

    this.actualizarPlanInversionService.updatePlan(this.emailUsuario, this.id, porcentajeEmpresarialForm.value, plan).subscribe(data => {
      this.success = true;
      window.setTimeout(function () {
        router.navigate(['startup/lista-planes-inversion']);
      }, 3000);
    });
  }
}
