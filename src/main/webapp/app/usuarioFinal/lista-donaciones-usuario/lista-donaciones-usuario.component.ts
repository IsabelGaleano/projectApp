import { Component, OnInit } from '@angular/core';
import { ListaDonacionesUsuarioService } from './lista-donaciones-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
@Component({
  selector: 'jhi-lista-donaciones-usuario',
  templateUrl: './lista-donaciones-usuario.component.html',
  styleUrls: ['./lista-donaciones-usuario.component.scss'],
})
export class ListaDonacionesUsuarioComponent implements OnInit {
  account: Account | null = null;
  donacionesPaquetes: any[] = [];
  id = 0;
  usuario: any;
  emailUsuario = ' ';
  constructor(
    private listaDonacionesUsuarioService: ListaDonacionesUsuarioService,
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
        this.listaDonacionesUsuarioService.getDonacionesPaquetesByCorreo(account.email).subscribe(donacionesPaquetes => {
          donacionesPaquetes.forEach((plan: any) => {
            console.warn(plan);
            this.donacionesPaquetes.push(plan);
          });
        });
      }
    });
  }
}
