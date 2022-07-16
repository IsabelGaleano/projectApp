import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './lista-usuarios.service';

@Component({
  selector: 'jhi-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  callJsonGetRestApiResponse: any[] = [];
  // show:boolean;

  constructor(private appService: AppService, private router: Router) {}

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

  verPerfil(correo: string): void {
    this.appService.setCorreo(correo);

    this.router.navigate(['/admin/perfil-visualizable-usuario-final']);

    this.appService.getUsersByEmail(correo).subscribe((usuario: any) => {
      console.warn(usuario.authenticate);
    });
  }

  // getAllUsers():void{

  // }
}
