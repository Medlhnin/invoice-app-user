import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScheduledInvoiceService {

  constructor(private http: HttpClient) { }
  private BASE_URL = environment.BASE_URL+'/api/v1/scheduled-invoices';

  createScheduledInvoice(scheduledInvoice: any) {
    return this.http.post(`${this.BASE_URL}`, scheduledInvoice); 
  }

  getAllScheduledInvoices() {
    return this.http.get<any[]>(this.BASE_URL);
  }

  deleteScheduledInvoice(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  previewScheduledInvoice(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}/preview`);
  }

  getScheduledInvoiceById(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  updateScheduledInvoice(id: number, scheduledInvoice: any) {
    return this.http.put(`${this.BASE_URL}/${id}`, scheduledInvoice);
  }
  
  getScheduledInvoiceByClientId(clientId: number) {
    return this.http.get(`${this.BASE_URL}/client/${clientId}`);
  }

  toggleScheduledInvoiceActivation(id: number, isActive: boolean): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/${isActive ? 'deactivate' : 'activate'}`, {});
  }

}
