import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSackDollar,
  faBriefcaseMedical,
  faBox,
  faMicrochip,
  faHouseFlag,
  faDatabase,
  faVrCardboard,
  faTv,
  faTruckPickup,
  faMoneyBillTransfer,
  faBowlFood,
  faBrain,
  faCloudDownload,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
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
  categorias: Array<any> = [];
  categoriasInfo: Array<any> = [];

  faSackDollarI = faSackDollar;
  faBriefcaseMedicalI = faBriefcaseMedical;
  faBoxI = faBox;
  faMicrochipI = faMicrochip;
  faHouseFlagI = faHouseFlag;
  faDatabaseI = faDatabase;
  faVrCardboardI = faVrCardboard;
  faTvI = faTv;
  faTruckPickupI = faTruckPickup;
  faMoneyBillTransferI = faMoneyBillTransfer;
  faBowlFoodI = faBowlFood;
  faBrainI = faBrain;
  faCloudDownloadI = faCloudDownload;

  iconosCategorias: Array<any> = [];

  constructor(private comunidadStartupService: ComunidadStartupService, private router: Router) {
    this.iconosCategorias = [
      this.faSackDollarI,
      this.faBriefcaseMedicalI,
      this,
      this.faBoxI,
      this.faMicrochipI,
      this.faHouseFlagI,
      this.faDatabaseI,
      this.faVrCardboardI,
      this.faTvI,
      this.faTruckPickupI,
      this.faMoneyBillTransferI,
      this.faBowlFoodI,
      this.faBrainI,
      this.faCloudDownloadI,
    ];
  }

  ngOnInit(): void {
    this.comunidadStartupService.getAllStartups().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].descripcionCorta) {
          data[i].descripcionCorta = 'Sin descripción corta registrada';
        }

        // eslint-disable-next-line prefer-const
        let start = data[i];

        this.comunidadStartupService.getVotosPorStartup(data[i]).subscribe(votos => {
          this.startups.push({ votos, start });
          this.bblSort();
          this.startupsFiltered = this.startups;
        });
      }

      if (data.length >= 1) {
        this.startupsExistentes = true;
      }
    });

    //Obtiene todas las categorías de la bd
    this.comunidadStartupService.getCategorias().subscribe((categoriasService: any) => {
      this.categorias = categoriasService;

      categoriasService.forEach((categoria, index) => {
        this.comunidadStartupService.getCantidadCategoria(categoria.categoria).subscribe((cantidad: number) => {
          let icono = this.faSackDollarI;
          if (categoria.categoria === 'Finanzas') {
            icono = this.faSackDollarI;
          } else if (categoria.categoria === 'Salud') {
            icono = this.faBriefcaseMedicalI;
          } else if (categoria.categoria === 'Cadena de suministros') {
            icono = this.faBoxI;
          } else if (categoria.categoria === 'Inteligencia artificial') {
            icono = this.faMicrochipI;
          } else if (categoria.categoria === 'Bienes raíces') {
            icono = this.faHouseFlagI;
          } else if (categoria.categoria === 'Big Data') {
            icono = this.faDatabaseI;
          } else if (categoria.categoria === 'Realidad virtual') {
            icono = this.faVrCardboardI;
          } else if (categoria.categoria === 'Entretenimiento') {
            icono = this.faTvI;
          } else if (categoria.categoria === 'Servicios de entrega') {
            icono = this.faTruckPickupI;
          } else if (categoria.categoria === 'Ecommerce') {
            icono = this.faMoneyBillTransferI;
          } else if (categoria.categoria === 'Alimentos') {
            icono = this.faBowlFoodI;
          } else if (categoria.categoria === 'Psicología') {
            icono = this.faBrainI;
          } else if (categoria.categoria === 'Software') {
            icono = this.faCloudDownloadI;
          }
          const infoCategoria = { cantidadCategoria: cantidad, iconoCategoria: icono };
          this.categoriasInfo.push({ categoria, infoCategoria });
        });
      });
      console.warn(this.categoriasInfo);
    });
  }

  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  redireccionarACategoria(nombreCategoria): void {
    localStorage.setItem('nombreCategoria', nombreCategoria);

    this.router.navigate(['/startups-por-categoria']);
  }

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
          // eslint-disable-next-line prefer-const
          let temp = this.startups[j];
          this.startups[j] = this.startups[j + 1];
          this.startups[j + 1] = temp;
        }
      }
    }
  }
}
