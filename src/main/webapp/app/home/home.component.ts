import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { CategoriasService } from 'app/entities/categorias/service/categorias.service';
import { ICategorias } from 'app/entities/categorias/categorias.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  categorias: any = [];
  categoriaSeleccionada: ICategorias = {};

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router, private categoriasService: CategoriasService) {
    this.categorias = [];
    this.categoriasService.get().subscribe(data => {
      this.categorias = data.body;
      /* eslint-disable no-console */
      console.log(data.body);
    });
  }

  cambioDropdownCategorias(event: any): void {
    /* eslint-disable no-console */
    console.log(event.target.value);
    if (event.target.value !== 'default') {
      this.categoriaSeleccionada = event.target.value;
    } else {
      this.categoriaSeleccionada = {};
    }
  }

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  registroFinal(): void {
    this.router.navigate(['/registroFinal']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
