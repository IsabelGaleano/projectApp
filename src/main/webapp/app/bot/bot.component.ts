import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import {
  faCircleQuestion,
  faCircleXmark,
  faMagnifyingGlass,
  faMedal,
  faChartColumn,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'jhi-bot',
  templateUrl: './bot.component.html',
})
export class BotComponent implements OnInit {
  account!: Account;
  opened = false;
  faCircleQuestion = faCircleQuestion;
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faMedal = faMedal;
  faChartColumn = faChartColumn;
  faLocationDot = faLocationDot;
  //Variable that shows the first cards for the bots if true
  showFirstContentInfo = true;

  constructor(private accountService: AccountService, private datePipe: DatePipe, private router: Router) {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
  }

  ngOnInit(): void {
    console.warn('');
  }

  toggleBot(): void {
    this.opened = !this.opened;
  }

  closeBot(): void {
    this.opened = false;
  }

  estadisticasStartups(): void {
    this.showFirstContentInfo = false;
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
