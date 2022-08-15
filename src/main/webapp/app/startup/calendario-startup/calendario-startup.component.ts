/* eslint-disable */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { CalendarioStartupService } from './calendario-startup.service';

@Component({
  selector: 'jhi-calendario-startup',
  templateUrl: './calendario-startup.component.html',
  styleUrls: ['./calendario-startup.component.scss'],
})
export class CalendarioStartupComponent implements OnInit {
  /**@ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  user: any;
  account: any;
  reuniones: any[] = [];
  // eventos: any[] = [];
  eventos: any[] = [];
  calendarOptions: CalendarOptions | undefined;
  calendarApi: any;**/

  constructor(private calendarioStartupService: CalendarioStartupService, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    /**this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.user = true;
      }
      // this.account = account;
      if (account !== null) {
        this.account = account;

        this.calendarioStartupService.obtenerStartupPorEmail(this.account.email).subscribe((data: any) => {
          this.calendarioStartupService.obtenerReunionesPorIdStartup(data.id).subscribe((reuniones: any) => {
            this.reuniones = reuniones;

            this.reuniones.forEach(reunion => {
              console.warn('Reuniones');
              if (reunion.fechaReunion) {
                let evento = {
                  id: reunion.id,
                  title: reunion.idUsuario.correoElectronico,
                  date: reunion.fechaReunion.substring(0, 10),
                };

                this.eventos.push(evento);
              }
            });

            this.calendarOptions = {
              initialView: 'dayGridMonth',
              // dateClick: this.handleDateClick.bind(this), // bind is important!
              eventClick: this.verInformacionReunion.bind(this),
              events: this.eventos,
              // events: [
              //   { title: 'event 1', date: '2022-08-08' },
              //   { title: 'event 2', date: '2019-04-02' }
              // ],
              locale: 'es',
              headerToolbar: {
                center: 'dayGridWeek,dayGridMonth',
              },
            };

            this.calendarApi = this.calendarComponent.getApi();
          });
        });
      }
    });**/
  }

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr);
  // }

  verInformacionReunion(arg) {
    console.warn('date click! ', arg.event.id);

    localStorage.setItem('idReunionStorage', arg.event.id);

    this.router.navigate(['/startup/visualizar-reunion-startup']);
  }

  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }

  verFecha(fecha: string): void {
    // this.calendarOptions.goToDate();
    // this.calendarOptions!.gotoDate()
    console.warn(fecha);
    //this.calendarApi.gotoDate(fecha);
  }
}
