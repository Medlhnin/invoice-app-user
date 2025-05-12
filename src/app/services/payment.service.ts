import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private BASE_URL = environment.BASE_URL + '/api/v1/invoice-payment';

  constructor(private http: HttpClient) { }

  getPayments() {
    return this.http.get(`${this.BASE_URL}`);
  }

  payInvoice(id: number, paymentData: any): Observable<any> { 
      return this.http.post(`${this.BASE_URL}/${id}`, paymentData);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
