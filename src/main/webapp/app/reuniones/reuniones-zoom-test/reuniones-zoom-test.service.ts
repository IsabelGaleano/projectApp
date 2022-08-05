/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReunionesZoomTestService {
  constructor(private http: HttpClient) {}

  generateSignature(apiKey: string, apiSecret: string, meetingNumber: string, role: number): Observable<any> {
    const baseURL = '/api/generateSignature/';

    return this.http.post(baseURL.concat(apiKey).concat('/').concat(apiSecret).concat('/').concat(meetingNumber), role);
  }

  generateSignatureNode(meetingNumber: string, role: number): Observable<any> {
    const baseURL = 'http://localhost:4000/';

    const body = {
      meetingNumber: meetingNumber,
      role: role,
    };

    return this.http.post(baseURL, body);
  }
}
