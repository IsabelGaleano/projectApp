import { Component, OnInit } from '@angular/core';
import { ListaDonacionesStartupService } from './lista-donaciones-startup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  selector: 'jhi-lista-donaciones-startup',
  templateUrl: './lista-donaciones-startup.component.html',
  styleUrls: ['./lista-donaciones-startup.component.scss'],
})
export class ListaDonacionesStartupComponent implements OnInit {
  account: Account | null = null;
  donacionesPaquetes: any[] = [];
  id = 0;
  usuario: any;
  emailUsuario = ' ';
  constructor(
    private listaDonacionesStartupService: ListaDonacionesStartupService,
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
        this.listaDonacionesStartupService.getDonacionesPaquetesByCorreo(account.email).subscribe(donacionesPaquetes => {
          donacionesPaquetes.forEach((plan: any) => {
            console.warn(plan);
            this.donacionesPaquetes.push(plan);
          });
        });
      }
    });
  }
}
