import { Component, OnInit } from '@angular/core';
import { ListaPlanesInversionService } from './lista-planes-inversion.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-lista-planes-inversion',
  templateUrl: './lista-planes-inversion.component.html',
})
export class ListaPlanesInversionComponent implements OnInit {
  account: Account | null = null;
  planes: any[] = [];
  constructor(private listaPlanesInversionService: ListaPlanesInversionService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
        this.listaPlanesInversionService.getPlanesByCorreo(account.email).subscribe(planes => {
          planes.forEach((plan: any) => {
            this.planes.push(plan);
          });
        });
      }
    });
  }
}
