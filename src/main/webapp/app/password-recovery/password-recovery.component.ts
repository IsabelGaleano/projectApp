import { Component, OnInit } from '@angular/core';
import { CodigosService } from '../entities/codigos/service/codigos.service';

@Component({
  selector: 'jhi-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent  { //implements OnInit {

  email : string = '';

  constructor(private codeService:CodigosService) { 

  }

  //ngOnInit(): void {
  //}

  async sendCode() {
    let response = await this.codeService.sendCode(this.email)
     console.log(response);
  }

}
