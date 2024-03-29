import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaAdministradoresService } from './lista-administradores.service';

@Component({
  selector: 'jhi-lista-administradores',
  templateUrl: './lista-administradores.component.html',
  styleUrls: ['./lista-administradores.component.scss'],
})
export class ListaAdministradoresComponent implements OnInit {
  usuarios: any[] = [];
  busqueda: string;
  usuariosTmp: any[] = [];
  // show:boolean;

  constructor(private appService: ListaAdministradoresService, private router: Router) {
    this.busqueda = '';
  }

  ngOnInit(): void {
    this.appService.getUsers().subscribe((data: any) => {
      // this.usuarios = data;

      data.forEach((usuario: any) => {
        this.appService.getUsersByEmail(usuario.correoElectronico).subscribe((roles: any) => {
          roles.forEach((rol: any) => {
            // console.warn(ro)
            if (rol.name === 'ROLE_ADMIN' && roles.length === 2) {
              // if (rol.name === 'ROLE_USER') {
              this.usuarios.push(usuario);
            }
          });
        });
      });
      this.usuariosTmp = this.usuarios;
    });
  }
  cambiarEstado(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();
    const idXestado = value.split(',', 2);
    if (idXestado[1] === 'Inactivo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Activo';

        this.appService.updateUsuariosEstado(data.correoElectronico, data.estado).subscribe(() => {
          this.appService.updateUserActivatedJHI(data.correoElectronico, data.estado).subscribe(() => {
            window.location.reload();
          });
        });
        // .then();
      });
    } else if (idXestado[1] === 'Activo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Inactivo';

        // this.appService.updateUser(data, idXestado[0]).subscribe().then(window.location.reload());
        this.appService.updateUsuariosEstado(data.correoElectronico, data.estado).subscribe(() => {
          this.appService.updateUserActivatedJHI(data.correoElectronico, data.estado).subscribe(() => {
            window.location.reload();
          });
        });
        // .then(window.location.reload());
      });
    }
  }

  verPerfil(correo: string): void {
    this.appService.setCorreo(correo);
    // this.router.navigate(['/admin/perfil-visualizable-usuario-final']);

    this.appService.getUsersByEmail(correo).subscribe((roles: any) => {
      console.warn(roles);

      roles.forEach((element: any) => {
        console.warn(element);

        if (element.name === 'ROLE_ADMIN') {
          localStorage.removeItem('correoSession');
          localStorage.setItem('correoSession', correo);
          this.router.navigate(['/admin/perfil-visualizable-admin']);
        }

        // else if (element.name === 'ROLE_USER') {
        //   localStorage.removeItem('correoSession');
        //   localStorage.setItem('correoSession', correo);
        //   this.router.navigate(['/admin/perfil-visualizable-usuario-final']);
        // }
      });
    });
  }

  searchByName(): void {
    try {
      if (!this.busqueda) {
        this.usuarios = this.usuariosTmp;
      } else {
        this.appService.findByNombre(this.busqueda).subscribe((response: any) => {
          if (response) {
            this.usuarios = [];
            response.forEach((usuario: any) => {
              this.appService.getUsersByEmail(usuario.correoElectronico).subscribe((roles: any) => {
                roles.forEach((rol: any) => {
                  // console.warn(ro)
                  if (rol.name === 'ROLE_ADMIN' && roles.length === 2 && this.usuarios.findIndex(item => item.idUsuario === usuario.idUsuario) === -1) {
                    // if (rol.name === 'ROLE_USER') {
                    this.usuarios.push(usuario);
                  }
                });
              });
            });
          } else {
            this.usuarios = [];
          }
        });
      }
    } catch (e) {
      console.error('hola', e);
    }
  }

  clearSearch(): void {
    if (!this.busqueda) {
      this.usuarios = this.usuariosTmp;
    }
  }

  // redireccionarRegistroAdmin(): void {
  //   this.router.navigate(['admin/registro-admin']);
  // }
}
