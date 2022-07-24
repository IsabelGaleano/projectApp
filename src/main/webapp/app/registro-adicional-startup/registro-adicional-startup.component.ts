import { Component, OnInit } from '@angular/core';
import { StartupService } from './service/registro-adicional-startup.service';
import { IStartups, Startups } from '../entities/startups/startups.model';

@Component({
  selector: 'jhi-registro-adicional-startup',
  templateUrl: './registro-adicional-startup.component.html',
  styleUrls: ['./registro-adicional-startup.component.scss'],
})
export class RegistroAdicionalStartupComponent {
  //implements OnInit {
  startup: Startups;
  public code: string;
  public error: boolean;
  public info: boolean;
  public errorMessage: string;
  public infoMessage: string;
  public loading: boolean;
  constructor(private startupService: StartupService) {
    this.startup = new Startups();
    this.code = '';
    this.error = false;
    this.info = false;
    this.errorMessage = '';
    this.infoMessage = '';
    this.loading = false;
  }

  // ngOnInit(): void {}

  public updateAditionalInfo(): void {
    try {
      // se pone el id estático porque debe después integrarse con el registro de startups
      this.startup.id = 1;
      this.startup.correoElectronico = 'startup@gmail.com';
      this.startupService.update(this.startup).subscribe(
        (response: any) => {
          if (response.status) {
            this.info = true;
            this.error = false;
            this.errorMessage = '';
            this.startup = new Startups();
            this.infoMessage = 'La información fue registrada correctamente';
            this.loading = false;
          }
        },
        (err: any) => {
          this.error = true;
          this.info = false;
          this.errorMessage = err.error.title;
          this.loading = false;
          console.error('ERROR AL GUARDAR', err);
        }
      );
    } catch (e) {
      this.error = true;
    }
  }
}
