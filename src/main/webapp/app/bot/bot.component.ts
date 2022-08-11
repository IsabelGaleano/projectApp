import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ComunidadStartupService } from '../startup/comunidad-startup/comunidad-startup.service';
import { ListarInscripcionesAdminService } from '../admin/listar-inscripciones-admin/listar-inscripciones-admin.service';
import { ChartData, ChartOptions } from 'chart.js';
import {
  faCircleQuestion,
  faCircleXmark,
  faMagnifyingGlass,
  faMedal,
  faChartColumn,
  faLocationDot,
  faArrowLeft,
  faChartPie,
  faChartSimple,
  faChartLine,
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
  faArrowLeft = faArrowLeft;
  faChartPie = faChartPie;
  faChartSimple = faChartSimple;
  faChartLine = faChartLine;

  //Variable that shows the first cards for the bots if true
  showFirstContentInfo = true;
  showBestStartups = false;
  showCardsCharts = false;
  showInscripcionesChart = false;
  data = {};
  dataInscripciones = {};
  showCategoriasChart = false;
  backgrounds = [
    '#42A5F5', //Bluish
    '#66BB6A', //Greenish
    '#FFA726', //Orange
    '#26C6DA', //Tealish
    '#7E57C2', //purple
    '#CF5C36', //orange like brick
    '#002559', //navy
    '#EFC88B', //cremish yellow
    '#F7B2AD', //redish pink
    '#9ABCA7', //mintish green
    '#F7F06D', //yellow
    '#2F2235', //dark purple
    '#8f8f8f', //grey
  ];
  chartBackgrounds: Array<any> = [];
  startups: Array<any> = [];
  startupsFiltro: Array<any> = [];
  categoriasCount: Array<any> = [];
  categoriasLabels: Array<any> = [];

  //Inscripciones
  inscripciones: Array<any> = [];

  constructor(
    private accountService: AccountService,
    private datePipe: DatePipe,
    private router: Router,
    private comunidadStartupService: ComunidadStartupService,
    private inscripcionesService: ListarInscripcionesAdminService
  ) {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    //Cargar información de categorías para el gráfico de categorías
    this.comunidadStartupService.getCategorias().subscribe((categoriasService: any) => {
      categoriasService.forEach((categoria, index) => {
        this.comunidadStartupService.getCantidadCategoria(categoria.categoria).subscribe((cantidad: number) => {
          if (cantidad > 0) {
            this.categoriasLabels.push(categoria.categoria);
            this.categoriasCount.push(cantidad);
            this.chartBackgrounds.push(this.backgrounds[index]);
          }
        });
      });
      this.data = {
        datasets: [
          {
            data: this.categoriasCount,
            backgroundColor: this.chartBackgrounds,
            label: 'Startups por categorias',
          },
        ],
        labels: this.categoriasLabels,
      };
    });

    //Startups y votos
    this.comunidadStartupService.getAllStartups().subscribe((data: any) => {
      this.startupsFiltro = data;
      data.forEach(e => {
        this.comunidadStartupService.getVotosPorStartup(e).subscribe(votos => {
          this.startups.push({ votos, e });
        });
      });
    });

    //Inscripciones anuales y mensuales
    this.inscripcionesService.getInscripcionesMensuales().subscribe((mensuales: any) => {
      this.inscripciones.push(mensuales);
      this.inscripcionesService.getInscripcionesAnuales().subscribe((anuales: any) => {
        this.inscripciones.push(anuales);
        //Setea los valores del gráfico de inscripciones
        this.dataInscripciones = {
          labels: ['Startups'],
          datasets: [
            {
              label: 'Inscripciones mensuales',
              backgroundColor: '#7542f5',
              data: [mensuales],
            },
            {
              label: 'Inscripciones anuales',
              backgroundColor: '#4902fa',
              data: [anuales],
            },
          ],
        };
      });
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

  goBack(): void {
    this.showFirstContentInfo = true;
    //Todas las variables de información adicional del bot se ponen false para devolver las cards iniciales
    this.showCardsCharts = false;
    this.showBestStartups = false;
    this.showCategoriasChart = false;
    this.showInscripcionesChart = false;
  }

  //Listado con cards de mejores startups
  mejoresStartups(): void {
    this.showFirstContentInfo = false;
    this.showBestStartups = true;
    this.startups = this.startups.sort((a, b) => b.votos - a.votos);
  }

  //Graficos de startups
  estadisticasStartups(): void {
    this.showFirstContentInfo = false;
    this.showCardsCharts = true;
  }

  startupsCategorias(): void {
    this.showCardsCharts = false;
    this.showCategoriasChart = true;
  }
  startupsInscripciones(): void {
    this.showCardsCharts = false;
    this.showInscripcionesChart = true;
  }

  //Para listado de startups en cards
  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
