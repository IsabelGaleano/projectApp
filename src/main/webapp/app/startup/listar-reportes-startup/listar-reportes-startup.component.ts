import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ListarReportesStartupService } from './listar-reportes-startup.service';

@Component({
  selector: 'jhi-listar-reportes-startup',
  templateUrl: './listar-reportes-startup.component.html',
  styleUrls: ['./listar-reportes-startup.component.scss'],
})
export class ListarReportesStartupComponent implements OnInit {
  account!: Account;
  movimientos: any[] = [];
  user = false;
  usuario: any;
  error = false;
  errorInvalida = false;
  errorVacia = false;
  errorNuevasVacias = false;
  fechaFormateada: string | null | undefined;
  imagenActualizada = true;
  tipoReporte = 'mensual';
  constructor(
    private router: Router,
    private accountService: AccountService,
    private listarReportesStartupService: ListarReportesStartupService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.warn('test');
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.user = true;
      }
      if (account !== null) {
        this.account = account;
        this.listarReportesStartupService.getUsuariosByCorreoElectronico(account.email).subscribe((data: any) => {
          this.usuario = data;
          const total = document.getElementById('total') as HTMLInputElement;
          total.insertAdjacentText('beforeend', ': '.concat(data.idMonedero.saldo));
          this.listarReportesStartupService.getMovimientosByIdMonedero(this.usuario.idMonedero.id).subscribe((dataMov: any) => {
            if (dataMov != null) {
              dataMov.forEach((movimiento: any) => {
                movimiento.fecha = movimiento.fecha.split('T')[0];
                const today = new Date();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const mesMovimiento = movimiento.fecha.split('-')[1];
                if (mesMovimiento === mm) {
                  this.movimientos.push(movimiento);
                }
              });
            }
          });
        });
      }
    });
  }
  cambioReportes(): void {
    this.movimientos = [];
    const cambioReporte = document.getElementById('cambioReporte') as HTMLInputElement;
    if (this.tipoReporte === 'mensual') {
      this.listarReportesStartupService.getMovimientosByIdMonedero(this.usuario.idMonedero.id).subscribe((dataMov: any) => {
        console.warn(dataMov);
        if (dataMov != null) {
          dataMov.forEach((movimiento: any) => {
            movimiento.fecha = movimiento.fecha.split('T')[0];
            this.movimientos.push(movimiento);
          });
        }
      });
      this.tipoReporte = 'total';
      cambioReporte.innerText = 'Cambiar a reporte mensual';
    } else if (this.tipoReporte === 'total') {
      this.listarReportesStartupService.getMovimientosByIdMonedero(this.usuario.idMonedero.id).subscribe((dataMov: any) => {
        if (dataMov != null) {
          dataMov.forEach((movimiento: any) => {
            movimiento.fecha = movimiento.fecha.split('T')[0];
            const today = new Date();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const mesMovimiento = movimiento.fecha.split('-')[1];
            if (mesMovimiento === mm) {
              this.movimientos.push(movimiento);
            }
          });
        }
      });
      this.tipoReporte = 'mensual';
      cambioReporte.innerText = 'Cambiar a reporte total';
    }
    this.changeDetection.detectChanges();
  }
  openPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(22);
    if (this.tipoReporte === 'mensual') {
      doc.text('Reporte mensual de ganancias', 60, 20);
    } else {
      doc.text('Reporte total de ganancias', 60, 20);
    }
    doc.setFontSize(12);
    doc.text('Correo: ', 77, 30);
    doc.text(this.usuario.correoElectronico, 92, 30);
    doc.text('Fecha de reporte: ', 78, 40);
    doc.text(new Date().toLocaleDateString(), 112, 40);
    autoTable(doc, {
      startY: 50,
      html: '#htmlData',
    });
    doc.save('reportesStartup_'.concat(this.usuario.correoElectronico, '.pdf'));
  }

  openExcel(): void {
    const element = document.getElementById('htmlData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'reportesStartup_'.concat(this.usuario.correoElectronico, '.xlsx'));
  }
}
