import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RegisterService } from 'app/account/register/register.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegistrarPaqueteStartupService } from './registrar-paquetes-startup.service';

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
  startup: any | null;
  startupLongin: any;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    monto: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    dimensiones: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    estado: ['', [Validators.required]],
  });

  constructor(
    private translateService: TranslateService,
    private paquetesServices: RegistrarPaqueteStartupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.warn(this.currency(10000));
  }

  previousState(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    this.startupLongin = sessionStorage.getItem('startupLogin');
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const nombre = this.registerForm.get(['login'])!.value;
    const monto = this.registerForm.get(['monto'])!.value;
    const descripcion = this.registerForm.get(['descripcion'])!.value;
    const dimensiones = this.registerForm.get(['dimensiones'])!.value;
    const estado = this.registerForm.get(['estado'])!.value;

    this.paquetesServices.getStartupByCorreo(this.startupLongin).subscribe((result: any) => {
      console.warn(result);
      if (result != null) {
        const idStartup = result;
        this.paquetesServices
          .registrarPaquete({ nombre, monto, descripcion, dimensiones, estado, idStartup })
          .subscribe((resultPaquete: any) => {
            if (resultPaquete != null) {
              console.warn(resultPaquete);
              this.previousState();
            }
          });
      }
    });
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
