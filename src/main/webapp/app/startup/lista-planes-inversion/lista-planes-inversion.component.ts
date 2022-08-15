import { Component, OnInit } from '@angular/core';
import { ListaPlanesInversionService } from './lista-planes-inversion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { PlanesInversion } from './actualizar-plan-inversion.model';

@Component({
  selector: 'jhi-lista-planes-inversion',
  templateUrl: './lista-planes-inversion.component.html',
})
export class ListaPlanesInversionComponent implements OnInit {
  account: Account | null = null;
  planes: any[] = [];
  id = 0;
  usuario: any;
  emailUsuario = ' ';
  success = false;
  show = true;
  registerForm = this.fb.group({
    nombre: ['', [Validators.minLength(3), Validators.maxLength(100)]],
    monto: ['', []],
    descripcion: ['', [Validators.minLength(10), Validators.maxLength(300)]],
    beneficios: ['', [Validators.minLength(10), Validators.maxLength(300)]],
    porcentajeEmpresarial: ['', [Validators.pattern('^[0-9]{1,2}$')]],
  });
  constructor(
    private listaPlanesInversionService: ListaPlanesInversionService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.emailUsuario = account.email;
        this.account = account;
        this.listaPlanesInversionService.getPlanesByCorreo(account.email).subscribe(planes => {
          planes.forEach((plan: any) => {
            plan.monto = this.currency(plan.monto);
            this.planes.push(plan);
          });
        });
      }
    });
  }
  obtenerIdPlan(plan: any): void {
    this.listaPlanesInversionService.getPlanById(plan.id).subscribe(data => {
      this.id = plan.id;
    });
  }
  llenarFormulario(plan: any): void {
    this.listaPlanesInversionService.getPlanById(plan.id).subscribe(data => {
      this.id = plan.id;

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

    this.listaPlanesInversionService.updatePlan(this.emailUsuario, this.id, porcentajeEmpresarialForm.value, plan).subscribe(data => {
      this.success = true;
      window.setTimeout(function () {
        location.reload();
        // router.navigate(['startup/lista-planes-inversion']);
      }, 3000);
    });
  }
  borrarPlanInversion(): void {
    this.listaPlanesInversionService.deletePlan(this.id).subscribe(data => {
      console.warn('Plan borrado');
      window.setTimeout(function () {
        location.reload();
        // router.navigate(['startup/lista-planes-inversion']);
      }, 3000);
    });
  }
  registrarPlanInversion(): void {
    this.router.navigate(['/startup/registro-plan-inversion']);
  }

  currency(number): any {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  }
}
