/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { PerfilDonacionStartupPService } from './perfil-donacion-startup.service';

@Component({
  selector: 'jhi-perfil-donacion-startup',
  templateUrl: './perfil-donacion-startup.component.html',
})
export class PerfilDonacionStartupComponent implements OnInit {
  donacionPaquete: any;
  paquete: any;
  startup: any;
  usuario: any;
  dateDonacion: any;
  success = false;
  isEnabled = true;
  successFinal = false;

  inicialForm = this.fb.group({
    fechaInicial: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
    diasRetraso: ['', [Validators.required]],
  });

  finalForm = this.fb.group({
    fechaFinal: ['', [Validators.required]],
    diasRetrasoFinal: ['', [Validators.required]],
  });

  constructor(private router: Router, private perfilService: PerfilDonacionStartupPService, private fb: FormBuilder) {
    this.donacionPaquete = JSON.parse(sessionStorage.donacionPaqueteStartup);

    console.warn(this.donacionPaquete);

    this.perfilService.getPaquete(this.donacionPaquete.idPaquete.id).subscribe((resultP: any) => {
      if (resultP) {
        this.paquete = resultP;
      }
    });

    this.perfilService.getStartupByCorreo(this.donacionPaquete.idStartup.correoElectronico).subscribe((results: any) => {
      if (results) {
        this.startup = results;
      }
    });

    this.perfilService.getUsuarioByCorreo(this.donacionPaquete.idUsuario.correoElectronico).subscribe((resultU: any) => {
      if (resultU) {
        this.usuario = resultU;
      }
    });
  }
  ngOnInit(): void {
    const fechatemp = new Date(this.donacionPaquete.fechaDonacion);
    console.warn(fechatemp.toLocaleString());
    this.dateDonacion = fechatemp.toLocaleString();
  }

  iniciarEnvio(): void {
    console.warn('prueba');
    const fechaInicial = <HTMLInputElement>document.getElementById('fechaInicial');
    const fechaEntrega = <HTMLInputElement>document.getElementById('fechaEntrega');
    const diasRetraso = <HTMLInputElement>document.getElementById('diasRetraso');

    this.donacionPaquete.fechaInicialEnvio = new Date(fechaInicial.value);
    this.donacionPaquete.fechaPosibleEntrega = new Date(fechaEntrega.value);
    this.donacionPaquete.diasRetraso = diasRetraso.value;
    this.donacionPaquete.estado = 'Activo';

    this.perfilService.actualizarDonacion(this.donacionPaquete.id, this.donacionPaquete).subscribe((result: any) => {
      if (result) {
        console.warn(result);
        this.success = true;
      }
    });
  }

  finalizarEnvio(): void {
    console.warn('prueba');
    const fechaFinal = <HTMLInputElement>document.getElementById('fechaFinal');
    const diasRetraso = <HTMLInputElement>document.getElementById('diasRetrasoFinal');

    this.donacionPaquete.fechaEntrega = new Date(fechaFinal.value);
    this.donacionPaquete.diasRetraso = diasRetraso.value;
    this.donacionPaquete.estado = 'Finalizado';

    this.perfilService.actualizarDonacion(this.donacionPaquete.id, this.donacionPaquete).subscribe((result: any) => {
      if (result) {
        console.warn(result);
        this.successFinal = true;
      }
    });
  }
}
