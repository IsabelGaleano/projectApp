import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegistroPlanInversionService } from './registro-plan-inversion.service';

@Component({
  selector: 'jhi-registro-plan-inversion',
  templateUrl: './registro-plan-inversion.component.html',
})
export class RegistroPlanInversionComponent implements OnInit {
  usuarioPendiente = null;
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  planRegistrado = false;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  constructor(private registroPlanInversionServic: RegistroPlanInversionService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.warn('test');
  }
  registrarPlanInversion(): void {
    console.warn('test');
  }
}
