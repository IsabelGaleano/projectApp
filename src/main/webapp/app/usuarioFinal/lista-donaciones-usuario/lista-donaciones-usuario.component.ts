import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.emailUsuario = account.email;
        this.account = account;
        this.listaDonacionesUsuarioService.getDonacionesPaquetesByCorreo(account.email).subscribe(donacionesPaquetes => {
          donacionesPaquetes.forEach((plan: any) => {
            if (plan.fechaDonacion != null) {
              const fecha = plan.fechaDonacion.split('T');
              plan.fechaDonacion = fecha[0];
            }
            this.donacionesPaquetes.push(plan);
          });
        });
      }
    });
  }
  buscarPorNombreCorreo(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput.value !== '' && searchInput.value.length > 1) {
      this.donacionesPaquetes = [];
      this.listaDonacionesUsuarioService
        .getDonacionesPaquetesByNombreStartup(this.emailUsuario, searchInput.value)
        .subscribe(donacionesPaquetes => {
          if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach((donacion: any) => {
              if (donacion.fechaDonacion != null) {
                const fecha = donacion.fechaDonacion.split('T');
                donacion.fechaDonacion = fecha[0];
              }
              this.donacionesPaquetes.push(donacion);
            });
          }
        });
      this.changeDetection.detectChanges();
    } else {
      this.reset();
    }
  }
  reset(): void {
    this.listaDonacionesUsuarioService.getDonacionesPaquetesByCorreo(this.emailUsuario).subscribe(donacionesPaquetes => {
      this.donacionesPaquetes = [];
      donacionesPaquetes.forEach((donacion: any) => {
        if (donacion.fechaDonacion != null) {
          const fecha = donacion.fechaDonacion.split('T');
          donacion.fechaDonacion = fecha[0];
        }
        this.donacionesPaquetes.push(donacion);
      });
    });
    this.changeDetection.detectChanges();
  }

  verPerfilDonacion(event: any): void {
    const router = this.router;
    console.warn(event.target.value);
    this.listaDonacionesUsuarioService.getDonacionPaquete(event.target.value).subscribe((resultD: any) => {
      if (resultD) {
        sessionStorage.setItem('donacionPaqueteUsuario', JSON.stringify(resultD));
        this.router.navigate(['usuario-final/perfil-donacion-usuario']);
      }
    });
  }
}
