import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ListarReportesAdminService } from './listar-reportes.service';
@Component({
  selector: 'jhi-listar-reportes',
  templateUrl: './listar-reportes.component.html',
  styleUrls: ['./listar-reportes.component.scss'],
})
export class ListarReportesComponent implements OnInit {
  account!: Account;
  movimientos: any[] = [];
  startups: any[] = [];
  user = false;
  usuario: any;
  error = false;
  errorInvalida = false;
  errorVacia = false;
  errorNuevasVacias = false;
  fechaFormateada: string | null | undefined;
  imagenActualizada = true;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private listarReportesAdminService: ListarReportesAdminService
  ) {}

  ngOnInit(): void {
    console.warn('test');
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.user = true;
      }
      if (account !== null) {
        this.account = account;
        this.listarReportesAdminService.getUsuariosByCorreoElectronico(account.email).subscribe((data: any) => {
          this.usuario = data;
          console.warn(data.idMonedero);
          const admin = document.getElementById('admin') as HTMLInputElement;
          admin.insertAdjacentText('beforeend', data.correoElectronico);
          const total = document.getElementById('total') as HTMLInputElement;
          total.insertAdjacentText('beforeend', ': '.concat(data.idMonedero.saldo));
          this.listarReportesAdminService.getMovimientosByIdMonedero(data.idMonedero.id).subscribe((dataMov: any) => {
            console.warn(dataMov);
            if (dataMov != null) {
              dataMov.forEach((movimiento: any) => {
                movimiento.fecha = movimiento.fecha.split('T')[0];
                this.movimientos.push(movimiento);
              });
            }
          });
        });
        this.listarReportesAdminService.getStartups().subscribe((startups: any) => {
          if (startups != null) {
            console.warn(startups);
            startups.forEach((startup: any) => {
              if (startup.fechaCreacion != null) {
                const fecha = startup.fechaCreacion.split('T');
                startup.fechaCreacion = fecha[0];
              }
              this.startups.push(startup);
            });
          }
        });
      }
    });
  }
  openPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Reporte total de ganancias', 60, 20);
    doc.setFontSize(12);
    doc.text('Correo: ', 67, 30);
    doc.text(this.usuario.correoElectronico, 82, 30);
    doc.text('Fecha de reporte: ', 78, 40);
    doc.text(new Date().toLocaleDateString(), 112, 40);
    autoTable(doc, {
      startY: 50,
      html: '#htmlData',
    });
    doc.save('reportesAdministrador_'.concat(this.usuario.correoElectronico, '.pdf'));
  }

  openExcel(): void {
    const element = document.getElementById('htmlData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'reportesAdministrador_'.concat(this.usuario.correoElectronico, '.xlsx'));
  }
  openPDFStartup(): void {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Reporte de ganancias por startup', 40, 20);
    doc.setFontSize(12);
    doc.text('Correo: ', 67, 30);
    doc.text(this.usuario.correoElectronico, 82, 30);
    doc.text('Fecha de reporte: ', 78, 40);
    doc.text(new Date().toLocaleDateString(), 112, 40);
    autoTable(doc, {
      startY: 50,
      html: '#htmlDataStartup',
    });
    doc.save('reportesStartupAdministrador_'.concat(this.usuario.correoElectronico, '.pdf'));
  }

  openExcelStartup(): void {
    const element = document.getElementById('htmlDataStartup');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'reportesStartupAdministrador_'.concat(this.usuario.correoElectronico, '.xlsx'));
  }
}
