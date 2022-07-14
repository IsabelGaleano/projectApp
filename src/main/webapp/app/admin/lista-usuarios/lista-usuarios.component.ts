import { Component, OnInit } from '@angular/core';
import { AppService } from './lista-usuarios.service';

@Component({
  selector: 'jhi-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  callJsonGetRestApiResponse: any[] = [];
  // show:boolean;

  constructor(private appService: AppService) {
    let b;
  }

  ngOnInit(): void {
    this.appService.getUsers().subscribe((data: any) => {
      this.callJsonGetRestApiResponse = data;
    });
  }

  activarUsuario(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Inactivo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Activo';

        this.appService.updateUser(data, idXestado[0]).subscribe().then(window.location.reload());
      });
    }
  }

  desactivarUsuario(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Activo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Inactivo';

        this.appService.updateUser(data, idXestado[0]).subscribe().then(window.location.reload());
      });
    }
  }

  // getAllUsers():void{

  // }
}
