import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ComunidadStartupService } from './comunidad-startup.service';

@Component({
  selector: 'jhi-comunidad-startup',
  templateUrl: './comunidad-startup.component.html',
  styleUrls: ['./comunidad-startup.component.scss'],
})
export class ComunidadStartupComponent implements OnInit {
  // startupsDesordenadas: Array<any> = [];
  startups: Array<any> = [];
  startupsFiltered: Array<any> = [];
  startupsExistentes = false;
  cantidadSoftware = 0;
  cantidadCocina = 0;
  cantidadHogar = 0;
  cantidadModa = 0;
  infoSearch = '';

  constructor(private comunidadStartupService: ComunidadStartupService, private router: Router) {}

  ngOnInit(): void {
    this.comunidadStartupService.getAllStartups().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].descripcionCorta) {
          data[i].descripcionCorta = 'Sin descripción corta registrada';
        }

        // eslint-disable-next-line prefer-const
        let start = data[i];

        this.comunidadStartupService.getVotosPorStartup(data[i]).subscribe(votos => {
          // console.warn("VOTOOOOOOOOOOOOS: ", votos);
          this.startups.push({ votos, start });
          this.bblSort();
          this.startupsFiltered = this.startups;
        });
      }

      if (data.length >= 1) {
        this.startupsExistentes = true;
      }

      // this.startups = data;

      // this.startups.sort( this.compare );

      // data.forEach(startup => {
      //   this.comunidadStartupService.getVotosPorStartup(data[0]).subscribe((votos) => {
      //     console.warn("VOTOOOOOOOOOOOOS: ", votos);
      //   });
      // });

      // this.startups.sort( (a, b) => (a.valor > b.valor) ? 1 : -1 );
      // this.startups.sort( this.compare );
      // this.startups.sort();

      // console.warn(this.startups);

      // this.startups.forEach(element => {
      //   console.warn(element, " MIAMOOOOOOOOOOOOOOOOOR");
      // });

      // console.warn(data, " DATAAAAAAAAAAAAAAAAA");
    });

    // this.startups.sort( (a, b) => (a.valor > b.valor) ? 1 : -1 );

    this.comunidadStartupService.getCantidadCategoria('Software').subscribe((cantidad: number) => {
      this.cantidadSoftware = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Cocina').subscribe((cantidad: number) => {
      this.cantidadCocina = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Hogar').subscribe((cantidad: number) => {
      this.cantidadHogar = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Moda').subscribe((cantidad: number) => {
      this.cantidadModa = cantidad;
    });

    // this.startups.sort( (a, b) => (a.valor > b.valor) ? 1 : -1 );
  }

  // ngAfterViewInit():void{
  //   this.startups.sort( (a, b) => (a.valor > b.valor) ? 1 : -1 );
  // }

  // compare( a, b ):number {
  //   if ( a.votos < b.votos ){
  //     console.warn(a.votos, " ", b.votos, " ", -1);
  //     return -1;
  //   }
  //   if ( a.votos > b.votos ){
  //     console.warn(a.votos, " ", b.votos, " ", 1);
  //     return 1;
  //   }
  //   console.warn(a.votos, " ", b.votos, " ", 0);
  //   return 0;
  // }

  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    console.warn(correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  redireccionarACategoria(nombreCategoria): void {
    localStorage.setItem('nombreCategoria', nombreCategoria);

    console.warn(nombreCategoria);

    this.router.navigate(['/startups-por-categoria']);
  }

  // ordernarStartups():void{
  //   console.warn("Me llamaron");
  //   this.startups.sort( (a, b) => (a.valor > b.valor) ? 1 : -1 );
  // }

  //Filtra listado de startups por montoMeta mayor o igual al ingresado
  //Filtra por nombre corto, nombre largo, sitio web, panorama mercado y fecha creacion
  filtrarStartups(event: any): void {
    this.infoSearch = event.target.value;
    const numberRegex = /^\d+$/;
    if (numberRegex.test(this.infoSearch)) {
      this.startupsFiltered = this.startups.filter(startup => {
        if (!startup.start.montoMeta) {
          return;
        }
        return startup.start.montoMeta >= this.infoSearch;
      });
    } else {
      this.startupsFiltered = this.startups.filter(
        startup =>
          startup.start.nombreCorto?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
          startup.start.nombreLargo?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
          startup.start.linkSitioWeb?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
          startup.start.panoramaMercado?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
          startup.start.fechaCreacion?.toLowerCase().includes(this.infoSearch.toLowerCase())
      );
    }
  }

  bblSort(): void {
    for (let i = 0; i < this.startups.length; i++) {
      for (let j = 0; j < this.startups.length - i - 1; j++) {
        if (this.startups[j].votos < this.startups[j + 1].votos) {
          console.warn('mayor');
          // eslint-disable-next-line prefer-const
          let temp = this.startups[j];
          this.startups[j] = this.startups[j + 1];
          this.startups[j + 1] = temp;
        }
      }
    }
  }
}
